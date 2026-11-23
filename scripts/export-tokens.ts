// Exports every design token in the Design Tokens Community Group format, 2025.10
// (https://www.designtokens.org/tr/2025.10/), into dist/dtcg/:
//
//   wacss.tokens.json            every token, as it resolves in the default palette and mode
//   <palette>-<mode>.tokens.json the tokens whose value differs in that palette and mode
//   wacss.resolver.json          a resolver with one modifier, "palette-mode", choosing among them
//
// A token whose CSS value is a single reference, var(--x), is exported as an alias, {group.x}.
// Any other value is exported resolved, as the browser computes it, with its CSS expression kept
// under $extensions["org.wacss"].css, since the format has no calculations. Values the format has
// no type for (percentages, transforms, filters, keywords) are listed, with their CSS, under the
// root $extensions["org.wacss"].unsupported.
//
// Run after `bun run generate:tokens`.
import { chromium } from "playwright-core";
import { mkdir, readFile, writeFile } from "node:fs/promises";

const ROOT = new URL("../", import.meta.url).pathname;
const DIST = `${ROOT}dist/`;
const OUT = `${DIST}dtcg/`;
const PALETTES = ["kinari", "matcha", "aizome", "shu"];
const MODES = ["dark", "light"];
const DEFAULT = "kinari-dark";

type Token = { name: string; level: number; group: string; value: string; refs: string[] };
type Resolved = { type: string; value: unknown } | undefined;

const blockOf = (css: string, selector: string): Record<string, string> => {
  // Purpose: the custom properties declared in the first rule with this exact selector
  const start = css.indexOf(`${selector} {`);
  if (start < 0) return {};
  const body = css.slice(css.indexOf("{", start) + 1, css.indexOf("}", start));
  return Object.fromEntries([...body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1]!, m[2]!.trim()]));
};

const rawFor = (tokens: Token[], css: string, palette: string, mode: string) => {
  // Purpose: each token's CSS value in one palette and mode: the defaults, then the palette's
  // block, then the light mode's block when the mode is light
  const raw = Object.fromEntries(tokens.map((t) => [t.name, t.value]));
  Object.assign(raw, blockOf(css, `:root[data-palette=${palette}]`));
  if (mode === "light") Object.assign(raw, blockOf(css, ":root[data-mode=light]"));
  return raw;
};

const resolveAll = async (page: any, names: string[], palette: string, mode: string) =>
  // Purpose: the type and resolved value of every token in one palette and mode, computed by the browser
  page.evaluate(({ names, palette, mode }: { names: string[]; palette: string; mode: string }) => {
    const root = document.documentElement;
    root.dataset.palette = palette;
    root.dataset.mode = mode;
    const probe = document.getElementById("probe")!;
    const read = (property: string, value: string) => {
      // Purpose: the computed value of a typed probe property set to a value
      probe.style.setProperty(property, value);
      const out = getComputedStyle(probe).getPropertyValue(property).trim();
      probe.style.removeProperty(property);
      return out;
    };
    const num = (s: string) => Math.round(parseFloat(s) * 10000) / 10000;
    const out: Record<string, { type: string; value: unknown } | null> = {};
    for (const name of names) {
      const ref = `var(${name})`;
      const colour = read("--probe-color", `oklch(from ${ref} l c h / alpha)`);
      if (colour !== "rgb(1, 2, 3)") {
        const m = colour.match(/oklch\(([-\d.e]+)\s+([-\d.e]+)\s+([-\d.e]+|none)(?:\s*\/\s*([-\d.e]+))?\)/);
        if (m) {
          out[name] = { type: "color", value: { colorSpace: "oklch", components: [num(m[1]!), num(m[2]!), m[3] === "none" ? 0 : num(m[3]!)], alpha: m[4] ? num(m[4]) : 1 } };
          continue;
        }
      }
      const length = read("--probe-length", ref);
      if (length !== "-12345px") { out[name] = { type: "dimension", value: { value: num(length), unit: "px" } }; continue; }
      const time = read("--probe-time", ref);
      if (time !== "-12345s") { out[name] = { type: "duration", value: { value: Math.round(num(time) * 1000 * 1000) / 1000, unit: "ms" } }; continue; }
      const number = read("--probe-number", ref);
      if (number !== "-12345") {
        out[name] = { type: name.includes("font-weight") ? "fontWeight" : "number", value: num(number) };
        continue;
      }
      probe.style.transitionTimingFunction = ref;
      const easing = getComputedStyle(probe).transitionTimingFunction;
      probe.style.transitionTimingFunction = "";
      const bezier = easing.match(/^cubic-bezier\(([^)]+)\)$/);
      if (bezier) { out[name] = { type: "cubicBezier", value: bezier[1]!.split(",").map(num) }; continue; }
      probe.style.boxShadow = ref;
      const shadow = getComputedStyle(probe).boxShadow;
      probe.style.boxShadow = "";
      const s = shadow.match(/^(rgba?\([^)]*\)|oklch\([^)]*\))\s+([-\d.]+)px\s+([-\d.]+)px\s+([-\d.]+)px\s+([-\d.]+)px(\s+inset)?$/);
      if (s) {
        const c = read("--probe-color", `oklch(from ${s[1]} l c h / alpha)`).match(/oklch\(([-\d.e]+)\s+([-\d.e]+)\s+([-\d.e]+|none)(?:\s*\/\s*([-\d.e]+))?\)/)!;
        const px = (v: string) => ({ value: num(v), unit: "px" });
        out[name] = { type: "shadow", value: { color: { colorSpace: "oklch", components: [num(c[1]!), num(c[2]!), c[3] === "none" ? 0 : num(c[3]!)], alpha: c[4] ? num(c[4]) : 1 }, offsetX: px(s[2]!), offsetY: px(s[3]!), blur: px(s[4]!), spread: px(s[5]!), inset: !!s[6] } };
        continue;
      }
      if (/^--font-(sans|serif|mono)$|^--font-family/.test(name)) {
        probe.style.fontFamily = ref;
        const family = getComputedStyle(probe).fontFamily;
        probe.style.fontFamily = "";
        out[name] = { type: "fontFamily", value: family.split(",").map((f) => f.trim().replace(/^["']|["']$/g, "")) };
        continue;
      }
      out[name] = null;
    }
    return out;
  }, { names, palette, mode });

const main = async () => {
  // Purpose: resolve every token in every palette and mode, and write the DTCG files and resolver
  const data = JSON.parse(await readFile(`${DIST}tokens.json`, "utf8")) as { tokens: Token[] };
  const css = await readFile(`${DIST}wacss.css`, "utf8");
  const tokens = data.tokens;
  const byName = new Map(tokens.map((t) => [t.name, t]));
  const path = (name: string) =>
    // Purpose: a token's place in the DTCG tree: its group, then its name without the leading dashes
    `${byName.get(name)!.group}.${name.slice(2)}`;

  const browser = await chromium.launch({ executablePath: process.env.CHROME ?? "/usr/bin/google-chrome" });
  const page = await browser.newPage();
  await page.setContent(`<!doctype html><html><head><style>${css}</style><style>
    @property --probe-color { syntax: "<color>"; inherits: false; initial-value: rgb(1, 2, 3); }
    @property --probe-length { syntax: "<length>"; inherits: false; initial-value: -12345px; }
    @property --probe-time { syntax: "<time>"; inherits: false; initial-value: -12345s; }
    @property --probe-number { syntax: "<number>"; inherits: false; initial-value: -12345; }
    </style></head><body><div id="probe"></div></body></html>`);

  const contexts: Record<string, { raw: Record<string, string>; resolved: Record<string, Resolved> }> = {};
  for (const palette of PALETTES)
    for (const mode of MODES) {
      const raw = rawFor(tokens, css, palette, mode);
      const resolved = await resolveAll(page, tokens.map((t) => t.name), palette, mode);
      contexts[`${palette}-${mode}`] = { raw, resolved: Object.fromEntries(Object.entries(resolved).map(([k, v]) => [k, v ?? undefined])) };
    }
  await browser.close();

  const alias = (raw: string) =>
    // Purpose: the token a value is purely a reference to, or undefined
    raw.match(/^var\(\s*(--[\w-]+)\s*\)$/)?.[1];

  const entry = (name: string, ctx: string) => {
    // Purpose: one token in DTCG form for one palette and mode, or undefined if it has no DTCG type
    const { raw, resolved } = contexts[ctx]!;
    const r = resolved[name];
    if (!r) return undefined;
    const target = alias(raw[name]!);
    const t = byName.get(name)!;
    if (target && byName.has(target) && contexts[ctx]!.resolved[target])
      return { $type: r.type, $value: `{${path(target)}}`, $description: `L${t.level}` };
    return { $type: r.type, $value: r.value, $description: `L${t.level}`, $extensions: { "org.wacss": { css: raw[name] } } };
  };

  const tree = (names: string[], ctx: string) => {
    // Purpose: the DTCG document for these tokens in one palette and mode, grouped by token group
    const doc: Record<string, Record<string, unknown>> = {};
    for (const name of names) {
      const e = entry(name, ctx);
      if (!e) continue;
      const group = byName.get(name)!.group;
      (doc[group] ??= {})[name.slice(2)] = e;
    }
    return doc;
  };

  const names = tokens.map((t) => t.name);
  const unsupported = Object.fromEntries(names.filter((n) => !contexts[DEFAULT]!.resolved[n]).map((n) => [n, contexts[DEFAULT]!.raw[n]]));
  await mkdir(OUT, { recursive: true });
  await writeFile(`${OUT}wacss.tokens.json`, JSON.stringify({
    $description: "wacss design tokens, resolved in the default palette (kinari) and mode (dark).",
    ...tree(names, DEFAULT),
    $extensions: { "org.wacss": { unsupported } },
  }, null, 2) + "\n");

  const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
  for (const ctx of Object.keys(contexts)) {
    const changed = names.filter((n) => !same(entry(n, ctx), entry(n, DEFAULT)));
    await writeFile(`${OUT}${ctx}.tokens.json`, JSON.stringify(tree(changed, ctx), null, 2) + "\n");
  }

  await writeFile(`${OUT}wacss.resolver.json`, JSON.stringify({
    $schema: "https://www.designtokens.org/schemas/2025.10/resolver.json",
    name: "wacss",
    version: "2025.10",
    description: "wacss design tokens in every palette and mode.",
    sets: { tokens: { sources: [{ $ref: "wacss.tokens.json" }] } },
    modifiers: {
      "palette-mode": {
        description: "The palette and the mode, as <palette>-<mode>.",
        contexts: Object.fromEntries(Object.keys(contexts).map((ctx) => [ctx, [{ $ref: `${ctx}.tokens.json` }]])),
        default: DEFAULT,
      },
    },
    resolutionOrder: [{ $ref: "#/sets/tokens" }, { $ref: "#/modifiers/palette-mode" }],
  }, null, 2) + "\n");

  const exported = names.length - Object.keys(unsupported).length;
  console.log(`dist/dtcg written: ${exported} tokens exported, ${Object.keys(unsupported).length} without a DTCG type`);
};

await main();
