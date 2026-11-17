import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "badge"). */
export const tokens: Overrides =
{
  "background": "var(--color-accent)"
, "color": "var(--color-on-accent)"
, "border-color": "var(--color-clear)"
, "border-width": "var(--border-width)"
, "border-radius": "var(--radius-full)"
, "padding-block": "calc(var(--space) * 0.5)"
, "padding-inline": "calc(var(--space) * 2)"
, "font-size": "calc(var(--font-size-small) * 0.75)"
, "font-weight": "var(--font-weight-ui)"
, "line-height": "var(--line-height-heading)"
, "transition": "background var(--duration-interaction) var(--easing), color var(--duration-interaction) var(--easing)"

  // L4: status badges are tinted wells; borders stay clear.
, "background.tertiary": "var(--badge-tone-secondary)"
, "color.tertiary": "var(--badge-tone-tertiary-ink)"
, "border-color.tertiary": "var(--badge-border-color)"
, "background.informational": "var(--badge-tone-informational-surface)"
, "color.informational": "var(--badge-tone-informational-surface-ink)"
, "border-color.informational": "var(--badge-border-color)"
, "background.positive": "var(--badge-tone-positive-surface)"
, "color.positive": "var(--badge-tone-positive-surface-ink)"
, "border-color.positive": "var(--badge-border-color)"
, "background.warning": "var(--badge-tone-warning-surface)"
, "color.warning": "var(--badge-tone-warning-surface-ink)"
, "border-color.warning": "var(--badge-border-color)"
, "background.danger": "var(--badge-tone-danger-surface)"
, "color.danger": "var(--badge-tone-danger-surface-ink)"
, "border-color.danger": "var(--badge-border-color)"
};
