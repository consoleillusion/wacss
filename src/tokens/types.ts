/**
 * The styling contract from wacss-docs. `meta` in each component's schema.ts is
 * the only input to token and CSS generation; the public `component` export
 * describes props and is never used for styling.
 */

export const VARIANTS =
  ["secondary", "primary", "tertiary", "positive", "warning", "danger", "informational"] as const;

export const STATES =
  [ "static", "hover", "highlighted", "focus", "active", "checked", "unchecked", "selected"
  , "current", "pressed", "open", "invalid", "loading", "disabled"
  ] as const;

export type Variant = (typeof VARIANTS)[number];
export type State = (typeof STATES)[number];

/** Property response types. The table in variants.md is closed. */
export type PropertyType = "fill" | "ink" | "edge" | "other";

/** A declaration in `meta.structure` / `meta.pseudoStructure`: literal CSS, never var(). */
export type Literals = Readonly<Record<string, string>>;

export interface Meta {
  /** Lowercase kebab-case token prefix; class name for class components. */
  name: string;
  /** Native element this component wraps. Absent means a class component. */
  element?: string;
  /** Themable CSS properties. Each gets L3, L4 and L5 tokens. */
  cssProperties: readonly string[];
  /** From VARIANTS, unique, always including `secondary`. */
  variants: readonly Variant[];
  /** From STATES, unique, always including `static`. */
  states: readonly State[];
  /** Structural literals, keyed by state. No var(), no overlap with cssProperties. */
  structure?: Partial<Record<State, Literals>>;
  /** Themable properties of pseudo-elements, e.g. { "::placeholder": ["color"] }. */
  pseudoElements?: Readonly<Record<string, readonly string[]>>;
  /** Structural literals for pseudo-elements, keyed by pseudo-element then state. */
  pseudoStructure?: Readonly<Record<string, Partial<Record<State, Literals>>>>;
  /** Explicit state → properties channel assignment, replacing the defaults. */
  channels?: Partial<Record<State, readonly string[]>>;
  /** Types for third-party custom properties, whose type can't be inferred by name. */
  types?: Readonly<Record<string, PropertyType>>;
}

/** Per-component overrides, keyed by relative token address. */
export type Overrides = Readonly<Record<string, string>>;

export interface Spec { meta: Meta; tokens?: Overrides; source: string; }
