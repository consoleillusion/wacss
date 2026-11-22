import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { load } from "load-object";

type Overrides = Record<string, string>;
type Schema = { title: string; element?: string; name?: string; variants: string[]; states: string[]; themeableProperties: string[]; structuralProperties?: Record<string, Record<string, string>>; channels?: Record<string, string[]> };
type RawSchema = Record<string, any>;
type PropertyType = "fill" | "ink" | "edge" | "other";

const FILL = new Set(["background", "background-color", "accent-color", "fill"]);
const INK = new Set(["color", "caret-color", "stroke"]);
const EDGE = new Set(["border-color", "outline-color", "text-decoration-color", "column-rule-color"]);
const STATE_ORDER = ["static","disabled","loading","invalid","checked","selected","current","pressed","open","focus","active","hover","highlighted"];
const EMIT_ORDER = ["static","closed","highlighted","hover","active","focus","open","pressed","current","selected","checked","invalid","loading","disabled"];
const CHANNEL_PREFS: Record<string, { props: string[]; claimAll: boolean }> = {
  disabled: { props: ["opacity"], claimAll: false }, loading: { props: ["filter"], claimAll: false },
  invalid: { props: ["border-color", "outline-color", "box-shadow"], claimAll: false },
  checked: { props: ["background", "color", "border-color"], claimAll: true }, selected: { props: ["background", "color", "border-color"], claimAll: true },
  current: { props: ["background", "color", "border-color"], claimAll: true }, pressed: { props: ["background", "color", "border-color"], claimAll: true },
  open: { props: ["border-color", "box-shadow"], claimAll: false }, focus: { props: ["outline-color"], claimAll: false },
  active: { props: ["transform"], claimAll: false }, hover: { props: ["background", "box-shadow", "filter"], claimAll: false },
  highlighted: { props: ["background", "box-shadow"], claimAll: false },
};
const CO_OCCUR_EXCLUSIVE = new Set(["checked", "unchecked"]);

function normalizeSchema(raw: RawSchema): Schema {
  const src = raw.themeableProperties ? raw : raw.properties ?? raw;
  return { title: raw.title ?? src.title ?? "Component", element: raw.element ?? src.element, name: raw.name ?? src.name, variants: src.variants ?? [], states: src.states ?? [], themeableProperties: src.themeableProperties ?? src.cssProperties ?? [], structuralProperties: src.structuralProperties ?? src.structure ?? {}, channels: src.channels };
}
function propertyType(property: string): PropertyType { if (FILL.has(property)) return "fill"; if (INK.has(property)) return "ink"; if (EDGE.has(property)) return "edge"; return "other"; }
function canCoOccur(a: string, b: string): boolean { if (a === b) return false; if (CO_OCCUR_EXCLUSIVE.has(a) && CO_OCCUR_EXCLUSIVE.has(b)) return true; return true; }
function computeChannels(schema: Schema): Record<string, string[]> {
  if (schema.channels) return schema.channels;
  const available = new Set(schema.themeableProperties); const takenBy: Record<string, string> = {}; const channels: Record<string, string[]> = {};
  for (const state of STATE_ORDER) {
    if (!schema.states.includes(state)) continue;
    if (state === "static" || state === "unchecked") { channels[state] = []; continue; }
    const pref = CHANNEL_PREFS[state]; if (!pref) { channels[state] = []; continue; }
    const claimed: string[] = [];
    for (const prop of pref.props) { if (!available.has(prop)) continue; const owner = takenBy[prop]; if (owner && canCoOccur(owner, state)) continue; claimed.push(prop); if (!pref.claimAll) break; }
    for (const prop of claimed) takenBy[prop] = state; channels[state] = claimed;
  }
  return channels;
}
function bridge(component: string, name: string, variant: string): string { return `var(--${component}-${name}-${variant})`; }
function variantRecipe(component: string, property: string, variant: string): string {
  const l3 = `var(--${component}-${property})`; if (variant === "secondary") return l3;
  const type = propertyType(property); if (type === "other") return l3;
  if (variant === "tertiary") { if (type === "fill" || type === "edge") return `var(--${component}-tone-tertiary)`; if (type === "ink") return `var(--${component}-tone-tertiary-ink)`; }
  const tone = `var(--${component}-tone-${variant})`; const toneInk = `var(--${component}-tone-${variant}-ink)`;
  if (type === "fill" || type === "edge") return tone; if (type === "ink") return toneInk; return l3;
}
function stateRecipe(component: string, property: string, variant: string, state: string, l4: string): string {
  const type = propertyType(property); const b = (name: string) => bridge(component, name, variant);
  if (state === "hover" || state === "highlighted" || state === "open") {
    if (type === "fill" || type === "ink" || type === "edge") return `color-mix(in oklab, ${l4}, ${b("interaction")} ${b(`mix-${state}`)})`;
    if (property === "box-shadow") return `${l4}, 0 0 0 0.25em color-mix(in oklab, ${b("interaction")} ${b(`mix-${state}`)}, transparent)`;
    if (property === "filter" && state === "hover") return `${l4} brightness(calc(100% + ${b("mix-hover")}))`;
  }
  if (state === "focus" && property === "outline-color") return b("ring");
  if (state === "active" && property === "transform") return `${l4} scale(${b("scale-active")})`;
  if (["checked", "selected", "current", "pressed"].includes(state)) { if (type === "fill" || type === "edge") return b("selection"); if (type === "ink") return b("selection-ink"); }
  if (state === "open" && property === "border-color") return b("ring");
  if (state === "invalid" && (type === "edge" || property === "box-shadow")) return `color-mix(in oklab, ${l4}, ${b("invalid")} ${b("mix-invalid")})`;
  if (state === "loading" && property === "filter") return `${l4} saturate(50%)`;
  if (state === "disabled" && property === "opacity") return `calc(${l4} * ${b("opacity-disabled")})`;
  return l4;
}
function cssSelector(schema: Schema, variant: string, state: string): string {
  const component = (schema.name ?? schema.title).toLowerCase();
  const base = schema.element ? `:where(${schema.element})` : `.${component}`;
  const variantSel = variant === "secondary" ? base : `${base}.${variant}`;
  if (state === "static" || state === "closed") return variantSel;
  const stateSelectors: Record<string, string> = { hover: ":hover", highlighted: "[data-highlighted]", focus: ":focus-visible", active: ":active", checked: ':checked, [aria-checked="true"], [data-state="checked"]', unchecked: '[aria-checked="false"], [data-state="unchecked"]', selected: '[aria-selected="true"], [data-selected]', current: '[aria-current]:not([aria-current="false"])', pressed: '[aria-pressed="true"]', open: '[open], [aria-expanded="true"], [data-state="open"]', invalid: ':user-invalid, [aria-invalid="true"], [data-invalid]', loading: '[aria-busy="true"]', disabled: ':disabled, [aria-disabled="true"], [data-disabled]' };
  const sel = stateSelectors[state]; return sel ? `${variantSel}:where(${sel})` : variantSel;
}
function formatDecls(decls: Record<string, string>, indent = "  "): string { return Object.entries(decls).map(([k, v]) => `${indent}${k}: ${v};`).join("\n"); }
function createMangler(prefix = "w") { let i = 0; const map = new Map<string, string>(); const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; const encode = (n: number) => { let s = ""; let x = n + 1; while (x > 0) { x -= 1; s = alphabet[x % alphabet.length] + s; x = Math.floor(x / alphabet.length); } return s; }; return (name: string) => { if (!map.has(name)) map.set(name, `--${prefix}${encode(i++)}`); return map.get(name)!; }; }
function collectComponentVars(css: string, component: string): string[] { const found = new Set<string>(); const re = new RegExp(`--${component}-[a-z0-9-]+`, "g"); for (const m of css.matchAll(re)) found.add(m[0]); return [...found].sort(); }
function mangleCssVars(css: string, vars: string[], mangle: (name: string) => string): string { const map = new Map(vars.map((v) => [v, mangle(v)])); return css.replace(/--[a-z][a-z0-9-]*/g, (m) => map.get(m) ?? m); }
function overrideKey(prop: string, variant?: string, state?: string) { return [prop, variant, state].filter(Boolean).join("."); }
function getOverride(overrides: Overrides, prop: string, variant?: string, state?: string): string | undefined { return overrides[overrideKey(prop, variant, state)]; }
function inferBridges(schema: Schema, channels: Record<string, string[]>): string[] {
  const bridges = new Set<string>();
  for (const variant of schema.variants) { if (variant === "secondary") continue; for (const prop of schema.themeableProperties) { const type = propertyType(prop); if (type === "other") continue; if (type === "ink") bridges.add(`tone-${variant}-ink`); else bridges.add(`tone-${variant}`); if (variant === "tertiary") { bridges.add("tone-tertiary"); bridges.add("tone-tertiary-ink"); } } }
  for (const state of schema.states) { const channel = channels[state] ?? []; for (const prop of channel) { const type = propertyType(prop); if (["hover", "highlighted", "open"].includes(state)) { if (type === "fill" || type === "ink" || type === "edge" || prop === "box-shadow") { bridges.add("interaction"); bridges.add(`mix-${state}`); } if (prop === "filter" && state === "hover") bridges.add("mix-hover"); } if (state === "focus" && prop === "outline-color") bridges.add("ring"); if (state === "active" && prop === "transform") bridges.add("scale-active"); if (["checked","selected","current","pressed"].includes(state)) { if (type === "fill" || type === "edge") bridges.add("selection"); if (type === "ink") bridges.add("selection-ink"); } if (state === "open" && prop === "border-color") bridges.add("ring"); if (state === "invalid") { bridges.add("invalid"); bridges.add("mix-invalid"); } if (state === "disabled" && prop === "opacity") bridges.add("opacity-disabled"); } }
  return [...bridges].sort();
}
function minifyCss(css: string): string { return css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}:;,>+~()])\s*/g, "$1").replace(/;}/g, "}").trim(); }
async function loadOverrides(componentDir: string): Promise<Overrides> { try { const raw = await (await import("node:fs/promises")).readFile(path.join(componentDir, "tokens.json"), "utf8"); const parsed = JSON.parse(raw); if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return parsed as Overrides; } catch {} return {}; }

async function generateForSchema(schemaPath: string) {
  const raw = (await load(schemaPath)) as RawSchema;
  const schema = normalizeSchema(raw);
  const component = (schema.name ?? schema.title).toLowerCase();
  const channels = computeChannels(schema);
  const overrides = await loadOverrides(path.dirname(schemaPath));
  const bridges = inferBridges(schema, channels);

  const lines: string[] = [`/* Generated from ${schemaPath} - do not edit directly. */`, ""];

  if (bridges.length) {
    lines.push("/* L3 bridges */", ":root {");
    for (const b of bridges) lines.push(`  --${component}-${b}: ${getOverride(overrides, b) ?? `var(--${b})`};`);
    lines.push("}", "", "/* L4 bridges */", ":root {");
    for (const b of bridges) for (const variant of schema.variants) lines.push(`  --${component}-${b}-${variant}: ${getOverride(overrides, b, variant) ?? `var(--${component}-${b})`};`);
    lines.push("}", "");
  }

  lines.push("/* L3 component tokens */", ":root {");
  for (const prop of schema.themeableProperties) lines.push(`  --${component}-${prop}: ${getOverride(overrides, prop) ?? `var(--${prop})`};`);
  lines.push("}", "", "/* L4 variant tokens */", ":root {");
  for (const prop of schema.themeableProperties) for (const variant of schema.variants) lines.push(`  --${component}-${prop}-${variant}: ${getOverride(overrides, prop, variant) ?? variantRecipe(component, prop, variant)};`);
  lines.push("}", "", "/* L5 state tokens */", ":root {");
  for (const prop of schema.themeableProperties) for (const variant of schema.variants) {
    const l4 = `var(--${component}-${prop}-${variant})`;
    const channelStates = new Set(Object.entries(channels).filter(([, props]) => props.includes(prop)).map(([s]) => s));
    for (const state of schema.states) {
      const name = `--${component}-${prop}-${variant}-${state}`;
      lines.push(`  ${name}: ${getOverride(overrides, prop, variant, state) ?? (channelStates.has(state) ? stateRecipe(component, prop, variant, state, l4) : l4)};`);
    }
  }
  lines.push("}", "");

  const layer = schema.element ? "wacss.elements" : "wacss.components";
  lines.push(`@layer ${layer} {`);
  const baseState = schema.states.includes("static") ? "static" : (schema.states.includes("closed") ? "closed" : schema.states[0]);
  const emitStates = EMIT_ORDER.filter((s) => schema.states.includes(s));
  for (const variant of schema.variants) for (const state of emitStates) {
    const isBase = state === baseState;
    const selector = cssSelector(schema, variant, state); const decls: Record<string, string> = {}; const structural = schema.structuralProperties ?? {};
    if (isBase) Object.assign(decls, structural.static ?? structural[baseState] ?? {}); else Object.assign(decls, structural[state] ?? {});
    if (isBase) { for (const prop of schema.themeableProperties) decls[prop] = `var(--${component}-${prop}-${variant}-${state})`; }
    else { for (const prop of channels[state] ?? []) if (schema.themeableProperties.includes(prop)) decls[prop] = `var(--${component}-${prop}-${variant}-${state})`; }
    if (Object.keys(decls).length) { lines.push(`  ${selector} {`, formatDecls(decls, "    "), "  }"); }

    const pseudoElements = (raw as any).pseudoElements ?? (raw as any).properties?.pseudoElements ?? {};
    const pseudoStructure = (raw as any).pseudoStructure ?? (raw as any).properties?.pseudoStructure ?? {};
    const pseudos = new Set([...Object.keys(pseudoElements as Record<string, any>), ...Object.keys(pseudoStructure as Record<string, any>)]);
    for (const pseudo of pseudos) {
      const pDecls: Record<string, string> = {};
      const ps = (pseudoStructure as any)[pseudo] ?? {};
      Object.assign(pDecls, isBase ? (ps?.static ?? ps?.[baseState] ?? {}) : (ps?.[state] ?? {}));
      const pProps = ((pseudoElements as any)[pseudo] ?? []) as string[];
      for (const prop of pProps) {
        if (!schema.themeableProperties.includes(prop)) continue;
        if (isBase || (channels[state] ?? []).includes(prop) || prop === "transition-duration") {
          pDecls[prop] = `var(--${component}-${prop}-${variant}-${state})`;
        }
      }
      if (Object.keys(pDecls).length) {
        lines.push(`  ${selector}${pseudo} {`);
        lines.push(formatDecls(pDecls, "    "));
        lines.push("  }");
      }
    }
  }
  lines.push("}", "");

  const css = lines.join("\n");
  const vars = collectComponentVars(css, component);
  const mangled = mangleCssVars(css, vars, createMangler());
  const minified = minifyCss(mangled);
  const outDir = path.resolve("dist");
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, `${component}.css`), css, "utf8");
  await writeFile(path.join(outDir, `${component}.min.css`), minified, "utf8");
  console.log(`Wrote dist/${component}.css, dist/${component}.min.css`);
  console.log(`${component} L3: ${schema.themeableProperties.length}, L4: ${schema.themeableProperties.length * schema.variants.length}, L5: ${schema.themeableProperties.length * schema.variants.length * schema.states.length}`);
}

async function main() {
  const args = process.argv.slice(2);
  const targets = args.length > 0 ? args : ["src/components/Accordion/schema.dhall", "src/components/Button/schema.dhall", "src/components/Card/schema.dhall"];
  for (const target of targets) await generateForSchema(path.resolve(target));
}
main().catch((err) => { console.error(err); process.exit(1); });
