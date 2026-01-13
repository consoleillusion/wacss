import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "input"). */
export const tokens: Overrides =
{ "background": "var(--color-base)"
, "border-color": "var(--color-border)"
, "color": "var(--color-text)"
, "placeholder-color": "var(--color-muted-foreground)"
, "padding-block": "calc(var(--space) * 2.0)"
, "padding-inline": "calc(var(--space) * 3.0)"
, "height": "calc(var(--space) * 9)"
, "font-size": "var(--font-size-ui)"
, "ring": "color-mix(in oklch, var(--color-ring) 35%, var(--color-clear))"
, "field-description-font-size": "var(--font-size-ui)"
, "field-error-font-size": "var(--font-size-ui)"
, "field-error-color": "var(--color-destructive)"
, "gap": "calc(var(--space) * 2)"
};
