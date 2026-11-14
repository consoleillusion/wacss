import type { JSONSchema } from "json-schema-typed/draft-2020-12";
import type { Snippet } from "svelte";
import type { ButtonVariant } from "../Button/types";
import type { WacssPersistProps } from "../persist.svelte";

type JSONSchemaObject = Exclude<JSONSchema, boolean>;

/**
 * JSON Schema draft 2020-12 plus the enum-label extensions this form
 * understands. Nested schemas use this same type so traversal stays typed.
 */
export type JsonSchema = JSONSchemaObject & {
  enumNames?: string[];
  "x-enumNames"?: string[];
  $defs?: Record<string, JsonSchema>;
  properties?: Record<string, JsonSchema>;
  additionalProperties?: boolean | JsonSchema;
  items?: JsonSchema | JsonSchema[];
  oneOf?: JsonSchema[];
  anyOf?: JsonSchema[];
  allOf?: JsonSchema[];
};

export type FormWidget =
  | "auto"
  | "text"
  | "email"
  | "password"
  | "url"
  | "tel"
  | "search"
  | "number"
  | "textarea"
  | "select"
  | "checkboxes"
  | "switch"
  | "date"
  | "time"
  | "datetime-local"
  | "month"
  | "week"
  | "color"
  | "range"
  | "hidden"
  | "group";

export type FormUiField = {
  widget?: FormWidget;
  label?: string;
  help?: string;
  placeholder?: string;
  autocomplete?: string;
  order?: number;
  hidden?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  columns?: 1 | 2 | 3;
};

export type FormUiSchema = Record<string, FormWidget | FormUiField>;

export type FormProps = WacssPersistProps & {
  /** JSON Schema describing the form. */
  jsonschema?: JsonSchema;
  /** Alias for `jsonschema`. */
  schema?: JsonSchema;
  /** Controlled form values. Defaults are derived from the schema. */
  values?: Record<string, unknown>;
  /** Per-field presentation overrides keyed by dot path (e.g. "address.street"). */
  uiSchema?: FormUiSchema;
  /** Server field errors keyed by dot path. */
  errors?: Record<string, string>;
  action?: string;
  method?: "get" | "post" | "dialog";
  target?: string;
  enctype?: string;
  autocomplete?: string;
  novalidate?: boolean;
  id?: string;
  name?: string;
  /** Number of columns for the root field grid. */
  columns?: 1 | 2 | 3;
  /** How nested field names are serialized for native form submission. */
  nameFormat?: "dot" | "bracket";
  submitLabel?: string;
  submitVariant?: ButtonVariant;
  showSubmit?: boolean;
  resetLabel?: string;
  showReset?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  class?: string;
  onSubmit?: (values: Record<string, unknown>, event: SubmitEvent) => void | Promise<void>;
  onReset?: () => void;
  children?: Snippet;
  [key: string]: unknown;
};
