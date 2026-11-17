/**
 * Build-time token collection: reads the generated token graph (dist/tokens.json)
 * and returns it grouped as TokenLayer[] for the NodeLinkDiagram component.
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

interface GraphToken extends TokenNode { level: string; component?: string; }

const LAYERS =
  [ ["L1 · Primitive", "L1"]
  , ["L2 · Semantic", "L2"]
  , ["L3 · Component", "L3"]
  , ["L4 · Variant", "L4"]
  , ["L5 · State", "L5"]
  ] as const;

export const collectTokenLayers = (): TokenLayer[] => {
  const file = join(process.cwd(), "dist/tokens.json");
  const graph = JSON.parse(readFileSync(file, "utf8")) as Record<string, GraphToken[]>;
  return LAYERS.map(([layer, level]) => {
    const familyMap = new Map<string, TokenNode[]>();
    for (const token of graph[level] ?? []) {
      const { name, value, refs, family } = token;
      const list = familyMap.get(family) ?? [];
      list.push({ name, value, refs, family });
      familyMap.set(family, list);
    }
    return {
      layer,
      families: [...familyMap.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([family, tokens]) => ({ family, tokens })),
    };
  });
};
