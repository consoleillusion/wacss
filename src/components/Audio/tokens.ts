import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "audio"). */
export const tokens: Overrides =
{ "background": "var(--color-base)"
  /* WebKit paints the timeline and volume track from background-color. */
, "background-color": "var(--color-border)"
, "border-radius": "var(--border-radius)"
};
