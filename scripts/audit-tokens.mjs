// Token audit — enforces the hierarchy rules the README documents:
//
//  A. Layer-5 affordance law: every layer-5 token name must end in an
//     affordance word — static, hover, focus, active, disabled, selected,
//     checked, invalid, open, highlighted, pressed, current, loading.
//     And rendered styles (src/styles/components/*.scss, src/styles/base/*.scss)
//     may only reference layer-5 tokens (or component-local custom properties).
//  B. Token layers reference only layers at or above themselves
//     (L2→L1, L3→L1..L3, L4→L1..L4; L5 may reference anything).
//     No layer references downward, no undefined tokens.
//  C. Only layer 1 holds raw literal values. In layers 2–5 a declaration may
//     only contain var() references, keywords, and function calls.
//
// Exits non-zero and prints every violation on failure.

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(path_dirname(), "..");
function path_dirname() { return join(fileURLToPath(import.meta.url), ".."); }

const LAYERS = [
  ["L1", "src/styles/tokens/_primitives.scss"],
  ["L2", "src/styles/tokens/_semantic.scss"],
  ["L3", "src/styles/tokens/_component.scss"],
  ["L4", "src/styles/tokens/_role.scss"],
  ["L5", "src/styles/tokens/_state.scss"],
];
const RENDERED_DIRS = ["src/styles/components", "src/styles/base"]; // (kept for future rules)

const violations = [];
const fail = (rule, file, message) => violations.push({ rule, file, message });

// --- token inventory ---
const layerOf = {};
const source = {};
for (const [layer, file] of LAYERS) {
  const text = readFileSync(join(root, file), "utf8");
  source[layer] = text;
  for (const m of text.matchAll(/^\s*(--[\w-]+)\s*:/gm)) layerOf[m[1]] = layer;
}
// Expand Sass @each-generated palette variables (e.g. --color-dark-sumi):
// they are produced from the $colors map keys at build time.
{
  const text = source["L1"];
  for (const m of text.matchAll(/^\s*"([a-z]+)":\s*oklch/gm)) {
    layerOf[`--color-dark-${m[1]}`] = "L1";
    layerOf[`--color-light-${m[1]}`] = "L1";
  }
}
const layerRank = { L1: 1, L2: 2, L3: 3, L4: 4, L5: 5 };

function stripComments(src) {
  return src.replace(/\/\*[\s\S]*?\*\//g, "");
}

// Remove functions together with their contents, innermost-first, so what
// remains are bare tokens/literals of the declaration. Replacements carry no
// parentheses so outer calls can collapse in the next pass.
function stripFunctions(src) {
  let out = src;
  let prev;
  const re = /[A-Za-z_-][\w-]*\([^()]*\)/g;
  do { prev = out; out = out.replace(re, "SF"); } while (out !== prev);
  return out;
}

// --- Rule A1: layer-5 tokens must carry an affordance at the affordance position ---
// The final hyphen segment of every layer-5 token name must be one of the
// permitted affordances. Anything else at that position is a layer label,
// an emphasis word, or an alien category — not a state.
const AFFORDANCES = new Set([
  "static", "hover", "focus", "active", "disabled",
  "selected", "checked", "invalid", "open", "highlighted",
  "pressed", "current", "loading",
]);
{
  const text = stripComments(readFileSync(join(root, "src/styles/tokens/_state.scss"), "utf8"));
  for (const m of text.matchAll(/^\s*(--[\w-]+)\s*:/gm)) {
    const tail = m[1].slice(2).split("-").pop();
    if (!AFFORDANCES.has(tail)) fail("A", "src/styles/tokens/_state.scss", `${m[1]} — layer-5 tokens must end in an affordance (${[...AFFORDANCES].join(", ")})`);
  }
}

// --- Rule A2: rendered styles consume layer-5 tokens only ---
// Component-local custom properties (declared in the rendered files themselves,
// e.g. --alert-icon in _alert.scss) are the only other permitted references.
const renderedFiles = (dir) =>
  readdirSync(join(root, dir)).filter((f) => f.endsWith(".scss")).map((f) => `${dir}/${f}`);
const rendered = ["src/styles/components", "src/styles/base"].flatMap(renderedFiles);
const localProps = new Set();
for (const f of rendered) {
  const text = stripComments(readFileSync(join(root, f), "utf8"));
  for (const m of text.matchAll(/^\s*(--[\w-]+)\s*:/gm)) localProps.add(m[1]);
}
for (const f of rendered) {
  const text = stripComments(readFileSync(join(root, f), "utf8"));
  for (const m of text.matchAll(/var\(\s*(--[\w-]+)/g)) {
    const name = m[1];
    const layer = layerOf[name];
    if (layer === "L5") continue;
    if (!layer && localProps.has(name)) continue; // component-local alias
    fail("A", f, `var(${name}) — rendered styles may only consume layer-5 tokens (plus component-local custom properties); this resolves to ${layer ?? "nothing declared"}`);
  }
}

// --- Rule B ---
for (const [layer, file] of LAYERS) {
  const text = stripComments(source[layer]);
  for (const m of text.matchAll(/var\(\s*(--[\w-]+)(#?)/g)) {
    const target = m[1];
    if (m[2] === "#") continue; // Sass interpolation like var(--color-dark-#{$name}) generates --color-dark-*
    const targetLayer = layerOf[target];
    if (!targetLayer) { fail("B", file, `var(${target}) — token is not defined in any layer`); continue; }
    if (layerRank[targetLayer] > layerRank[layer]) {
      fail("B", file, `var(${target}) — ${layer} may not reference ${targetLayer} (downward reference)`);
    }
  }
}

// --- Rule C ---
// A declaration value is allowed iff it is entirely composed of:
//   - var() references,
//   - other function calls (calc/clamp/oklch/color-mix/min/max…),
//   - keywords (inherit/transparent/…).
// Anything else — bare numerics, colors, fonts — must be a primitive in layer 1.
for (const [layer, file] of LAYERS) {
  if (layer === "L1") continue;
  const text = stripComments(source[layer]);
  for (const line of text.split("\n")) {
    const m = /^\s*(--[\w-]+)\s*:(.*)$/.exec(line);
    if (!m) continue; // not a declaration (selector, etc.)
    const [, name, value] = m;
    const bare = stripFunctions(value).replace(/SF/g, "");
    // Keywords that may legitimately appear bare:
    const keywordOnly = /^\s*(transparent|inherit|initial|unset|revert|currentColor|auto|none|normal|bold(er)?|lighter)?\s*;?\s*$/i;
    if (keywordOnly.test(bare)) continue;
    fail("C", file, `${name}: literal outside layer 1 — "${value.trim()}"`);
  }
}

if (violations.length) {
  for (const v of violations) console.error(`[${v.rule}] ${v.file}: ${v.message}`);
  console.error(`\n${violations.length} violation(s)`);
  process.exit(1);
} else {
  console.log("token audit: OK");
}
