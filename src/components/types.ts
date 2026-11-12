import type { Snippet } from "svelte";

/** Shared persistence contract for value-like component state. */
export type WacssPersistProps = {
  /**
   * localStorage key. Defaults to `wacss:<component>`.
   * Set this when you have more than one instance of the same component.
   */
  storageKey?: string;
  /** Persist value-like state to localStorage. Defaults to `true`. */
  persist?: boolean;
};

/* Button ------------------------------------------------------------------ */

export type ButtonVariant =
  | "default"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "link";

export type ButtonSize = "sm" | "md" | "lg" | "icon";

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  href?: string;
  type?: "button" | "submit" | "reset";
  class?: string;
  children?: Snippet;
  [key: string]: unknown;
};

/* Card -------------------------------------------------------------------- */

export type CardTag = "article" | "section" | "div";

export type CardProps = {
  as?: CardTag;
  title?: string;
  description?: string;
  footer?: string;
  class?: string;
  children?: Snippet;
  header?: Snippet;
  footerSnippet?: Snippet;
  [key: string]: unknown;
};

/* Accordion --------------------------------------------------------------- */

export type AccordionItem = {
  value: string;
  title: string;
  content?: string;
  disabled?: boolean;
};

export type AccordionProps = WacssPersistProps & {
  items?: AccordionItem[];
  type?: "single" | "multiple";
  value?: string | string[];
  disabled?: boolean;
  loop?: boolean;
  orientation?: "horizontal" | "vertical";
  class?: string;
  children?: Snippet<[{ item: AccordionItem; index: number }]>;
  [key: string]: unknown;
};

/* Input ------------------------------------------------------------------- */

export type InputProps = WacssPersistProps & {
  value?: string;
  type?: string;
  placeholder?: string;
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  id?: string;
  name?: string;
  class?: string;
  inputClass?: string;
  [key: string]: unknown;
};

/* Label ------------------------------------------------------------------- */

export type LabelProps = {
  for?: string;
  text?: string;
  required?: boolean;
  class?: string;
  children?: Snippet;
  [key: string]: unknown;
};

/* Checkbox ---------------------------------------------------------------- */

export type CheckboxProps = WacssPersistProps & {
  checked?: boolean;
  indeterminate?: boolean;
  label?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  name?: string;
  value?: string;
  id?: string;
  class?: string;
  [key: string]: unknown;
};

/* Switch ------------------------------------------------------------------ */

export type SwitchProps = WacssPersistProps & {
  checked?: boolean;
  label?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  id?: string;
  class?: string;
  [key: string]: unknown;
};

/* Select ------------------------------------------------------------------ */

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectProps = WacssPersistProps & {
  options?: SelectOption[];
  type?: "single" | "multiple";
  value?: string | string[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  class?: string;
  contentClass?: string;
  /** Extra attributes for the trigger button (id, aria-*, data-*). */
  triggerProps?: Record<string, string | number | boolean | undefined>;
  [key: string]: unknown;
};

/* Dialog ------------------------------------------------------------------ */

export type DialogProps = {
  open?: boolean;
  title?: string;
  description?: string;
  triggerLabel?: string;
  closeLabel?: string;
  class?: string;
  children?: Snippet;
  footer?: Snippet;
  trigger?: Snippet;
  [key: string]: unknown;
};

/* Tabs -------------------------------------------------------------------- */

export type TabsItem = {
  value: string;
  label: string;
  content?: string;
  disabled?: boolean;
};

export type TabsProps = WacssPersistProps & {
  tabs?: TabsItem[];
  value?: string;
  orientation?: "horizontal" | "vertical";
  activationMode?: "manual" | "automatic";
  loop?: boolean;
  disabled?: boolean;
  class?: string;
  listClass?: string;
  contentClass?: string;
  children?: Snippet<[{ tab: TabsItem; index: number }]>;
  [key: string]: unknown;
};

/* Form -------------------------------------------------------------------- */

/**
 * A pragmatic subset of JSON Schema. Extra keywords are preserved so callers can
 * pass a full JSON Schema document without fighting the type.
 */
export type JsonSchema = {
  $id?: string;
  $ref?: string;
  $defs?: Record<string, JsonSchema>;
  type?: string | string[];
  title?: string;
  description?: string;
  default?: unknown;
  enum?: unknown[];
  const?: unknown;
  format?: string;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: number;
  exclusiveMaximum?: number;
  multipleOf?: number;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  required?: string[];
  properties?: Record<string, JsonSchema>;
  additionalProperties?: boolean | JsonSchema;
  items?: JsonSchema | JsonSchema[];
  oneOf?: JsonSchema[];
  anyOf?: JsonSchema[];
  allOf?: JsonSchema[];
  readOnly?: boolean;
  writeOnly?: boolean;
  examples?: unknown[];
  [key: string]: unknown;
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
