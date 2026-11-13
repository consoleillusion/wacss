import * as sass from "sass";
import { transform } from "lightningcss";
import { mkdir, readdir, rm, writeFile, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const input = path.join(root, "src/styles/wacss.scss");
const outDir = path.join(root, "dist");
const cssPath = path.join(outDir, "wacss.css");
const minPath = path.join(outDir, "wacss.min.css");

// --- Mangling ---
// Layers 1 (_primitives.scss) and 2 (_semantic.scss) stay fully readable.
// Every other custom property declared in the build is renamed to a tiny
// string in the minified sheet only:
//   L3/L4/L5 tokens (_component.scss, _role.scss, _state.scss), and
//   stylesheet-local custom properties declared by rendered styles
//   (e.g. --alert-accent) — they are not part of the documented token API.
// Runtime-coupled names (anything also referenced outside src/styles, e.g.
// --xy-* consumed by @xyflow/svelte) are kept verbatim and logged.
const READABLE_LAYERS = [
  "src/styles/tokens/_primitives.scss",
  "src/styles/tokens/_semantic.scss",
];

/** Declared custom property names in a token layer source file. */
const declaredNames = async (file) => {
  const text = await readFile(path.join(root, file), "utf8");
  const out = new Set();
  for (const m of text.matchAll(/^\s*(--[\w-]+)\s*:/gm)) out.add(m[1]);
  return out;
};

/** Every custom property token appearing anywhere in a file (declarations,
 *  references, interpolated names) — captures Sass-@each-generated names. */
const mentionedNames = async (file) => {
  const text = await readFile(path.join(root, file), "utf8");
  const out = new Set();
  for (const m of text.matchAll(/--[\w-]+/g)) out.add(m[0]);
  return out;
};

const SCAN_SKIP_DIRS = new Set(["node_modules", "dist", "demo-dist", ".git"]);
const SCAN_EXTS = new Set([".astro", ".svelte", ".ts", ".js", ".mjs", ".html", ".css", ".json"]);
/** Runtime-relevant files may contain token names but are NOT rewritten by this
 *  script (their assets are emitted separately or consumed dynamically), so any
 *  mangled candidate found there must be kept verbatim. */
const scanForNames = async (names) => {
  const found = new Map(); // name -> list of files
  const mark = (rel, name) => {
    const files = found.get(name) ?? [];
    files.push(rel);
    found.set(name, files);
  };
  const sorted = [...names].sort((a, b) => b.length - a.length);
  const nameRe = new RegExp(`(?<![\\w-])(${sorted.join("|")})(?![\\w-])`, "g");

  const walk = async (dir, base) => {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      if (entry.name.startsWith(".") && entry.name !== ".github") continue;
      const full = path.join(dir, entry.name);
      const rel = path.relative(root, full);
      if (entry.isDirectory()) {
        if (SCAN_SKIP_DIRS.has(entry.name)) continue;
        // Build/analysis tooling is not a runtime consumer of our CSS vars.
        if (rel === "scripts") continue;
        await walk(full, base);
        continue;
      }
      const ext = path.extname(entry.name);
      if (!SCAN_EXTS.has(ext)) continue;
      if ((await stat(full).catch(() => null))?.size > 2 * 1024 * 1024) continue;
      // src/styles is the input to this build; its occurrences are rewritten
      // consistently in both sheets, so it is not a runtime coupling.
      if (rel.startsWith("src/styles/")) continue;
      const text = await readFile(full, "utf8").catch(() => "");
      if (!text) continue;
      for (const m of text.matchAll(nameRe)) mark(rel, m[1]);
    }
  };
  await walk(root, root);

  // node_modules: only the compiled assets the app actually ships against.
  const walkNm = async (dir, rel0) => {
    const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      const rel = rel0 + "/" + entry.name;
      if (entry.isDirectory()) {
        if (entry.name === ".bin" || entry.name.startsWith(".")) continue;
        await walkNm(full, rel);
        continue;
      }
      const ext = path.extname(entry.name);
      if (!SCAN_EXTS.has(ext)) continue;
      if ((await stat(full).catch(() => null))?.size > 2 * 1024 * 1024) continue;
      const text = await readFile(full, "utf8").catch(() => "");
      if (!text) continue;
      for (const m of text.matchAll(nameRe)) mark(rel, m[1]);
    }
  };
  await walkNm(path.join(root, "node_modules"), "node_modules");
  return found;
};

/** All custom property names declared in a CSS text, for collision checks. */
const declaredInCss = (css) => {
  const out = new Set();
  for (const m of css.matchAll(/(?<![\w-])(--[\w-]+)\s*:/g)) out.add(m[1]);
  return out;
};

const shortName = (i) => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let n = i;
  let s = chars[n % 52];
  n = Math.floor(n / 52);
  while (n > 0) {
    n -= 1;
    s = chars[n % 52] + s;
    n = Math.floor(n / 52);
  }
  return s;
};

const buildManglePlan = async (cssText) => {
  // Every custom property declared by the sheet is in play…
  const candidates = new Set(declaredInCss(cssText));
  // …except layers 1 and 2, which stay readable (all names mentioned there,
  // including @each-generated palette names)…
  for (const file of READABLE_LAYERS) {
    for (const name of await mentionedNames(file)) candidates.delete(name);
  }
  // …and except names referenced anywhere a rename cannot reach at build time.
  const excluded = new Map();
  if (candidates.size) {
    const runtimeHits = await scanForNames(candidates);
    for (const [name, files] of runtimeHits) {
      excluded.set(name, files.slice(0, 3));
      candidates.delete(name);
    }
  }
  return { candidates, excluded };
};

const mangleCss = (css, names) => {
  // Collision check against everything declared anywhere in the sheet:
  // generated names must never shadow an existing custom property.
  const taken = declaredInCss(css);
  const map = new Map();
  let i = 0;
  for (const name of [...names].sort()) {
    let short = shortName(i++);
    while (taken.has("--" + short)) short = shortName(i++);
    map.set(name, "--" + short);
  }
  const keys = [...map.keys()].sort((a, b) => b.length - a.length);
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(?<![\\w-])(${keys.map(esc).join("|")})(?![\\w-])`, "g");
  const out = css.replace(re, (m) => map.get(m) ?? m);
  return { out, map };
};

/** Round-trip check: every var()/declaration custom property in the output\n *  must resolve to a name declared in the same sheet. */
const verifyRoundTrip = (css, label) => {
  const declared = declaredInCss(css);
  const missing = new Map();
  for (const m of css.matchAll(/var\(\s*(--[\w-]+)/g)) {
    if (!declared.has(m[1])) missing.set(m[1], (missing.get(m[1]) ?? 0) + 1);
  }
  if (missing.size) {
    const list = [...missing].slice(0, 10).map(([n, c]) => `${n} (x${c})`).join(", ");
    throw new Error(`${label}: unresolved custom property references: ${list}`);
  }
};

// --- Build ---
await mkdir(outDir, { recursive: true });
for (const name of await readdir(outDir)) {
  await rm(path.join(outDir, name), { recursive: true, force: true });
}

const compiled = sass.compile(input, {
  style: "expanded",
  loadPaths: [path.join(root, "src/styles")],
  sourceMap: false,
});

const prettyCss = compiled.css;
await writeFile(cssPath, prettyCss, "utf8");

const minified = transform({
  filename: "wacss.css",
  code: Buffer.from(prettyCss),
  minify: true,
  sourceMap: false,
});

if (minified.warnings.length > 0) {
  for (const warning of minified.warnings) {
    console.warn(String(warning.message));
  }
}

const { candidates, excluded } = await buildManglePlan(minified.code.toString("utf8"));
const { out: mangledCss, map } = mangleCss(minified.code.toString("utf8"), candidates);
verifyRoundTrip(mangledCss, "dist/wacss.min.css");

// No manglable name may survive unrenamed (unless excluded as runtime-coupled).
const survivors = [...candidates].filter((n) => mangledCss.includes(n));
if (survivors.length) {
  throw new Error(`dist/wacss.min.css: ${survivors.length} manglable names survived: ${survivors.slice(0, 5).join(", ")}`);
}

await writeFile(minPath, mangledCss, "utf8");
console.log(`dist/wacss.css ${Buffer.byteLength(prettyCss)} bytes`);
console.log(`dist/wacss.min.css ${Buffer.byteLength(mangledCss)} bytes`);
console.log(`mangled ${map.size} non-L1/L2 custom properties; excluded ${excluded.size} runtime-coupled names`);
for (const [name, files] of [...excluded].slice(0, 20)) {
  console.log(`  kept --${name.slice(2)} (used by ${files.join(", ")})`);
}
