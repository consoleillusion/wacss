// Token audit — enforces the strict five-layer chain the README documents:
//
//  A. Layer-5 affordance law: every layer-5 token name must end in an
//     affordance word — static, hover, focus, active, disabled, selected,
//     checked, invalid, open, highlighted, pressed, current, loading.
//     Rendered styles (src/styles/components/*.scss, src/styles/base/*.scss)
//     may only reference layer-5 tokens (or component-local custom properties).
//  B. Strict adjacency — a layer may reference only itself and its immediate
//     predecessor: L1 (literals only), L2→{L1,L2}, L3→{L2,L3}, L4→{L3,L4},
//     L5→{L4,L5}. Skips (L5→L3, L3→L1, …) and upward references fail.
//     Every referenced token must be declared.
//  C. Only layer 1 holds raw literal values. In layers 2–5 a declaration may
//     only contain var() references, function calls, and CSS keywords.
//
// Exits non-zero and prints every violation on failure.

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(path_dirname(), "..");
function path_dirname() { return join(fileURLToPath(import.meta.url), ".."); }

const LAYERS =
[ ["L1", ["src/styles/tokens/_primitives.scss"]]
, ["L2", ["src/styles/tokens/_semantic.scss"]]
, ["L3", ["src/styles/tokens/_component.scss", "src/styles/tokens/_component-source.scss"]]
, ["L4", ["src/styles/tokens/_role.scss"]]
, ["L5", ["src/styles/tokens/_state.scss"]]
];

// A layer may reference itself and its immediate predecessor only.
const ADJACENT =
{ L1: new Set()
, L2: new Set(["L1", "L2"])
, L3: new Set(["L2", "L3"])
, L4: new Set(["L3", "L4"])
, L5: new Set(["L4", "L5"])
};

const violations = [];
const fail = (rule, file, message) => violations.push({ rule, file, message });

const stripComments = (src) => src.replace(/\/\*[\s\S]*?\*\//g, "");

// A `var(--token)` reference. Sass interpolation (`var(--color-dark-#{$name})`)
// is not a token name and is skipped.
const refsIn = (value) =>
  [...value.matchAll(/var\(\s*(--[\w-]+)/g)]
    .map((m) => m[1])
    .filter((name) => !name.endsWith("-"));

// --- token inventory ---------------------------------------------------------
const layerOf = {};
const source = {}; // layer -> [ { file, text } ]
for (const [layer, files] of LAYERS) {
  source[layer] = files.map((file) => ({ file, text: readFileSync(join(root, file), "utf8") }));
  for (const { file, text } of source[layer]) {
    for (const m of stripComments(text).matchAll(/^\s*(--[\w-]+)\s*:/gm)) {
      if (layerOf[m[1]] === undefined) layerOf[m[1]] = { layer, file };
    }
  }
}

// --- Rule A1: layer-5 tokens must end in an affordance -----------------------
const AFFORDANCES = new Set([
  "static", "hover", "focus", "active", "disabled",
  "selected", "checked", "invalid", "open", "highlighted",
  "pressed", "current", "loading",
]);
for (const { file, text } of source.L5) {
  for (const m of stripComments(text).matchAll(/^\s*(--[\w-]+)\s*:/gm)) {
    const tail = m[1].slice(2).split("-").pop();
    if (!AFFORDANCES.has(tail)) {
      fail("A", file, `${m[1]} — layer-5 tokens must end in an affordance (${[...AFFORDANCES].join(", ")})`);
    }
  }
}

// --- Rule A2: rendered styles consume layer-5 tokens only --------------------
const renderedFiles = (dir) =>
  readdirSync(join(root, dir)).filter((f) => f.endsWith(".scss")).map((f) => `${dir}/${f}`);
const rendered = ["src/styles/components", "src/styles/base"].flatMap(renderedFiles);
const localProps = new Set();
for (const f of rendered) {
  for (const m of stripComments(readFileSync(join(root, f), "utf8")).matchAll(/^\s*(--[\w-]+)\s*:/gm)) {
    localProps.add(m[1]);
  }
}
for (const f of rendered) {
  const text = stripComments(readFileSync(join(root, f), "utf8"));
  for (const name of refsIn(text)) {
    const declared = layerOf[name];
    if (declared?.layer === "L5") continue;
    if (!declared && localProps.has(name)) continue; // component-local alias
    fail("A", f, `var(${name}) — rendered styles may only consume layer-5 tokens (plus component-local custom properties); this resolves to ${declared?.layer ?? "nothing declared"}`);
  }
}

// --- Rule B: strict adjacency -------------------------------------------------
for (const [layer] of LAYERS) {
  for (const { file, text } of source[layer]) {
    for (const line of stripComments(text).split("\n")) {
      const decl = /^\s*(--[\w-]+)\s*:(.*)$/.exec(line);
      if (!decl) continue;
      for (const target of refsIn(decl[2])) {
        const declared = layerOf[target];
        if (!declared) {
          fail("B", file, `var(${target}) — token is not declared in any layer`);
          continue;
        }
        if (!ADJACENT[layer].has(declared.layer)) {
          fail("B", file, `${decl[1]} → var(${target}) — ${layer} may reference only ${[...ADJACENT[layer]].join("/") || "nothing"}; ${target} is ${declared.layer}`);
        }
      }
    }
  }
}

// --- Rule C: only layer 1 holds raw literals ----------------------------------
// A value in L2–L5 must be composed of var() references, function calls, and
// CSS keywords only.
const KEYWORDS = new Set([
  "transparent", "inherit", "initial", "unset", "revert", "revert-layer",
  "currentcolor", "auto", "none", "normal", "bold", "bolder", "lighter",
]);
const stripFunctions = (src) => {
  let out = src;
  let prev;
  const re = /[A-Za-z_-][\w-]*\([^()]*\)/g;
  do { prev = out; out = out.replace(re, " "); } while (out !== prev);
  return out;
};
for (const [layer] of LAYERS) {
  if (layer === "L1") continue;
  for (const { file, text } of source[layer]) {
    for (const line of stripComments(text).split("\n")) {
      const m = /^\s*(--[\w-]+)\s*:(.*)$/.exec(line);
      if (!m) continue;
      const [, name, value] = m;
      const bare = stripFunctions(value)
        .replace(/var/g, " ")
        .replace(/--[\w-]+/g, " ")
        .trim()
        .replace(/^[,;]+|[,;]+$/g, "")
        .trim();
      if (bare === "" || KEYWORDS.has(bare.toLowerCase())) continue;
      fail("C", file, `${name}: literal outside layer 1 — "${value.trim()}"`);
    }
  }
}

// --- Rule D: layer 1 is literals only — no var() references -------------------
for (const { file, text } of source.L1) {
  for (const name of refsIn(stripComments(text))) {
    fail("D", file, `var(${name}) — layer 1 must hold raw literals only`);
  }
}

if (violations.length) {
  for (const v of violations) console.error(`[${v.rule}] ${v.file}: ${v.message}`);
  console.error(`\n${violations.length} violation(s)`);
  process.exit(1);
} else {
  console.log("token audit: OK");
}
