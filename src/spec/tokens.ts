/**
 * Build-time token collection: parses the five token layers from the SCSS sources
 * and returns them grouped as TokenLayer[] (as consumed by the TokenGraph component).
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

export interface TokenNode {
  name: string;
  value: string;
  refs: string[];
  family: string;
}
export interface TokenFamily { family: string; tokens: TokenNode[]; }
export interface TokenLayer { layer: string; families: TokenFamily[]; }

const FILES: Array<[string, string]> = [
  ["L1 · Primitive", "src/styles/tokens/_primitives.scss"],
  ["L2 · Semantic", "src/styles/tokens/_semantic.scss"],
  ["L3 · Component", "src/styles/tokens/_component.scss"],
  ["L4 · Role", "src/styles/tokens/_role.scss"],
  ["L5 · State", "src/styles/tokens/_state.scss"],
];

/** First hyphen-segment is the token family (button, space, color…). */
const familyOf = (name: string): string => {
  const m = /^--([a-z][a-z0-9]*)-/.exec(name);
  if (m) return m[1];
  const word = /^--(.+)$/.exec(name);
  return word?.[1] ?? "other";
};

const tokensOf = (file: string): TokenNode[] => {
  const source = readFileSync(join(process.cwd(), file), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  const out: TokenNode[] = [];
  for (const m of source.matchAll(/^\s*(--[\w-]+)\s*:\s*(.+?);\s*$/gm)) {
    const name = m[1];
    const value = m[2].trim();
    const refs = [...value.matchAll(/var\(\s*(--[\w-]+)/g)].map((r) => r[1]);
    out.push({ name, value, refs, family: familyOf(name) });
  }
  return out;
};

/** Palette hues are generated via @each from $colors — register them as synthetic L1 nodes. */
const paletteTokens = (): TokenNode[] => {
  const raw = readFileSync(join(process.cwd(), "src/styles/tokens/_primitives.scss"), "utf8");
  const map = /\$colors:\s*\(([\s\S]*?)\)/.exec(raw);
  if (!map) return [];
  const names = [...map[1].matchAll(/"([a-z]+)"\s*:/g)].map((m) => m[1]);
  return names.flatMap((name) => [
    { name: `--color-dark-${name}`, value: "(from $colors)", refs: [], family: "colors" },
    { name: `--color-light-${name}`, value: "(from $colors)", refs: [], family: "colors" },
  ]);
};

export const collectTokenLayers = (): TokenLayer[] =>
  FILES.map(([layer, file]) => {
    const tokens = tokensOf(file);
    const withPalette = layer.startsWith("L1") ? [...tokens, ...paletteTokens()] : tokens;
    const familyMap = new Map<string, TokenNode[]>();
    for (const token of withPalette) {
      const list = familyMap.get(token.family) ?? [];
      list.push(token);
      familyMap.set(token.family, list);
    }
    const families = [...familyMap.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([family, list]) => ({ family, tokens: list }));
    return { layer, families };
  });
