import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "button"). */
export const tokens: Overrides =
{ "background": "color-mix(in oklch, var(--color-text) 8%, var(--color-clear))"
, "border-color": "var(--color-clear)"
, "border-width": "var(--border-width)"
, "color": "var(--color-text)"
, "padding-block": "calc(var(--space) * 2.0)"
, "padding-inline": "calc(var(--space) * 4.0)"
, "font-size": "var(--font-size-ui)"
, "font-size-small": "calc(var(--font-size) * 0.75)"
, "accent-color": "var(--color-accent)"
, "gap": "calc(var(--space) * 2.0)"
, "height": "calc(var(--space) * 9)"
, "height-sm": "calc(calc(var(--space) * 9) - var(--space))"
, "height-lg": "calc(calc(var(--space) * 9) + var(--space))"
, "height-icon": "calc(var(--space) * 9)"
, "text-decoration-line": "none"
, "text-underline-offset": "0"
, "outline-offset": "2px"

  // L4: the link-style tertiary variant is an underlined, unpadded control.
, "height.tertiary": "auto"
, "padding-block.tertiary": "0"
, "padding-inline.tertiary": "0"
, "text-decoration-line.tertiary": "underline"
, "text-underline-offset.tertiary": "4px"
};
