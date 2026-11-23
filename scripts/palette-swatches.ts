// Resolves the colours of every palette in both modes, as the browser
// renders them, and writes two files for the book's Palettes chapter:
// design/palettes.json, each colour as the opaque hex it is drawn with, and
// design/palettes-exact.json, each colour as the browser computes it before any
// rounding to 8 bits, from which the chapter prints the colour's oklch value.
// Needs dist/wacss.css (bun run generate:tokens) and a local Chrome or Chromium
// (set CHROME to its path if it is not found).
import { readFile, writeFile } from "node:fs/promises";
import { chromium } from "playwright-core";

const ROOT = new URL("..", import.meta.url).pathname;
const PALETTES = ["kinari", "matcha", "aizome", "shu"];
const MODES = ["light", "dark"];
const TOKENS =
  [ "palette-base", "palette-surface", "palette-accent", "palette-pop"
  , "color-text", "color-text-muted", "color-border", "color-on-accent"
  , "background-positive", "background-warning", "background-danger", "background-informational", "color-danger"
  ];

const main = async () => {
  // Purpose: render each palette and mode in Chrome and record its colours as opaque hex
  const css = await readFile(`${ROOT}dist/wacss.css`, "utf8");
  const browser = await chromium.launch({ executablePath: process.env.CHROME ?? "/usr/bin/google-chrome" });
  const page = await browser.newPage();
  await page.setContent(`<!doctype html><html><head><style>${css}</style></head><body></body></html>`);
  const out: Record<string, Record<string, Record<string, string>>> = {};
  const exact: Record<string, Record<string, Record<string, string>>> = {};
  for (const palette of PALETTES) {
    out[palette] = {};
    exact[palette] = {};
    for (const mode of MODES) {
      const [drawn, computed] = await page.evaluate(({ palette, mode, tokens }) => {
        // Purpose: resolve every token to an opaque colour, composited over the page base
        document.documentElement.dataset.palette = palette;
        document.documentElement.dataset.mode = mode;
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = 1;
        const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
        const probe = document.createElement("div");
        document.body.append(probe);
        const resolve = (token: string) => {
          // Purpose: the computed colour of one token, as the browser serialises it
          probe.style.backgroundColor = `var(--${token})`;
          return getComputedStyle(probe).backgroundColor;
        };
        const base = resolve("palette-base");
        const hex = (token: string) => {
          // Purpose: paint the base, then the token over it, and read the pixel back
          ctx.clearRect(0, 0, 1, 1);
          ctx.fillStyle = base; ctx.fillRect(0, 0, 1, 1);
          ctx.fillStyle = resolve(token); ctx.fillRect(0, 0, 1, 1);
          const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
          return "#" + [r, g, b].map((n) => n!.toString(16).padStart(2, "0")).join("");
        };
        const result = Object.fromEntries(tokens.map((t) => [t, hex(t)]));
        const values = Object.fromEntries(tokens.map((t) => [t, resolve(t)]));
        probe.remove();
        return [result, values];
      }, { palette, mode, tokens: TOKENS });
      out[palette]![mode] = drawn;
      exact[palette]![mode] = computed;
    }
  }
  await browser.close();
  await writeFile(`${ROOT}design/palettes.json`, JSON.stringify(out, null, 2) + "\n");
  await writeFile(`${ROOT}design/palettes-exact.json`, JSON.stringify(exact, null, 2) + "\n");
  console.log("design/palettes.json and design/palettes-exact.json written");
};

await main();
