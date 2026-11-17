import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "dialog"). */
export const tokens: Overrides =
{ "ring": "var(--ring)"
, "overlay": "var(--color-overlay)"
, "border-radius": "var(--radius-surface)"
, "box-shadow": "var(--shadow-overlay)"
, "padding": "calc(var(--space) * 6)"
, "gap": "calc(var(--space) * 4)"
, "max-width": "calc(var(--space) * 128)"
, "max-height": "min(85vh, calc(var(--space) * 160))"
, "z-index": "var(--layer-overlay)"
, "animation-duration": "var(--duration-surface)"
, "animation-timing-function": "var(--easing)"
, "title-font-size": "calc(var(--font-size-body) * 1.125)"
, "title-font-weight": "var(--font-weight-heading)"
, "title-line-height": "var(--line-height-heading)"
, "description-font-size": "var(--font-size-small)"
, "header-gap": "calc(var(--space) * 2)"
, "body-gap": "calc(var(--space) * 2)"
, "body-font-size": "var(--font-size-small)"
, "footer-gap": "calc(var(--space) * 2)"
, "close-right": "calc(var(--space) * 4)"
, "close-top": "calc(var(--space) * 4)"
, "close-border-radius": "var(--radius-control)"
, "close-padding": "var(--space)"
, "close-opacity": "calc(var(--opacity) * 0.7)"
};
