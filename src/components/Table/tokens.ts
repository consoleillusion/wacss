import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "table"). */
export const tokens: Overrides =
{ "head-color": "var(--color-muted-foreground)"
, "head-font-weight": "var(--font-weight-ui)"
, "cell-padding-block": "calc(var(--space) * 2.0)"
, "cell-padding-inline": "calc(var(--space) * 3.0)"
, "row-border-color": "var(--color-border)"
, "row-background": "var(--color-clear)"
, "font-size": "var(--font-size-ui)"
, "caption-margin-block-start": "calc(var(--space) * 2)"
, "caption-font-size": "calc(var(--font-size) * 0.75)"
, "caption-color": "var(--color-muted-foreground)"
, "th-border-block-end-border-width": "var(--border-width)"
, "td-border-block-end-border-width": "var(--border-width)"
, "tr-transition": "background var(--duration) var(--ease)"
};
