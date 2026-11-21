import { describe, expect, test } from "bun:test";
import { readFile } from "node:fs/promises";
import { listComponentNames, loadSchemas } from "./schemas";

// The full component set from design/components-and-api.typ.
const COMPONENT_LIST =
[ "Accordion", "Alert", "AspectRatio", "Audio", "Avatar", "Button", "Card", "Checkbox"
, "ColorInput", "ColorPicker", "DataTable", "DatePicker", "Field", "Form", "Image", "Input"
, "Label", "Meter", "Nav", "NavigationMenu", "NodeLinkDiagram", "Pagination", "PertChart"
, "Popover", "Progress", "RadioGroup", "Select", "Slider", "Switch", "Table", "Tabs"
, "Textarea", "Toggle", "Tooltip", "Video", "Webpage", "Grid"
];

describe("component schemas", () => {
  test("every component in the full set has a schema.dhall", async () => {
    // Purpose: Check the schema folders match the documented component list exactly.
    expect(await listComponentNames()).toEqual([...COMPONENT_LIST].sort());
  });

  test("every schema loads and is well formed", async () => {
    // Purpose: Load all schemas and check the fields the generator relies on.
    const schemas = await loadSchemas();
    for (const name of COMPONENT_LIST) {
      const schema = schemas[name];
      expect(schema, name).toBeDefined();
      expect(schema!.type, name).toBe("object");
      expect(schema!.description.length, name).toBeGreaterThan(0);
      expect(schema!.variants, name).toContain("secondary");
      expect(schema!.states, name).toContain("static");
      expect(Array.isArray(schema!.cssProperties), name).toBe(true);
      expect(typeof schema!.arguments, name).toBe("object");
    }
  });

  test("a variant argument only offers the variants the component lists", async () => {
    // Purpose: Keep a component's variant prop in step with its variants list.
    const schemas = await loadSchemas();
    for (const schema of Object.values(schemas)) {
      const variant = schema.arguments["variant"] as { enum?: string[] } | undefined;
      if (variant?.enum) expect(variant.enum, schema.title).toEqual(schema.variants);
    }
  });
});

describe("Card", () => {
  test("imports no component except Button", async () => {
    // Purpose: Guard that Card resolves figure components dynamically instead of importing them.
    for (const file of ["Card/Card.svelte", "Card/Card.astro"]) {
      const source = await readFile(new URL(`./${file}`, import.meta.url), "utf8");
      const staticImports = [...source.matchAll(/^\s*import\s[^;]*?from\s+["']\.\.\/(\w+)\//gm)];
      expect(staticImports.map((match) => match[1]), file).toEqual(["Button"]);
    }
  });
});
