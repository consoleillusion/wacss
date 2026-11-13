/**
 * Token layer emitter — strict five-layer chain.
 *
 *   L1  _primitives.scss       raw literals only
 *   L2  _semantic.scss         may reference L1 (and same-layer primas)
 *   L3  _component.scss        hand-authored primas; may reference L2 only
 *       _component-source.scss generated aliases of L2 tokens; may reference L2 only
 *   L4  _role.scss             generated; may reference L3 only
 *   L5  _state.scss            generated; may reference L4 only
 *
 * No layer may skip a level. Component schemas declare only *which* CSS
 * properties and states exist — never any CSS values.
 *
 * For every property a schema declares, layer 3 holds the base value
 * (`--<family>-<property>`). A property may additionally declare states it
 * changes in; the generator then emits one role per state. A state value is
 * either derived by a shared recipe (hover, focus, invalid, …) or supplied
 * explicitly in layer 3 as `--<family>-<property>-<state>-value`.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(import.meta.url), "../..");
const COMPONENT_DIR = join(root, "src/components");
const OUT =
{ l2: join(root, "src/styles/tokens/_semantic.scss")
, l3: join(root, "src/styles/tokens/_component.scss")
, l3s: join(root, "src/styles/tokens/_component-source.scss")
, l4: join(root, "src/styles/tokens/_role.scss")
, l5: join(root, "src/styles/tokens/_state.scss")
};

const FOLDER_TO_FAMILY ={ Accordion: "accordion", Alert: "alert", AlertDialog: "alert-dialog", AspectRatio: "aspect-ratio", Audio: "audio", Avatar: "avatar", Badge: "badge", Breadcrumb: "breadcrumb", Button: "button", Card: "card", Checkbox: "checkbox", ColorInput: "color-input", ColorPicker: "color-picker", ContextMenu: "context-menu", DataTable: "datatable", DatePicker: "datepicker", Dialog: "dialog", Disclosure: "disclosure", DropdownMenu: "menu", Field: "field", Form: "form", Image: "image", Input: "input", Label: "label", Meter: "meter", NavigationMenu: "nav", Nav: "nav-prim", Pagination: "pagination", PertChart: "pert-chart", Popover: "popover", Progress: "progress", RadioGroup: "radio", Select: "select", Separator: "separator", Skeleton: "skeleton", Slider: "slider", Switch: "switch", Table: "table", Tabs: "tabs", Textarea: "textarea", Toggle: "toggle", NodeLinkDiagram: "node-link-diagram", Tooltip: "tooltip", Video: "video"}
const familyOf = folder => FOLDER_TO_FAMILY[folder] ?? folder.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

const AFFORDANCES = new Set([ "static", "hover", "focus", "active", "disabled", "selected", "checked", "invalid", "open", "highlighted", "pressed", "current", "loading"])

// Shared state recipes. A recipe receives the property's layer-4 base role.
// States that cannot be derived this way must be supplied explicitly in L3.
const RECIPES =
{ hover: (role:string) => `color-mix(in oklch, var(${role}), var(--color-text-source-role) 12%, var(--color-clear-source-role))`
, active: (role:string) => `color-mix(in oklch, var(${role}), var(--color-text-source-role) 18%, var(--color-clear-source-role))`
, pressed: (role:string) => `color-mix(in oklch, var(${role}), var(--color-text-source-role) 18%, var(--color-clear-source-role))`
, highlighted: (role:string) => `color-mix(in oklch, var(${role}), var(--color-text-source-role) 8%, var(--color-clear-source-role))`
, focus: (role:string) => `var(--color-ring-source-role)`
, invalid: (role:string) => `color-mix(in oklch, var(${role}), var(--color-destructive-source-role) 85%)`
, disabled: (role:string) => `var(${role})`
, loading: (role:string) => `var(${role})`
};

// --- load schemas ------------------------------------------------------------
const components = [];
for (const entry of readdirSync(COMPONENT_DIR, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const schemaPath = join(COMPONENT_DIR, entry.name, "schema.ts");
  if (!existsSync(schemaPath)) continue;
  const mod = await import(schemaPath);
  if (!mod.style) {
    throw new Error(
      `${entry.name}: schema.ts has no named \`style\` export. ` +
        `Add \`export const style = { properties: [], states: ["static"] }\`.`,
    );
  }
  if (!mod.component?.title) {
    throw new Error(`${entry.name}: schema.ts has no named \`component\` export (missing title).`);
  }
  components.push({ folder: entry.name, family: familyOf(entry.name), style: mod.style });
}
components.sort((a, b) => a.folder.localeCompare(b.folder));

for (const { folder, style } of components) {
  if (!Array.isArray(style.properties)) throw new Error(`${folder}: style.properties must be an array`);
  if (!Array.isArray(style.states) || !style.states.includes("static"))
    throw new Error(`${folder}: style.states must include "static"`);
  for (const state of style.states) {
    if (!AFFORDANCES.has(state)) throw new Error(`${folder}: unknown state "${state}"`);
  }
  const seen = new Set();
  for (const item of style.properties) {
    if (typeof item?.property !== "string" || !item.property)
      throw new Error(`${folder}: every style property needs a \`property\` name`);
    if (seen.has(item.property)) throw new Error(`${folder}: duplicate property "${item.property}"`);
    seen.add(item.property);
    for (const state of item.states ?? []) {
      if (state === "static") throw new Error(`${folder}: ${item.property} — "static" is implicit`);
      if (!style.states.includes(state))
        throw new Error(`${folder}: ${item.property} declares state "${state}" not listed in style.states`);
      if (!RECIPES[state] && !AFFORDANCES.has(state))
        throw new Error(`${folder}: unknown state "${state}"`);
    }
  }
}

// --- read layer-3 declarations ----------------------------------------------
const declsOf = (file) => {
  const out = new Map();
  if (!existsSync(file)) return out;
  for (const m of readFileSync(file, "utf8").matchAll(/^\s*(--[\w-]+)\s*:\s*([^;]+);/gm)) {
    if (!out.has(m[1])) out.set(m[1], m[2].trim());
  }
  return out;
};
const compDecls = declsOf(OUT.l3);
const has = (name) => compDecls.has(name);

// Assign each L3 token to the longest matching component family prefix.
const families = [...new Set(components.map((c) => c.family))].sort((a, b) => b.length - a.length);
const familyDecls = new Map(families.map((f) => [f, []]));
const utilityDecls = [];
for (const name of compDecls.keys()) {
  const family = families.find((f) => name.startsWith(`--${f}-`));
  if (family) familyDecls.get(family).push(name);
  else utilityDecls.push(name);
}

// --- validate: schema and layer 3 must agree exactly ------------------------
const planned = new Map(); // family -> [{ property, state, role, value }]
for (const { folder, family, style } of components) {
  const declared = new Set();
  const tokens = familyDecls.get(family) ?? [];
  const plan = [];
  for (const item of style.properties) {
    const base = `--${family}-${item.property}`;
    declared.add(base);
    if (!has(base))
      throw new Error(`${folder}: property "${item.property}" has no layer-3 token ${base}`);
    plan.push({ property: item.property, state: "static", role: `${base}-static-role`, value: `var(${base})` });
    for (const state of item.states ?? []) {
      const explicit = `${base}-${state}-value`;
      declared.add(explicit);
      if (has(explicit)) {
        plan.push({ property: item.property, state, role: `${base}-${state}-role`, value: `var(${explicit})` });
      } else if (RECIPES[state]) {
        plan.push({
          property: item.property,
          state,
          role: `${base}-${state}-role`,
          value: RECIPES[state](`${base}-static-role`),
        });
      } else {
        throw new Error(
          `${folder}: ${item.property} declares state "${state}" but there is no recipe; ` +
            `add ${explicit} to _component.scss`,
        );
      }
    }
  }
  for (const token of tokens) {
    if (!declared.has(token)) {
      throw new Error(
        `${folder}: layer-3 token ${token} is not declared by the schema ` +
          `(declare "${token.slice(family.length + 3)}" or remove it)`,
      );
    }
  }
  planned.set(family, plan);
}

// --- L3 source aliases: one alias per L2 token the rest of the system needs ---
// These are semantic tokens (never primitives): they form the L2→L3 bridge so
// L4/L5 can reach the semantic layer without skipping a level.
const BRIDGE_TOKENS =
[ "color-accent"
, "color-base"
, "color-base-light-inverse"
, "color-border"
, "color-clear"
, "color-destructive"
, "color-destructive-foreground"
, "color-info"
, "color-muted"
, "color-muted-foreground"
, "color-on-accent"
, "color-pop"
, "color-positive"
, "color-ring"
, "color-surface"
, "color-text"
, "color-warning"
, "color-well"
, "color-well-fixed"
, "graph-layer-1"
, "graph-layer-2"
, "graph-layer-3"
, "graph-layer-4"
, "graph-layer-5"
, "graph-on-layer-1"
, "graph-on-layer-2"
, "graph-on-layer-3"
, "graph-on-layer-4"
, "graph-on-layer-5"
, "font-body"
, "font-heading"
, "font-code"
, "text-size-body"
, "text-size-ui"
, "line-body"
, "line-heading"
, "weight-body"
, "weight-ui"
, "weight-heading"
, "radius-control"
, "radius-surface"
, "radius-increment"
, "radius-full"
, "shadow-rest"
, "shadow-surface"
, "shadow-overlay"
, "motion-interaction"
, "motion-surface"
, "motion-ambient"
, "motion-indeterminate"
, "ease-interaction"
, "ease-ambient"
, "border-width"
, "space-unit"
, "measure-body"
, "opacity-inert"
];
const l2Names = new Set(declsOf(OUT.l2).keys());
const missing = BRIDGE_TOKENS.filter((n) => !l2Names.has(`--${n}`));
if (missing.length) throw new Error(`semantic layer is missing: ${missing.join(", ")}`);

const l3s =
[ "/* Level 3 - Component source aliases — generated by scripts/emit-tokens.mjs. Do not edit. */"
, ""
, ":root {"
];
for (const name of BRIDGE_TOKENS) l3s.push(`  --${name}-source: var(--${name});`);
l3s.push("}", "");

// --- L4: role layer — aliases L3 only ---------------------------------------
const l4 =
[ "/* Level 4 - Role — generated by scripts/emit-tokens.mjs. Do not edit. */"
, ""
, ":root {"
];
for (const { family, style } of [...components].sort((a, b) => a.family.localeCompare(b.family))) {
  const plan = planned.get(family) ?? [];
  if (!plan.length) continue;
  l4.push(`\n  /* --- ${family} --- */`);
  for (const { role, value } of plan) l4.push(`  ${role}: ${value};`);
}
l4.push(`\n  /* --- system --- */`);
for (const name of [...BRIDGE_TOKENS].sort()) {
  l4.push(`  --${name}-source-role: var(--${name}-source);`);
}
l4.push(`\n  /* --- utilities --- */`);
for (const name of [...utilityDecls].sort()) {
  l4.push(`  --${name.slice(2)}-role: var(${name});`);
}
l4.push("}", "");

// --- L5: state layer — derives from L4 only ---------------------------------
const l5 =
[ "/* Level 5 - State — generated by scripts/emit-tokens.mjs. Do not edit. */"
, ""
, ":root {"
];
for (const { family } of [...components].sort((a, b) => a.family.localeCompare(b.family))) {
  const plan = planned.get(family) ?? [];
  if (!plan.length) continue;
  l5.push(`\n  /* --- ${family} --- */`);
  for (const { property, state, role } of plan) {
    l5.push(`  --${family}-${property}-${state}: var(${role});`);
  }
}
l5.push(`\n  /* --- system --- */`);
for (const name of [...BRIDGE_TOKENS].sort()) {
  l5.push(`  --${name}-static: var(--${name}-source-role);`);
}
l5.push(`\n  /* --- utilities --- */`);
for (const name of [...utilityDecls].sort()) {
  l5.push(`  --${name.slice(2)}-static: var(--${name.slice(2)}-role);`);
}
l5.push("}", "");

// --- write -------------------------------------------------------------------
const write = (file, lines) => {
  const text = lines.join("\n");
  if (process.argv.includes("--check")) {
    const current = existsSync(file) ? readFileSync(file, "utf8") : "";
    if (current !== text) {
      console.error(`\`${file}\` is out of sync. Run \`bun scripts/emit-tokens.mjs\`.`);
      process.exit(1);
    }
    return;
  }
  if (process.argv.includes("--show")) return;
  writeFileSync(file, text);
};
write(OUT.l3s, l3s);
write(OUT.l4, l4);
write(OUT.l5, l5);
console.log(`emitted ${components.length} component specs (strict L1→L2→L3→L4→L5):`);
console.log(`  _component-source.scss L3 ${l3s.length} lines`);
console.log(`  _role.scss             L4 ${l4.length} lines`);
console.log(`  _state.scss            L5 ${l5.length} lines`);
