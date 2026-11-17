import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "pagination"). */
export const tokens: Overrides =
{ "background": "var(--color-clear)"
, "color": "var(--color-muted-foreground)"
, "gap": "calc(var(--space) * 1.0)"
, "prev-inline-size": "calc(var(--space) * 8)"
, "prev-block-size": "calc(var(--space) * 8)"
, "prev-min-height": "calc(var(--space) * 8)"
, "prev-border": "var(--border-width) solid transparent"
, "prev-border-radius": "var(--border-radius)"
, "prev-font-size": "var(--font-size-ui)"
, "prev-font-weight": "var(--font-weight)"
, "prev-transition": "background var(--duration) var(--ease), color var(--duration) var(--ease)"
, "page-font-weight": "var(--font-weight-ui)"
, "prev-opacity": "var(--opacity-disabled)"
, "ellipsis-inline-size": "calc(var(--space) * 8)"
, "ellipsis-block-size": "calc(var(--space) * 8)"
, "ellipsis-color": "var(--color-muted-foreground)"
, "svg-inline-size": "calc(var(--space) * 4)"
, "svg-block-size": "calc(var(--space) * 4)"
};
