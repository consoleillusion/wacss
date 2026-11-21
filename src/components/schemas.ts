import { access, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { kebabCase } from "change-case";
import { load } from "load-object";

/** The folder that holds one sub-folder per component. */
const COMPONENTS_DIR = fileURLToPath(new URL(".", import.meta.url));

/**
 * A component schema as written in `<Name>/schema.dhall`, plus its derived `name`.
 * `cssProperties` and the structure fields describe styling; `arguments` is what consumers pass.
 */
export type ComponentSchema =
{ name: string
, title: string
, type: "object"
, description: string
, element?: string
, variants: string[]
, states: string[]
, cssProperties: string[]
, structure?: Record<string, Record<string, string>>
, pseudoElements?: Record<string, string[]>
, pseudoStructure?: Record<string, Record<string, Record<string, string>>>
, channels?: Record<string, string[]>
, types?: Record<string, string>
, arguments: Record<string, unknown>
, required?: string[]
};

/** Lists the folder names of every component that has a `schema.dhall`. */
export async function listComponentNames(): Promise<string[]> {
  // Purpose: Find every component folder that owns a schema.dhall, sorted by name.
  const entries = await readdir(COMPONENTS_DIR, { withFileTypes: true });
  const names: string[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    try {
      await access(`${COMPONENTS_DIR}${entry.name}/schema.dhall`);
      names.push(entry.name);
    } catch {
      // A folder without a schema is not a component.
    }
  }
  return names.sort();
}

/** Loads one component's schema.dhall through load-object. */
export async function loadSchema(folder: string): Promise<ComponentSchema> {
  // Purpose: Load and evaluate <folder>/schema.dhall and add the kebab-case token name.
  const raw = (await load(`${folder}/schema.dhall`, {
    base: COMPONENTS_DIR,
    formats: ["dhall"],
  })) as Omit<ComponentSchema, "name">;
  if (raw.title !== folder) {
    throw new Error(`${folder}/schema.dhall: title "${raw.title}" must match the folder name`);
  }
  return { name: kebabCase(raw.title), ...raw };
}

/** Loads every component schema, keyed by component title. */
export async function loadSchemas(): Promise<Record<string, ComponentSchema>> {
  // Purpose: Load all component schemas concurrently and return them keyed by title.
  const names = await listComponentNames();
  const schemas = await Promise.all(names.map(loadSchema));
  return Object.fromEntries(schemas.map((schema) => [schema.title, schema]));
}
