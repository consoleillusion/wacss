import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "select"). */
export const tokens: Overrides =
{ "background": "var(--color-base)"
, "border-color": "var(--color-border)"
, "color": "var(--color-text)"
, "item-background": "var(--color-clear)"
, "item-color": "var(--color-text)"
, "item-border-radius": "calc(var(--border-radius-small) * 2)"
, "height": "calc(var(--space) * 9)"
, "trigger-gap": "calc(var(--space) * 2)"
, "trigger-border-width": "var(--border-width)"
, "trigger-font-weight": "var(--font-weight)"
, "trigger-transition": "border-color var(--duration) var(--ease), box-shadow var(--duration) var(--ease)"
, "trigger-box-shadow-focus-ring-span": "calc(var(--border-width) * 3)"
, "icon-transition": "transform var(--duration-surface) var(--ease)"
, "content-max-height": "min(calc(var(--space) * 96), 80vh)"
, "content-border-width": "var(--border-width)"
, "content-animation": "wacss-fade-in-fast var(--duration) var(--ease)"
, "content-closed-animation": "wacss-fade-out-fast var(--duration) var(--ease)"
, "item-padding-space": "var(--space)"
, "item-opacity": "var(--opacity-disabled)"
, "item-font-weight": "var(--font-weight-ui)"
, "item-indicator-inset-inline-start": "calc(var(--space) * 2)"
, "scroll-up-button-height": "calc(var(--space) * 6)"
, "scroll-up-button-color": "var(--color-text-muted)"
, "outline-offset": "2px"
};
