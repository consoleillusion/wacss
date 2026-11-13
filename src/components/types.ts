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
  | "primary"
  | "secondary"
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

export type CardMediaType = "image" | "video" | "audio";

export type CardMedia = {
  type: CardMediaType;
  src?: string;
  sources?: { src: string; type?: string }[];
  alt?: string;
  poster?: string;
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsinline?: boolean;
  preload?: "none" | "metadata" | "auto";
  [key: string]: unknown;
};

export type CardContent =
  | string
  | {
      component: string;
      data?: Record<string, unknown>;
    }
  | {
      text?: string;
      html?: string;
    };

export type CardFigure =
  | CardMedia
  | ({ component?: string; schema?: { title?: string; [k: string]: unknown }; data?: Record<string, unknown> } & Record<string, unknown>)
  | Record<string, unknown>;

export type CardProps = {
  as?: CardTag;
  /** Card header text. */
  header?: string | Snippet;
  /** Legacy alias for header text. */
  title?: string;
  /** Body text/description below the figure. */
  text?: string;
  /** Legacy alias for body text. */
  description?: string;
  footer?: string;
  /** Figure content: media (image/video/audio) or component data/schema (identified by title). */
  figure?: CardFigure;
  /** Data-driven media (image, video, audio). Legacy alias for figure. */
  media?: CardMedia;
  /** Data-driven body content. */
  content?: CardContent;
  /** Render a registered component by name with data. */
  component?: string;
  /** Data passed to the named component. */
  data?: Record<string, unknown>;
  /** Card aspect ratio. Defaults to portrait (3:4). */
  orientation?: "portrait" | "square" | "landscape";
  /** Back-compat: composed children snippet. */
  children?: Snippet;
  /** Back-compat: footer snippet. */
  footerSnippet?: Snippet;
  class?: string;
  [key: string]: unknown;
};

/* Image ------------------------------------------------------------------- */

export type ImageProps = {
  src: string;
  alt?: string;
  loading?: "eager" | "lazy";
  decoding?: "sync" | "async" | "auto";
  class?: string;
  [key: string]: unknown;
};

/* Video ------------------------------------------------------------------- */

export type VideoProps = {
  src?: string;
  sources?: { src: string; type?: string }[];
  poster?: string;
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsinline?: boolean;
  preload?: "none" | "metadata" | "auto";
  class?: string;
  [key: string]: unknown;
};

/* Audio ------------------------------------------------------------------- */

export type AudioProps = {
  src?: string;
  sources?: { src: string; type?: string }[];
  caption?: string;
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  preload?: "none" | "metadata" | "auto";
  class?: string;
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

/* Badge ------------------------------------------------------------------- */

export type BadgeVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "positive"
  | "neutral"
  | "negative";

export type BadgeProps = {
  variant?: BadgeVariant;
  as?: "span" | "div" | "a";
  href?: string;
  class?: string;
  children?: Snippet;
  [key: string]: unknown;
};

/* Separator --------------------------------------------------------------- */

export type SeparatorProps = {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
  class?: string;
  [key: string]: unknown;
};

/* Progress ---------------------------------------------------------------- */

export type ProgressProps = {
  value?: number | null;
  max?: number;
  label?: string;
  showValue?: boolean;
  class?: string;
  [key: string]: unknown;
};

/* Avatar ------------------------------------------------------------------ */

export type AvatarProps = {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
  class?: string;
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

/* Breadcrumb / Textarea / Alert / Skeleton / Pagination ------------------ */

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type BreadcrumbProps = {
  items?: BreadcrumbItem[];
  class?: string;
  [key: string]: unknown;
};

export type TextareaProps = WacssPersistProps & {
  value?: string;
  placeholder?: string;
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  rows?: number;
  id?: string;
  name?: string;
  class?: string;
  inputClass?: string;
  [key: string]: unknown;
};

export type AlertVariant = "info" | "positive" | "destructive";

export type AlertProps = {
  variant?: AlertVariant;
  title?: string;
  description?: string;
  children?: Snippet;
  class?: string;
  [key: string]: unknown;
};

export type SkeletonProps = {
  /** Number of bar lines to render (ignored when `circle` is set). */
  lines?: number;
  /** Render an avatar-sized circle instead of bars. */
  circle?: boolean;
  class?: string;
  [key: string]: unknown;
};

export type PaginationProps = {
  /** Total number of items to paginate. */
  total: number;
  /** Items per page. */
  perPage?: number;
  /** Current page, 1-based. */
  page?: number;
  /** Pages shown before and after the current page. */
  siblingCount?: number;
  /** Loop from last page back to first and vice versa. */
  loop?: boolean;
  class?: string;
  [key: string]: unknown;
};
