import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "progress"). */
export const tokens: Overrides =
{
  // Track and indicator ink. The indicator uses currentColor in markup.
  "background": "color-mix(in oklch, var(--color-text) 12%, var(--color-clear))"
, "color": "var(--tone-positive)"
, "height": "calc(var(--space) * 2)"
, "border-radius": "var(--radius-full)"
, "transition-duration": "var(--duration-surface)"
, "animation-duration": "calc(var(--duration-surface) * 4)"
};
