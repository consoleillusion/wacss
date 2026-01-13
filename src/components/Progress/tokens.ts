import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "progress"). */
export const tokens: Overrides =
{ "track": "color-mix(in oklch, var(--color-text) 12%, var(--color-clear))"
, "indicator": "var(--color-positive)"
, "height": "calc(var(--space) * 2.0)"
, "border-radius": "var(--border-radius-full)"
, "div-transition": "width var(--duration-surface) var(--ease), transform var(--duration-surface) var(--ease)"
, "div-animation": "wacss-progress-indeterminate var(--duration-indeterminate) infinite var(--ease-ambient)"
};
