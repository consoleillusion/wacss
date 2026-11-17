import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "accordion"). */
export const tokens: Overrides =
{
  "border-color": "var(--color-border)"
, "border-block-end-width": "var(--border-width)"
, "color": "var(--color-text)"
, "padding-block": "calc(var(--space) * 4)"
, "transition-duration": "var(--duration-reveal)"

  // L5: the open edge uses the ring bridge (named here so it is carried down).
, "border-color.secondary.open": "var(--accordion-ring-secondary)"
};
