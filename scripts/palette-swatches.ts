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
// The palettes and the colour names, from palettes.dhall by way of tokens.json, and the templates
// by which a component makes its text and border from its background, from vocabulary.dhall.
const DATA = JSON.parse(await readFile(`${ROOT}dist/tokens.json`, "utf8"));
const PALETTES: string[] = DATA.colours.palettes.map((p: { name: string }) => p.name);
const COLOURS: string[] = [...DATA.colours.colours, ...DATA.colours.intent.colours].map((c: { name: string }) => c.name);
const MODES = ["light", "dark"];
// Each colour, and the text and border a component with that background makes, keyed
// text-<colour> and border-<colour>.
const DERIVED = (property: string, colour: string) =>
  DATA.vocabulary.derived[property].replace("{background}", `var(--color-${colour})`);
const VALUES: Record<string, string> = Object.fromEntries(
  COLOURS.flatMap((c) => [[`color-${c}`, `var(--color-${c})`], [`text-${c}`, DERIVED("color", c)], [`border-${c}`, DERIVED("border-color", c)]]));

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
      const [drawn, computed] = await page.evaluate(({ palette, mode, values }) => {
        // Purpose: resolve every token to an opaque colour, composited over the page base
        document.documentElement.dataset.palette = palette;
        document.documentElement.dataset.mode = mode;
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = 1;
        const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
        const probe = document.createElement("div");
        document.body.append(probe);
        const resolve = (token: string) => {
          // Purpose: the computed colour of one value, as the browser serialises it
          probe.style.backgroundColor = values[token]!;
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
        const result = Object.fromEntries(Object.keys(values).map((t) => [t, hex(t)]));
        const computed = Object.fromEntries(Object.keys(values).map((t) => [t, resolve(t)]));
        probe.remove();
        return [result, computed];
      }, { palette, mode, values: VALUES });
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
