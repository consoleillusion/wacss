/**
 * Build-time token collection: parses the five token layers from the SCSS sources
 * and returns them grouped as TokenLayer[] (as consumed by the NodeLinkDiagram component).
 *
 * The chain is strict: L1 → L2 → L3 → L4 → L5. Layer 3 is split across a
 * hand-authored file (`_component.scss`) and generated source aliases
 * (`_component-source.scss`); both belong to L3 for the graph.
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

const FILES: Array<[string, string[]]> =
[ ["L1 · Primitive", ["src/styles/tokens/_primitives.scss"]]
, ["L2 · Semantic", ["src/styles/tokens/_semantic.scss"]]
, [ "L3 · Component"
  , ["src/styles/tokens/_component.scss", "src/styles/tokens/_component-source.scss"]
  ]
, ["L4 · Role", ["src/styles/tokens/_role.scss"]]
, ["L5 · State", ["src/styles/tokens/_state.scss"]]
];

/** First hyphen-segment is the token family (button, space, color…). */
const familyOf = (name: string): string => {
  const m = /^--([a-z][a-z0-9]*)-/.exec(name);
  if (m) return m[1];
  const word = /^--(.+)$/.exec(name);
  return word?.[1] ?? "other";
};

/** A `var(--token)` reference; interpolation (`#{…}`) is not a token name. */
const isTokenRef = (name: string): boolean => !name.includes("#") && !name.endsWith("-");

const tokensOf = (files: string[]): TokenNode[] => {
  const seen = new Set<string>();
  const out: TokenNode[] = [];
  for (const file of files) {
    const source = readFileSync(join(process.cwd(), file), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
    for (const m of source.matchAll(/^\s*(--[\w-]+)\s*:\s*(.+?);\s*$/gm)) {
      const name = m[1];
      // First declaration wins: later declarations are theme/attribute overrides.
      if (seen.has(name)) continue;
      seen.add(name);
      const value = m[2].trim();
      const refs = [...value.matchAll(/var\(\s*(--[\w-]+)/g)]
        .map((r) => r[1])
        .filter(isTokenRef);
      out.push({ name, value, refs, family: familyOf(name) });
    }
  }
  return out;
};

export const collectTokenLayers = (): TokenLayer[] =>
  FILES.map(([layer, files]) => {
    const familyMap = new Map<string, TokenNode[]>();
    for (const token of tokensOf(files)) {
      const list = familyMap.get(token.family) ?? [];
      list.push(token);
      familyMap.set(token.family, list);
    }
    const families = [...familyMap.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([family, list]) => ({ family, tokens: list }));
    return { layer, families };
  });
