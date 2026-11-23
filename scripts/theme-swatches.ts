// Resolves the theme colours of every palette in both themes, as the browser
// renders them, and writes design/themes.json for the book's Themes chapter.
// Needs dist/wacss.css (bun run generate:tokens) and a local Chrome or Chromium
// (set CHROME to its path if it is not found).
import { readFile, writeFile } from "node:fs/promises";
import { chromium } from "playwright-core";

const ROOT = new URL("..", import.meta.url).pathname;
const PALETTES = ["kinari", "matcha", "ai", "shu"];
const THEMES = ["light", "dark"];
const TOKENS =
  [ "color-base", "color-surface", "color-accent", "color-pop"
  , "color-text", "color-text-muted", "color-border", "color-on-accent"
  , "tone-positive", "tone-warning", "tone-danger", "tone-informational", "tone-danger-ink"
  ];

const main = async () => {
  // Purpose: render each palette and theme in Chrome and record its colours as opaque hex
  const css = await readFile(`${ROOT}dist/wacss.css`, "utf8");
  const browser = await chromium.launch({ executablePath: process.env.CHROME ?? "/usr/bin/google-chrome" });
  const page = await browser.newPage();
  await page.setContent(`<!doctype html><html><head><style>${css}</style></head><body></body></html>`);
  const out: Record<string, Record<string, Record<string, string>>> = {};
  for (const palette of PALETTES) {
    out[palette] = {};
    for (const theme of THEMES)
      out[palette]![theme] = await page.evaluate(({ palette, theme, tokens }) => {
        // Purpose: resolve every token to an opaque colour, composited over the page base
        document.documentElement.dataset.palette = palette;
        document.documentElement.dataset.theme = theme;
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
        const base = resolve("color-base");
        const hex = (token: string) => {
          // Purpose: paint the base, then the token over it, and read the pixel back
          ctx.clearRect(0, 0, 1, 1);
          ctx.fillStyle = base; ctx.fillRect(0, 0, 1, 1);
          ctx.fillStyle = resolve(token); ctx.fillRect(0, 0, 1, 1);
          const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
          return "#" + [r, g, b].map((n) => n!.toString(16).padStart(2, "0")).join("");
        };
        const result = Object.fromEntries(tokens.map((t) => [t, hex(t)]));
        probe.remove();
        return result;
      }, { palette, theme, tokens: TOKENS });
  }
  await browser.close();
  await writeFile(`${ROOT}design/themes.json`, JSON.stringify(out, null, 2) + "\n");
  console.log("design/themes.json written");
};

await main();
