import type { FormUiField, FormUiSchema, FormWidget, JsonSchema } from "../types";

/* Schema resolution ------------------------------------------------------- */

function resolveRef(ref: string, root: JsonSchema): JsonSchema | undefined {
  if (!ref.startsWith("#/")) return undefined;
  const parts = ref
    .slice(2)
    .split("/")
    .map((part) => part.replace(/~1/g, "/").replace(/~0/g, "~"));

  let current: unknown = root;
  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return current as JsonSchema;
}

function mergeSchemas(a: JsonSchema, b: JsonSchema): JsonSchema {
  return {
    ...a,
    ...b,
    properties: { ...a.properties, ...b.properties },
    required: [...new Set([...(a.required ?? []), ...(b.required ?? [])])],
  };
}

export function resolveSchema(schema: JsonSchema, root: JsonSchema = schema): JsonSchema {
  if (schema.$ref) {
    const resolved = resolveRef(schema.$ref, root);
    if (resolved) return resolveSchema(resolved, root);
  }

  if (schema.allOf?.length) {
    const base: JsonSchema = { ...schema };
    delete base.allOf;
    return schema.allOf.reduce<JsonSchema>(
      (acc, part) => mergeSchemas(acc, resolveSchema(part, root)),
      base,
    );
  }

  return schema;
}

export function schemaTypes(schema: JsonSchema): string[] {
  if (Array.isArray(schema.type)) return schema.type;
  if (typeof schema.type === "string") return [schema.type];
  if (schema.properties || schema.additionalProperties) return ["object"];
  if (schema.items) return ["array"];
  if (schema.enum) {
    return [
      ...new Set(
        schema.enum.map((value) => {
          if (value === null) return "null";
          if (typeof value === "number") return "number";
          if (typeof value === "boolean") return "boolean";
          return "string";
        }),
      ),
    ];
  }
  return [];
}

export function nonNullTypes(schema: JsonSchema): string[] {
  return schemaTypes(schema).filter((type) => type !== "null");
}

function labelForValue(value: unknown): string {
  if (typeof value === "string") return humanize(value);
  if (typeof value === "boolean") return value ? "True" : "False";
  if (value === null) return "None";
  return String(value);
}

/* Enumerations ------------------------------------------------------------ */

export type EnumEntry = { raw: unknown; label: string; value: string };

export function enumEntries(schema: JsonSchema, root: JsonSchema = schema): EnumEntry[] {
  const resolved = resolveSchema(schema, root);

  if (resolved.enum) {
    const names = (resolved.enumNames ?? resolved["x-enumNames"]) as string[] | undefined;
    return resolved.enum.map((raw, index) => ({
      raw,
      label: names?.[index] ?? labelForValue(raw),
      value: String(raw),
    }));
  }

  const variants = resolved.oneOf ?? resolved.anyOf;
  if (variants?.length) {
    const entries: EnumEntry[] = [];
    for (const variant of variants) {
      const item = resolveSchema(variant, root);
      if (item.const !== undefined) {
        entries.push({
          raw: item.const,
          label: item.title ?? labelForValue(item.const),
          value: String(item.const),
        });
      } else if (item.enum) {
        const names = (item.enumNames ?? item["x-enumNames"]) as string[] | undefined;
        for (const [index, raw] of item.enum.entries()) {
          entries.push({
            raw,
            label: names?.[index] ?? item.title ?? labelForValue(raw),
            value: String(raw),
          });
        }
      } else {
        return [];
      }
    }
    return entries;
  }

  if (resolved.const !== undefined) {
    return [
      {
        raw: resolved.const,
        label: resolved.title ?? labelForValue(resolved.const),
        value: String(resolved.const),
      },
    ];
  }

  return [];
}

export function arrayItemSchema(schema: JsonSchema): JsonSchema | undefined {
  if (Array.isArray(schema.items)) return schema.items[0];
  return schema.items;
}

/* Widget inference -------------------------------------------------------- */

export function inferWidget(schema: JsonSchema, root: JsonSchema = schema): FormWidget {
  const resolved = resolveSchema(schema, root);
  const types = nonNullTypes(resolved);
  const entries = enumEntries(resolved, root);

  if (resolved.const !== undefined) return "hidden";
  if (entries.length > 0) return types.includes("array") ? "checkboxes" : "select";
  if (types.includes("boolean")) return "switch";

  if (types.includes("array")) {
    const item = arrayItemSchema(resolved);
    if (item) {
      const itemResolved = resolveSchema(item, root);
      if (enumEntries(itemResolved, root).length > 0) return "checkboxes";
      if (nonNullTypes(itemResolved).includes("string")) return "textarea";
    }
    return "textarea";
  }

  if (types.includes("object")) return "group";
  if (types.includes("integer") || types.includes("number")) return "number";

  if (types.includes("string")) {
    switch (resolved.format) {
      case "email":
        return "email";
      case "password":
        return "password";
      case "uri":
      case "url":
        return "url";
      case "tel":
        return "tel";
      case "date":
        return "date";
      case "time":
        return "time";
      case "date-time":
        return "datetime-local";
      case "month":
        return "month";
      case "week":
        return "week";
      case "color":
        return "color";
      default:
        break;
    }
    if ((resolved.maxLength ?? 0) > 120) return "textarea";
    return "text";
  }

  return "text";
}

export function inputTypeForWidget(widget: FormWidget): string {
  switch (widget) {
    case "email":
    case "password":
    case "url":
    case "tel":
    case "search":
    case "number":
    case "date":
    case "time":
    case "datetime-local":
    case "month":
    case "week":
    case "color":
    case "range":
    case "textarea":
      return widget;
    default:
      return "text";
  }
}

/* Values ------------------------------------------------------------------ */

export function defaultsFromSchema(schema: JsonSchema, root: JsonSchema = schema): unknown {
  const resolved = resolveSchema(schema, root);

  if (resolved.default !== undefined) return clone(resolved.default);
  if (resolved.const !== undefined) return resolved.const;

  const types = nonNullTypes(resolved);

  if (types.includes("object") || resolved.properties) {
    const value: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(resolved.properties ?? {})) {
      value[key] = defaultsFromSchema(child, root);
    }
    return value;
  }

  if (types.includes("array")) return [];
  if (types.includes("boolean")) return false;
  if (types.includes("number") || types.includes("integer")) return undefined;
  if (types.includes("string")) return "";
  return "";
}

export function mergeValues(defaults: unknown, values: unknown): unknown {
  if (values === undefined) return defaults;
  if (Array.isArray(defaults) || Array.isArray(values)) return values;
  if (isPlainObject(defaults) && isPlainObject(values)) {
    const merged: Record<string, unknown> = { ...defaults };
    for (const [key, value] of Object.entries(values)) {
      merged[key] = key in defaults ? mergeValues(defaults[key], value) : value;
    }
    return merged;
  }
  return values;
}

export function getPath(value: unknown, path: string[]): unknown {
  let current = value;
  for (const key of path) {
    if (current && typeof current === "object") {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }
  return current;
}

export function setPath(value: unknown, path: string[], next: unknown): Record<string, unknown> {
  if (path.length === 0) return next as Record<string, unknown>;

  const [head, ...rest] = path;
  const source = isPlainObject(value) ? value : {};
  return {
    ...source,
    [head!]: setPath(source[head!], rest, next),
  };
}

export function coerceScalar(schema: JsonSchema, raw: string, root: JsonSchema = schema): unknown {
  const resolved = resolveSchema(schema, root);
  const types = nonNullTypes(resolved);

  if (types.includes("integer") || types.includes("number")) {
    if (raw === "") return undefined;
    const number = Number(raw);
    return Number.isNaN(number) ? undefined : number;
  }

  if (types.includes("boolean")) return raw === "true" || raw === "on";

  return raw;
}

export function toggleArrayValue(value: unknown, item: unknown, checked: boolean): unknown[] {
  const current = Array.isArray(value) ? value : [];
  const exists = current.some((entry) => Object.is(entry, item));
  if (checked && !exists) return [...current, item];
  if (!checked && exists) return current.filter((entry) => !Object.is(entry, item));
  return current;
}

export function includesValue(value: unknown, item: unknown): boolean {
  return Array.isArray(value) && value.some((entry) => Object.is(entry, item));
}

/* Presentation ------------------------------------------------------------ */

export function humanize(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function getUi(uiSchema: FormUiSchema | undefined, path: string[]): FormUiField | undefined {
  if (!uiSchema) return undefined;
  const entry = uiSchema[path.join(".")] ?? uiSchema["*"];
  if (!entry) return undefined;
  return typeof entry === "string" ? { widget: entry } : entry;
}

export function orderedProperties(
  schema: JsonSchema,
  uiSchema: FormUiSchema | undefined,
  path: string[],
): [string, JsonSchema][] {
  const entries = Object.entries(schema.properties ?? {});
  return entries.sort(([a], [b]) => {
    const orderA = getUi(uiSchema, [...path, a])?.order ?? Number.MAX_SAFE_INTEGER;
    const orderB = getUi(uiSchema, [...path, b])?.order ?? Number.MAX_SAFE_INTEGER;
    return orderA - orderB;
  });
}

export function isRequired(schema: JsonSchema, key: string): boolean {
  return Boolean(schema.required?.includes(key));
}

export function formatName(path: string[], format: "dot" | "bracket" = "dot"): string {
  if (format === "bracket") {
    return path
      .map((part, index) => (index === 0 ? part : `[${part}]`))
      .join("");
  }
  return path.join(".");
}

export function fieldId(prefix: string, path: string[]): string {
  const suffix = path.length > 0 ? path.join("-") : "field";
  return `${prefix}-${suffix.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}

export function placeholderFor(schema: JsonSchema, ui: FormUiField | undefined): string | undefined {
  if (ui?.placeholder) return ui.placeholder;
  const example = schema.examples?.[0];
  if (typeof example === "string" || typeof example === "number") return String(example);
  return undefined;
}

export function autocompleteFor(
  schema: JsonSchema,
  ui: FormUiField | undefined,
): string | undefined {
  if (ui?.autocomplete) return ui.autocomplete;
  switch (schema.format) {
    case "email":
      return "email";
    case "password":
      return "current-password";
    case "tel":
      return "tel";
    case "url":
    case "uri":
      return "url";
    default:
      return undefined;
  }
}

export function labelFor(schema: JsonSchema, path: string[], ui: FormUiField | undefined): string {
  return ui?.label ?? schema.title ?? humanize(path.at(-1) ?? "Field");
}

export function helpFor(schema: JsonSchema, ui: FormUiField | undefined): string | undefined {
  return ui?.help ?? schema.description;
}

/* Internal ---------------------------------------------------------------- */

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function clone<T>(value: T): T {
  if (value === null || typeof value !== "object") return value;
  return JSON.parse(JSON.stringify(value)) as T;
}
