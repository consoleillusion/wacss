import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "disclosure"). */
export const tokens: Overrides =
{
  "border-color": "var(--color-border)"
, "border-block-end-width": "var(--border-width)"
, "color": "var(--color-text)"

  // L5: the open edge uses the ring bridge (named here so it is carried down).
, "border-color.secondary.open": "var(--disclosure-ring-secondary)"
};
