import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "table"). */
export const tokens: Overrides =
{ "head-color": "var(--color-text-muted)"
, "head-font-weight": "var(--font-weight-ui)"
, "cell-padding-block": "calc(var(--space) * 2)"
, "cell-padding-inline": "calc(var(--space) * 3)"
, "row-border-color": "var(--color-border)"
, "row-background": "var(--color-clear)"
, "font-size": "var(--font-size-small)"
, "caption-margin-block-start": "calc(var(--space) * 2)"
, "caption-font-size": "calc(var(--font-size-body) * 0.75)"
, "caption-color": "var(--color-text-muted)"
, "tr-transition": "background var(--duration-interaction) var(--easing)"
};
