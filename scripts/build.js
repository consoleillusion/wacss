/** Build the distributable CSS by concatenating the generated token sheets,
 *  hand-authored helpers and the CSS generated from each component schema.
 *  L1/L2 names stay readable; L3–L5 and private options are mangled in the
 *  minified sheet. Run `scripts/emit-tokens.ts` first (npm run tokens). */
import { transform } from "lightningcss";
import { mkdir, readdir, rm, writeFile, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "dist");
const cssPath = path.join(outDir, "wacss.css");
const minPath = path.join(outDir, "wacss.min.css");

const TOKEN_FILES = [
  "src/styles/tokens/l1-primitives.css",
  "src/styles/tokens/l2-semantic.css",
  "src/styles/tokens/l3-component.css",
  "src/styles/tokens/l4-variant.css",
  "src/styles/tokens/l5-state.css",
];
const RESET_FILES = ["src/helpers/reset.css"];
const LAYOUT_FILES = [
  "src/helpers/layout.css",
  "src/helpers/keyframes.css",
  "src/helpers/reduced-motion.css",
];
const GENERATED_FILES = [
  "src/styles/generated/elements.css",
  "src/styles/generated/components.css",
];

const READABLE_FILES = new Set([
  "src/styles/tokens/l1-primitives.css",
  "src/styles/tokens/l2-semantic.css",
  "src/helpers/reset.css",
  "src/helpers/layout.css",
  "src/helpers/keyframes.css",
  "src/helpers/reduced-motion.css",
]);

const SCAN_SKIP_DIRS = new Set(["node_modules", "dist", "demo-dist", ".git", "scripts"]);
const SCAN_EXTS = new Set([".astro", ".svelte", ".ts", ".js", ".mjs", ".html", ".css", ".json"]);

const mentionedNames = async (files) => {
  const names = new Set();
  for (const file of files) {
    const text = await readFile(path.join(root, file), "utf8").catch(() => "");
    for (const m of text.matchAll(/--[\w-]+/g)) names.add(m[0]);
  }
  return names;
};

const scanForNames = async (names) => {
  const found = new Map();
  if (!names.size) return found;
  const mark = (rel, name) => found.set(name, [...(found.get(name) ?? []), rel]);
  const sorted = [...names].sort((a, b) => b.length - a.length);
  const nameRe = new RegExp(`(?<![\\w-])(${sorted.join("|")})(?![\\w-])`, "g");
  const walk = async (dir, skipBuildInputs) => {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      if (entry.name.startsWith(".") && entry.name !== ".github") continue;
      const full = path.join(dir, entry.name);
      const rel = path.relative(root, full);
      if (entry.isDirectory()) {
        if (SCAN_SKIP_DIRS.has(entry.name)) continue;
        await walk(full, skipBuildInputs || rel.startsWith("src/styles") || rel.startsWith("src/tokens"));
        continue;
      }
      if (!SCAN_EXTS.has(path.extname(entry.name))) continue;
      if ((await stat(full).catch(() => null))?.size > 2 * 1024 * 1024) continue;
      if (skipBuildInputs || /^src\/components\/[^/]+\/(tokens|schema)\.ts$/.test(rel)) continue;
      const text = await readFile(full, "utf8").catch(() => "");
      for (const m of text.matchAll(nameRe)) mark(rel, m[1]);
    }
  };
  await walk(root, false);
  const walkNm = async (dir, rel0) => {
    for (const entry of await readdir(dir, { withFileTypes: true }).catch(() => [])) {
      const full = path.join(dir, entry.name);
      const rel = rel0 + "/" + entry.name;
      if (entry.isDirectory()) {
        if (entry.name === ".bin" || entry.name.startsWith(".")) continue;
        await walkNm(full, rel);
      } else if (SCAN_EXTS.has(path.extname(entry.name))) {
        const text = await readFile(full, "utf8").catch(() => "");
        for (const m of text.matchAll(nameRe)) mark(rel, m[1]);
      }
    }
  };
  await walkNm(path.join(root, "node_modules"), "node_modules");
  return found;
};

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
  while (n > 0) { n -= 1; s = chars[n % 52] + s; n = Math.floor(n / 52); }
  return s;
};

const verifyRoundTrip = (css, label, localOptions) => {
  const declared = declaredInCss(css);
  const missing = new Set([...css.matchAll(/var\(\s*(--[\w-]+)/g)]
    .map((m) => m[1]).filter((n) => !declared.has(n) && !localOptions.has(n)));
  if (missing.size) throw new Error(`${label}: unresolved custom property references: ${[...missing].slice(0, 10).join(", ")}`);
};

/** Helper option properties are local knobs (--stack-space, --grid-min…), not tokens. */
const helperOptions = async () => {
  const options = new Set();
  for (const file of [...RESET_FILES, ...LAYOUT_FILES]) {
    const text = await readFile(path.join(root, file), "utf8");
    const declared = new Set([...text.matchAll(/(?<![\w-])(--[\w-]+)\s*:/g)].map((m) => m[1]));
    for (const m of text.matchAll(/var\(\s*(--[\w-]+)/g))
      if (!declared.has(m[1])) options.add(m[1]);
  }
  return options;
};

await mkdir(outDir, { recursive: true });
for (const name of ["wacss.css", "wacss.min.css"]) await rm(path.join(outDir, name), { force: true });

const readParts = async (files) => (await Promise.all(files.map((f) => readFile(path.join(root, f), "utf8")))).join("\n");
const [tokens, reset, generated, layout] = await Promise.all([
  readParts(TOKEN_FILES), readParts(RESET_FILES), readParts(GENERATED_FILES), readParts(LAYOUT_FILES),
]);
const prettyCss = [
  "@layer wacss.reset, wacss.elements, wacss.components, wacss.layout;",
  "",
  tokens,
  `@layer wacss.reset {\n${reset}\n}`,
  generated,
  `@layer wacss.layout {\n${layout}\n}`,
  "",
].join("\n");
await writeFile(cssPath, prettyCss, "utf8");

const minified = transform({ filename: "wacss.css", code: Buffer.from(prettyCss), minify: true, sourceMap: false });
for (const warning of minified.warnings) console.warn(String(warning.message));
const minCss = minified.code.toString("utf8");

const candidates = declaredInCss(minCss);
for (const name of await mentionedNames([...READABLE_FILES])) candidates.delete(name);
const excluded = new Map();
for (const [name, files] of await scanForNames(candidates)) {
  excluded.set(name, files.slice(0, 3));
  candidates.delete(name);
}
// Third-party widgets receive inline styles built from token-name templates;
// the static name never appears in source, so exclude those whole prefixes.
const runtimePrefixes = new Set();
const scanRuntimeTemplates = async (dir) => {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (["node_modules", "dist", "demo-dist", ".git"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) { await scanRuntimeTemplates(full); continue; }
    if (![".svelte", ".astro", ".ts"].includes(path.extname(entry.name))) continue;
    const text = await readFile(full, "utf8").catch(() => "");
    for (const m of text.matchAll(/var\(\s*--([a-z][\w-]*?)-\$\{[^}]+\}-[\w-]+\)/g))
      runtimePrefixes.add(m[1]);
  }
};
await scanRuntimeTemplates(path.join(root, "src"));
for (const name of [...candidates])
  if ([...runtimePrefixes].some((p) => name.startsWith(`--${p}-`))) {
    excluded.set(name, ["runtime template"]);
    candidates.delete(name);
  }
const taken = declaredInCss(minCss);
const map = new Map();
let i = 0;
for (const name of [...candidates].sort()) {
  let short = shortName(i++);
  while (taken.has("--" + short)) short = shortName(i++);
  map.set(name, "--" + short);
}
const keys = [...map.keys()].sort((a, b) => b.length - a.length);
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const re = new RegExp(`(?<![\\w-])(${keys.map(esc).join("|")})(?![\\w-])`, "g");
const mangledCss = minCss.replace(re, (m) => map.get(m) ?? m);
verifyRoundTrip(mangledCss, "dist/wacss.min.css", await helperOptions());
await writeFile(minPath, mangledCss, "utf8");

console.log(`dist/wacss.css ${Buffer.byteLength(prettyCss)} bytes`);
console.log(`dist/wacss.min.css ${Buffer.byteLength(mangledCss)} bytes`);
console.log(`mangled ${map.size} non-L1/L2 custom properties; excluded ${excluded.size} runtime-coupled names`);
