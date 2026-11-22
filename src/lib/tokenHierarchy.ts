import { load } from "load-object";
import { readdir } from "node:fs/promises";
import path from "node:path";

export type RawSchema = Record<string, any>;

export type NormalizedSchema = {
  title: string;
  element?: string;
  name: string;
  variants: string[];
  states: string[];
  themeableProperties: string[];
  structuralProperties: Record<string, Record<string, string>>;
  channels: Record<string, string[]>;
};

export type TokenNode = {
  id: string;
  label: string;
  kind: "component" | "property" | "variant" | "state";
  token?: string;
  cssVar?: string;
  children?: TokenNode[];
};

export function normalizeSchema(raw: RawSchema): NormalizedSchema {
  const src = raw.themeableProperties || raw.cssProperties || raw.variants ? raw : raw.properties ?? raw;
  const title = raw.title ?? src.title ?? "Component";
  const name = (raw.name ?? src.name ?? title).toLowerCase();
  return {
    title, element: raw.element ?? src.element, name,
    variants: src.variants ?? [], states: src.states ?? [],
    themeableProperties: src.themeableProperties ?? src.cssProperties ?? [],
    structuralProperties: src.structuralProperties ?? src.structure ?? {},
    channels: src.channels ?? {},
  };
}

export async function loadComponentSchema(schemaPath: string): Promise<NormalizedSchema> {
  return normalizeSchema((await load(schemaPath)) as RawSchema);
}

export async function listComponentSchemas(componentsDir = path.resolve("src/components")): Promise<{ name: string; path: string }[]> {
  const entries = await readdir(componentsDir, { withFileTypes: true });
  const result: { name: string; path: string }[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const schemaPath = path.join(componentsDir, entry.name, "schema.dhall");
    try { await (await import("node:fs/promises")).access(schemaPath); result.push({ name: entry.name, path: schemaPath }); } catch {}
  }
  return result.sort((a, b) => a.name.localeCompare(b.name));
}

export function buildTokenHierarchy(schema: NormalizedSchema): TokenNode {
  const component = schema.name;
  return {
    id: component, label: schema.title, kind: "component", token: `--${component}`,
    children: schema.themeableProperties.map((prop) => ({
      id: `${component}-${prop}`, label: prop, kind: "property", token: `--${component}-${prop}`,
      children: schema.variants.map((variant) => ({
        id: `${component}-${prop}-${variant}`, label: variant, kind: "variant", token: `--${component}-${prop}-${variant}`,
        children: schema.states.map((state) => {
          const token = `--${component}-${prop}-${variant}-${state}`;
          return { id: token, label: state, kind: "state", token, cssVar: token };
        }),
      })),
    })),
  };
}

export async function loadTokenHierarchies(componentsDir?: string): Promise<Record<string, TokenNode>> {
  const schemas = await listComponentSchemas(componentsDir);
  const out: Record<string, TokenNode> = {};
  for (const s of schemas) {
    const schema = await loadComponentSchema(s.path);
    if (!schema.themeableProperties.length || !schema.variants.length || !schema.states.length) continue;
    out[schema.title] = buildTokenHierarchy(schema);
  }
  return out;
}
