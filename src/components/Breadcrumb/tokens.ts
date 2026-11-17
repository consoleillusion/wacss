import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "breadcrumb"). */
export const tokens: Overrides =
{ "ol-gap": "calc(var(--space) * 2)"
, "ol-font-size": "var(--font-size-ui)"
, "li-gap": "calc(var(--space) * 2)"
, "li-color": "var(--color-muted-foreground)"
, "a-transition": "color var(--duration) var(--ease)"
, "a-color": "var(--color-text)"
, "color": "var(--color-text)"
, "font-weight": "var(--font-weight-ui)"
, "separator-color": "var(--color-muted-foreground)"
, "svg-inline-size": "calc(var(--font-size) * 0.75)"
, "svg-block-size": "calc(var(--font-size) * 0.75)"
};
