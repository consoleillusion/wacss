import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "menu"). */
export const tokens: Overrides =
{ "background": "var(--color-surface)"
, "border-color": "var(--color-border)"
, "color": "var(--color-text)"
, "border-radius": "var(--border-radius-surface)"
, "box-shadow": "var(--box-shadow-overlay)"
, "padding": "calc(var(--space) * 1.0)"
, "item-border-radius": "calc(var(--border-radius-small) * 2)"
, "item-padding-block": "calc(var(--space) * 1.5)"
, "item-padding-inline": "calc(var(--space) * 2.0)"
, "item-font-size": "var(--font-size-ui)"
, "item-gap": "calc(var(--space) * 2.0)"
, "item-indicator-size": "calc(var(--font-size) - var(--space) / 2)"
, "item-background": "var(--color-clear)"
, "item-color": "var(--color-text)"
, "dropdown-menu-trigger-box-shadow": "var(--box-shadow-rest)"
, "svg-transition": "transform var(--duration) var(--ease)"
, "shortcut-font-size": "calc(var(--font-size) * 0.75)"
, "shortcut-color": "var(--color-muted-foreground)"
};
