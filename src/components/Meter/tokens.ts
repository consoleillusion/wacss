import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "meter"). */
export const tokens: Overrides =
{ "background": "color-mix(in oklab, var(--color-text) 12%, transparent)"
, "color": "var(--color-text)"
, "border-color": "var(--color-border)"
, "border-width": "var(--border-width)"
, "border-radius": "var(--radius-full)"
, "block-size": "calc(var(--space) * 2)"
, "inline-size": "100%"
};
