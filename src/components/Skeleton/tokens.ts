import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "skeleton"). */
export const tokens: Overrides =
{
  "background": "color-mix(in oklch, var(--color-text) 12%, var(--color-clear))"
, "gap": "calc(var(--space) * 2)"
, "animation-duration": "calc(var(--duration-surface) * 4)"
};
