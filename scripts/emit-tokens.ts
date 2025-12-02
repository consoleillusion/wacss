/**
 * Token layer emitter — strict five-layer chain with role × state generation.
 *
 *   L1  _primitives.scss       raw literals only
 *   L2  _semantic.scss         may reference L1 (and same-layer primas)
 *   L3  _component.scss        hand-authored primas; may reference L2 only
 *       _component-source.scss generated aliases of L2 tokens; may reference L2 only
 *   L4  _role.scss             generated; may reference L3 only
 *   L5  _state.scss            generated; may reference L4 only
 *
 * Component schemas export `meta`:
 *
 *   meta = { name, cssProperties, roles, states }
 *
 * `cssProperties` names the L3 primas (`--<name>-<property>`). `roles` names
 * the semantic variants (standard, primary, secondary, tertiary, positive,
 * warn, danger, informational). `states` names the interaction states. The
 * generator emits the full matrix:
 *
 *   L4  --<name>-<property>-<role>
 *   L5  --<name>-<property>-<role>-<state>
 *
 * A role other than `standard` may override the L3 value with
 * `--<name>-<property>-<role>-value`. A state may override its recipe with
 * `--<name>-<property>-<role>-<state>-value`. Both are L3 primas; the extra
 * L4 `--…-<role>-<state>-role` alias keeps every reference adjacent.
 *
 * State recipes are generated, not hand-written: ink properties mix their role
 * colour toward `--color-interaction` (white on dark themes, black on light
 * ones) by a share from the `--mix-*` scale. Overriding those L2 tokens retunes
 * every generated state token at runtime.
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
const ROLES = new Set([ "standard", "primary", "secondary", "tertiary", "positive", "warn", "danger", "informational"])

// A property ending in one of these reads as ink, not geometry. Shared state
// recipes only tint ink properties; other properties alias their role token.
// `shadow` is deliberately absent: a box-shadow is not a colour and cannot be
// mixed with a colour in color-mix().
const COLOR_PROPERTY = /(background|border|color|ring|overlay|track|thumb|indicator|dot|range|fill|stroke)$/;
const isColor = (property:string) => COLOR_PROPERTY.test(property);

// Shared state recipes. Every colour state mixes the role colour toward the
// theme's interaction pole (`--color-interaction`: white on dark, black on
// light) by the matching entry in the L1/L2 mix scale. Blending in oklab keeps
// status and accent hues intact; oklch's polar rotation would drift them.
const interaction = "var(--color-interaction-source-role)";
const shift = (role:string, mix:string) =>
  `color-mix(in oklab, var(${role}), ${interaction} var(--${mix}-source-role))`;

const RECIPES: Record<string, (role:string, property:string) => string> =
{ highlighted: (role, property) => isColor(property) ? shift(role, "mix-highlighted") : `var(${role})`
, hover: (role, property) => isColor(property) ? shift(role, "mix-hover") : `var(${role})`
, selected: (role, property) => isColor(property) ? shift(role, "mix-selected") : `var(${role})`
, checked: (role, property) => isColor(property) ? shift(role, "mix-checked") : `var(${role})`
, current: (role, property) => isColor(property) ? shift(role, "mix-current") : `var(${role})`
, open: (role, property) => isColor(property) ? shift(role, "mix-open") : `var(${role})`
, active: (role, property) => isColor(property) ? shift(role, "mix-active") : `var(${role})`
, pressed: (role, property) => isColor(property) ? shift(role, "mix-pressed") : `var(${role})`
, focus: (role, property) => isColor(property) ? `var(--color-ring-source-role)` : `var(${role})`
, invalid: (role, property) => isColor(property)
    ? `color-mix(in oklab, var(${role}), var(--color-destructive-source-role) 85%)`
    : `var(${role})`
, disabled: (role) => `var(${role})`
, loading: (role) => `var(${role})`
};

// --- load schemas ------------------------------------------------------------
const components = [];
for (const entry of readdirSync(COMPONENT_DIR, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const schemaPath = join(COMPONENT_DIR, entry.name, "schema.ts");
  if (!existsSync(schemaPath)) continue;
  const mod = await import(schemaPath);
  if (!mod.meta) {
    throw new Error(
      `${entry.name}: schema.ts has no named \`meta\` export. ` +
        `Add \`export const meta = { name, cssProperties: [], roles: ["standard"], states: ["static"] }\`.`,
    );
  }
  if (!mod.component?.title) {
    throw new Error(`${entry.name}: schema.ts has no named \`component\` export (missing title).`);
  }
  const meta = mod.meta;
  const family = familyOf(entry.name);
  if (meta.name !== family) {
    throw new Error(`${entry.name}: meta.name is "${meta.name}", expected "${family}"`);
  }
  components.push({ folder: entry.name, family, meta });
}
components.sort((a, b) => a.folder.localeCompare(b.folder));

for (const { folder, meta } of components) {
  if (!Array.isArray(meta.cssProperties)) throw new Error(`${folder}: meta.cssProperties must be an array`);
  if (!Array.isArray(meta.roles) || !meta.roles.length)
    throw new Error(`${folder}: meta.roles must be a non-empty array`);
  for (const role of meta.roles) {
    if (!ROLES.has(role)) throw new Error(`${folder}: unknown role "${role}"`);
  }
  if (new Set(meta.roles).size !== meta.roles.length) throw new Error(`${folder}: duplicate role`);
  if (!Array.isArray(meta.states) || !meta.states.includes("static"))
    throw new Error(`${folder}: meta.states must include "static"`);
  for (const state of meta.states) {
    if (!AFFORDANCES.has(state)) throw new Error(`${folder}: unknown state "${state}"`);
  }
  if (new Set(meta.states).size !== meta.states.length) throw new Error(`${folder}: duplicate state`);
  const seen = new Set();
  for (const property of meta.cssProperties) {
    if (typeof property !== "string" || !property)
      throw new Error(`${folder}: every cssProperties entry needs a name`);
    if (seen.has(property)) throw new Error(`${folder}: duplicate property "${property}"`);
    seen.add(property);
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
const planned = new Map(); // family -> { plan, roleSources }
for (const { folder, family, meta } of components) {
  const declared = new Set();
  const tokens = familyDecls.get(family) ?? [];
  const plan = [];
  const roleSources = new Map(); // L4 token -> L3 source
  for (const property of meta.cssProperties) {
    const base = `--${family}-${property}`;
    declared.add(base);
    if (!has(base))
      throw new Error(`${folder}: property "${property}" has no layer-3 token ${base}`);
    for (const role of meta.roles) {
      const roleToken = `${base}-${role}`;
      // A role aliases the L3 base unless it declares an override token.
      // Roles that own the base value (alert's informational, badge's
      // standard, …) therefore stay aliases rather than self-references.
      const roleValue = `${base}-${role}-value`;
      if (has(roleValue)) declared.add(roleValue);
      roleSources.set(roleToken, has(roleValue) ? `var(${roleValue})` : `var(${base})`);
      for (const state of meta.states) {
        if (state === "static") {
          plan.push({ property, role, state, roleToken, value: `var(${roleToken})` });
          continue;
        }
        const explicit = `${base}-${role}-${state}-value`;
        declared.add(explicit);
        if (has(explicit)) {
          const helper = `${roleToken}-${state}-role`;
          plan.push({ property, role, state, roleToken, value: `var(${explicit})`, helper });
        } else {
          const recipe = RECIPES[state];
          plan.push({
            property,
            role,
            state,
            roleToken,
            value: recipe ? recipe(roleToken, property) : `var(${roleToken})`,
          });
        }
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
  planned.set(family, { plan, roleSources });
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
, "color-interaction"
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
, "mix-active"
, "mix-checked"
, "mix-current"
, "mix-highlighted"
, "mix-hover"
, "mix-open"
, "mix-pressed"
, "mix-selected"
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
[ "/* Level 3 - Component source aliases — generated by scripts/emit-tokens.ts. Do not edit. */"
, ""
, ":root {"
];
for (const name of BRIDGE_TOKENS) l3s.push(`  --${name}-source: var(--${name});`);
l3s.push("}", "");

// --- L4: role layer — aliases L3 only ---------------------------------------
const l4 =
[ "/* Level 4 - Role — generated by scripts/emit-tokens.ts. Do not edit. */"
, ""
, ":root {"
];
for (const { family } of [...components].sort((a, b) => a.family.localeCompare(b.family))) {
  const entry = planned.get(family);
  if (!entry) continue;
  const { plan, roleSources } = entry;
  if (!plan.length) continue;
  l4.push(`\n  /* --- ${family} --- */`);
  for (const [roleToken, value] of roleSources) {
    l4.push(`  ${roleToken}: ${value};`);
  }
  for (const { helper, value } of plan) {
    if (!helper) continue;
    l4.push(`  ${helper}: ${value};`);
  }
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
[ "/* Level 5 - State — generated by scripts/emit-tokens.ts. Do not edit. */"
, ""
, ":root {"
];
for (const { family } of [...components].sort((a, b) => a.family.localeCompare(b.family))) {
  const { plan } = planned.get(family) ?? { plan: [] };
  if (!plan.length) continue;
  l5.push(`\n  /* --- ${family} --- */`);
  for (const { property, role, state, helper, value } of plan) {
    const name = `--${family}-${property}-${role}-${state}`;
    l5.push(`  ${name}: ${helper ? `var(${helper})` : value};`);
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
      console.error(`\`${file}\` is out of sync. Run \`bun scripts/emit-tokens.ts\`.`);
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
console.log(`emitted ${components.length} component specs (role × state, strict L1→L2→L3→L4→L5):`);
console.log(`  _component-source.scss L3 ${l3s.length} lines`);
console.log(`  _role.scss             L4 ${l4.length} lines`);
console.log(`  _state.scss            L5 ${l5.length} lines`);
