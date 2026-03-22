import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "alert-dialog"). */
export const tokens: Overrides =
{ "ring": "var(--ring)"
, "overlay": "var(--color-overlay)"
, "border-radius": "var(--radius-surface)"
, "box-shadow": "var(--shadow-overlay)"
, "padding": "calc(var(--space) * 6)"
, "gap": "calc(var(--space) * 4)"
, "max-width": "calc(var(--space) * 96)"
, "max-height": "min(85vh, calc(var(--space) * 160))"
, "z-index": "var(--layer-overlay)"
, "animation-duration": "var(--duration-surface)"
, "animation-timing-function": "var(--easing)"
, "title-font-size": "calc(var(--font-size-body) * 1.125)"
, "title-font-weight": "var(--font-weight-heading)"
, "title-line-height": "var(--line-height-heading)"
, "description-font-size": "var(--font-size-small)"
};
