import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "skeleton"). */
export const tokens: Overrides =
{ "background": "color-mix(in oklch, var(--color-text) 12%, var(--color-clear))"
, "gap": "calc(var(--space) * 2)"
, "circle-animation": "wacss-skeleton-pulse calc(var(--duration-ambient) * 4) var(--ease-ambient) infinite"
, "circle-inline-size": "calc(var(--space) * 12)"
, "circle-block-size": "calc(var(--space) * 12)"
, "circle-border-radius": "var(--border-radius-full)"
, "bar-block-size": "calc(var(--space) * 4)"
, "bar-border-radius": "calc(var(--border-radius-small) * 1)"
};
