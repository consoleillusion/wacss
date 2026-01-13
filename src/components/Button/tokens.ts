import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "button"). */
export const tokens: Overrides =
{ "background": "color-mix(in oklch, var(--color-text) 8%, var(--color-clear))"
, "border-color": "var(--color-clear)"
, "color": "var(--color-text)"
, "padding-block": "calc(var(--space) * 2.0)"
, "padding-inline": "calc(var(--space) * 4.0)"
, "font-size": "var(--font-size-ui)"
, "gap": "calc(var(--space) * 2.0)"
, "height": "calc(var(--space) * 9)"
, "height-sm": "calc(calc(var(--space) * 9) - var(--space))"
, "height-lg": "calc(calc(var(--space) * 9) + var(--space))"
, "height-icon": "calc(var(--space) * 9)"
, "variant-color": "var(--color-accent)"
, "variant-font-size": "calc(var(--font-size) * 0.75)"
};
