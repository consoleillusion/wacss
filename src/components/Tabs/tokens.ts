import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "tabs"). */
export const tokens: Overrides =
{
  "background": "color-mix(in oklch, var(--color-text) 6%, var(--color-clear))"
, "color": "var(--color-text-muted)"
, "gap": "calc(var(--space) * 1)"
, "padding": "calc(var(--space) * 1)"
, "border-radius": "var(--radius-control)"
, "height": "calc(var(--space) * 9)"
, "font-size": "var(--font-size-small)"
, "font-weight": "var(--font-weight-ui)"
, "box-shadow": "var(--shadow-surface)"
};
