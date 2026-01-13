import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "popover"). */
export const tokens: Overrides =
{ "background": "var(--color-surface)"
, "border-color": "var(--color-border)"
, "color": "var(--color-text)"
, "border-radius": "var(--border-radius-surface)"
, "box-shadow": "var(--box-shadow-overlay)"
, "padding": "calc(var(--space) * 1.0)"
, "min-width": "calc(var(--space) * 32)"
, "z-index": "var(--z-index-overlay)"
, "content-border-width": "var(--border-width)"
, "content-animation": "wacss-fade-in-fast var(--duration) var(--ease)"
, "content-closed-animation": "wacss-fade-out-fast var(--duration) var(--ease)"
, "dropdown-menu-item-opacity": "var(--opacity-disabled)"
, "dropdown-menu-separator-height": "var(--border-width)"
, "dropdown-menu-separator-background": "var(--color-border)"
, "dropdown-menu-separator-margin-space": "var(--space)"
, "dropdown-menu-group-heading-padding-space": "var(--space)"
, "dropdown-menu-group-heading-font-size": "calc(var(--font-size) * 0.75)"
, "dropdown-menu-group-heading-font-weight": "var(--font-weight-ui)"
, "dropdown-menu-group-heading-color": "var(--color-muted-foreground)"
, "dropdown-menu-checkbox-item-indicator-inset-inline-start": "calc(var(--space) * 1)"
, "content-padding": "calc(var(--space) * 4)"
};
