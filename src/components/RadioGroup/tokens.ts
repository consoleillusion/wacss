import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "radio"). */
export const tokens: Overrides =
{ "background": "var(--color-clear)"
, "border-color": "var(--color-border)"
, "dot": "var(--color-on-accent)"
, "size": "calc(var(--space) * 4.0)"
, "group-gap": "calc(var(--space) * 2)"
, "group-item-border-width": "var(--border-width)"
, "group-item-transition": "background var(--duration) var(--ease), border-color var(--duration) var(--ease)"
, "group-item-outline": "calc(var(--border-width) * 2) solid var(--ring)"
, "group-item-opacity": "var(--opacity-disabled)"
, "input-accent-color": "var(--color-accent)"

  // L5: the dot keeps its colour when checked (the default variant is `secondary`).
, "dot.secondary.checked": "var(--radio-dot-secondary)"
};
