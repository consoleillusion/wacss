import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "alert-dialog"). */
export const tokens: Overrides =
{ "content-border-width": "var(--border-width)"
, "overlay-animation": "wacss-fade-in var(--duration-surface) var(--ease)"
, "content-animation": "wacss-pop-in var(--duration-surface) var(--ease)"
, "content-closed-animation": "wacss-pop-out var(--duration) var(--ease)"
, "title-font-size": "calc(var(--font-size) * 1.125)"
, "title-font-weight": "var(--font-weight-heading)"
, "title-line-height": "var(--line-height-heading)"
, "description-font-size": "var(--font-size-ui)"
};
