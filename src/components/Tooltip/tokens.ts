import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "tooltip"). */
export const tokens: Overrides =
{ "background": "var(--color-text)"
, "border-color": "var(--color-clear)"
, "border-radius": "calc(var(--radius-control) * 2)"
, "box-shadow": "var(--shadow-overlay)"
, "color": "var(--color-on-accent)"
, "padding-block": "calc(var(--space) * 1.5)"
, "padding-inline": "calc(var(--space) * 3)"
, "font-size": "calc(var(--font-size-body) * 0.75)"
, "max-inline-size": "calc(var(--space) * 72)"
, "animation-duration": "var(--duration-interaction)"
, "animation-timing-function": "var(--easing)"
};
