import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "tabs"). */
export const tokens: Overrides =
{ "list-background": "color-mix(in oklch, var(--color-text) 6%, var(--color-clear))"
, "list-color": "var(--color-muted-foreground)"
, "trigger-background": "var(--color-clear)"
, "trigger-color": "var(--color-muted-foreground)"
, "height": "calc(var(--space) * 9)"
, "trigger-padding-block": "calc(var(--space) * 1.0)"
, "trigger-padding-inline": "calc(var(--space) * 3.0)"
, "list-padding": "calc(var(--space) * 1)"
, "list-border-radius": "var(--border-radius)"
, "trigger-border-radius": "calc(var(--border-radius) - 2px)"
, "trigger-font-size": "var(--font-size-ui)"
, "trigger-font-weight": "var(--font-weight-ui)"
, "trigger-border": "var(--border-width) solid transparent"
, "trigger-transition": "color var(--duration) var(--ease)"
, "trigger-box-shadow": "var(--box-shadow-rest)"
, "trigger-opacity": "var(--opacity-disabled)"
, "content-margin-block-start": "calc(var(--space) * 2)"
, "content-font-size": "var(--font-size)"
, "content-color": "var(--color-text)"
, "gap": "calc(var(--space) * 4)"

  // The active tab is a raised base-coloured chip, not a mix.
, "trigger-active-background": "var(--color-base)"
, "trigger-active-color": "var(--color-text)"
, "trigger-background-standard-active": "var(--tabs-trigger-active-background-standard)"
, "trigger-color-standard-active": "var(--tabs-trigger-active-color-standard)"
};
