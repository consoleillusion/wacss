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

await mkdir(outDir, { recursive: true });
for (const name of await readdir(outDir)) {
  await rm(path.join(outDir, name), { recursive: true, force: true });
}

const compiled = sass.compile(input, {
  style: "expanded",
  loadPaths: [path.join(root, "src/styles")],
  sourceMap: false,
});

await writeFile(cssPath, compiled.css, "utf8");

const minified = transform({
  filename: "wacss.css",
  code: Buffer.from(compiled.css),
  minify: true,
  sourceMap: false,
});

if (minified.warnings.length > 0) {
  for (const warning of minified.warnings) {
    console.warn(String(warning.message));
  }
}

await writeFile(minPath, minified.code);

const pretty = Buffer.byteLength(compiled.css);
const min = minified.code.byteLength;
console.log(`dist/wacss.css ${pretty} bytes`);
console.log(`dist/wacss.min.css ${min} bytes`);
