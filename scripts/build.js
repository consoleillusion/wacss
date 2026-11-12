import * as sass from "sass";
import { transform } from "lightningcss";
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const input = path.join(root, "src/styles/wacss.scss");
const outDir = path.join(root, "dist");
const cssPath = path.join(outDir, "wacss.css");
const minPath = path.join(outDir, "wacss.min.css");

function shortName(i) {
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
}

function mangleVars(css) {
  const names = new Set();
  for (const m of css.matchAll(/--([a-zA-Z0-9_-]+)/g)) names.add(m[1]);
  const sorted = [...names].sort();
  const map = new Map(sorted.map((n, i) => [n, shortName(i)]));
  return css.replace(/--([a-zA-Z0-9_-]+)/g, (_, n) => `--${map.get(n) ?? n}`);
}

await mkdir(outDir, { recursive: true });
for (const name of await readdir(outDir)) {
  await rm(path.join(outDir, name), { recursive: true, force: true });
}

const compiled = sass.compile(input, {
  style: "expanded",
  loadPaths: [path.join(root, "src/styles")],
  sourceMap: false,
});

const prettyCss = mangleVars(compiled.css);
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

await writeFile(minPath, minified.code);

console.log(`dist/wacss.css ${Buffer.byteLength(prettyCss)} bytes`);
console.log(`dist/wacss.min.css ${minified.code.byteLength} bytes`);
