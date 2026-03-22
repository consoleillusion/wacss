import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "card"). */
export const tokens: Overrides =
{
  "background": "var(--color-surface)"
, "color": "var(--color-text)"
, "border-color": "var(--color-border)"
, "border-width": "var(--border-width)"
, "border-radius": "var(--radius-surface)"
, "padding": "calc(var(--space) * 6)"
, "box-shadow": "var(--shadow-surface)"
, "gap": "calc(var(--space) * 3)"
, "font-size": "calc(var(--font-size) * 0.875)"
, "font-weight": "var(--font-weight-heading)"
, "line-height": "var(--line-height-heading)"
};
