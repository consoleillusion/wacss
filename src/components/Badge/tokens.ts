import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "badge"). */
export const tokens: Overrides =
{ "background": "var(--color-accent)"
, "border-color": "var(--color-clear)"
, "color": "var(--color-on-accent)"
, "border-radius": "var(--border-radius-full)"
, "padding-block": "calc(var(--space) * 0.5)"
, "padding-inline": "calc(var(--space) * 2.0)"
, "font-size": "calc(var(--font-size) * 0.75)"
, "line-height": "var(--line-height-heading)"
, "font-font-weight": "var(--font-weight-ui)"
, "border-width": "var(--border-width)"
, "transition": "background var(--duration) var(--ease), color var(--duration) var(--ease)"
, "badge-current-background": "var(--color-clear)"
, "badge-current-color": "var(--color-text)"
, "badge-current-border": "var(--color-border)"

  // L4: status badges are tinted; borders stay clear.
, "background-tertiary": "var(--badge-tone-secondary)"
, "color-tertiary": "var(--badge-tone-tertiary-surface-ink)"
, "background-positive": "var(--badge-tone-positive-surface)"
, "color-positive": "var(--badge-tone-positive-surface-ink)"
, "background-danger": "var(--badge-tone-danger-surface)"
, "color-danger": "var(--badge-tone-danger-surface-ink)"
, "border-color-tertiary": "var(--badge-border-color)"
, "border-color-positive": "var(--badge-border-color)"
, "border-color-danger": "var(--badge-border-color)"
};
