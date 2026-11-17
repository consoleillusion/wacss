import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "accordion"). */
export const tokens: Overrides =
{ "border-color": "var(--color-border)"
, "trigger-color": "var(--color-text)"
, "content-color": "var(--color-text)"
, "trigger-padding-block": "calc(var(--space) * 4.0)"
, "transition": "var(--duration-reveal)"
, "details-border-block-end-border-width": "var(--border-width)"
, "summary-padding-space": "var(--space)"
, "summary-font-size": "var(--font-size)"
, "summary-font-weight": "var(--font-weight-ui)"
, "summary-transition": "color var(--duration) var(--ease)"
, "summary-color": "var(--color-muted-foreground)"
, "svg-transition": "transform var(--duration-surface) var(--ease)"
, "details-transition-ease": "var(--ease)"
, "content-font-size": "var(--font-size)"
, "content-padding-block-end": "calc(var(--space) * 4)"
};
