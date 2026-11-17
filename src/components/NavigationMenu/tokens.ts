import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "nav"). */
export const tokens: Overrides =
{ "trigger-color": "var(--color-text)"
, "content-background": "var(--color-surface)"
, "content-border-color": "var(--color-border)"
, "content-border-radius": "var(--border-radius-surface)"
, "content-box-shadow": "var(--box-shadow-overlay)"
, "content-padding": "calc(var(--space) * 2.0)"
, "link-color": "var(--color-text)"
, "link-description-color": "var(--color-muted-foreground)"
, "navigation-menu-list-gap": "calc(var(--space) * 1)"
, "navigation-menu-trigger-font-size": "var(--font-size-ui)"
, "navigation-menu-trigger-font-weight": "var(--font-weight-ui)"
, "navigation-menu-trigger-min-height": "calc(var(--space) * 8)"
, "navigation-menu-link-gap": "calc(var(--space) * 1)"
, "navigation-menu-link-padding": "calc(var(--space) * 2)"
, "navigation-menu-link-border-radius": "calc(var(--border-radius-small) * 2)"
, "navigation-menu-link-font-size": "var(--font-size-ui)"
, "navigation-menu-link-line-height": "var(--line-height)"
, "navigation-menu-link-transition": "background var(--duration) var(--ease)"
, "span-font-size": "calc(var(--font-size) * 0.75)"
, "navigation-menu-content-border-width": "var(--border-width)"
, "ul-gap": "calc(var(--space) * 1)"
, "ul-inline-size": "calc(var(--space) * 96)"
, "navigation-menu-viewport-border-width": "var(--border-width)"
, "div-inline-size": "calc(var(--space) * 3)"
, "div-block-size": "calc(var(--space) * 1.5)"
, "div-border-width": "var(--border-width)"
, "div-border-start-start-radius": "calc(var(--border-radius-small) * 1)"
, "div-border-start-end-radius": "calc(var(--border-radius-small) * 1)"

  // L5: the open trigger keeps full-strength ink.
, "trigger-color-standard-active": "var(--nav-trigger-color-standard)"
};
