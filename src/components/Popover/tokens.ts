import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "popover"). */
export const tokens: Overrides =
{ "ring": "var(--ring)"
, "border-radius": "var(--radius-surface)"
, "box-shadow": "var(--shadow-overlay)"
, "padding": "var(--space)"
, "content-padding": "calc(var(--space) * 4)"
, "min-width": "calc(var(--space) * 32)"
, "inline-size": "calc(var(--space) * 72)"
, "z-index": "var(--layer-overlay)"
, "animation-duration": "var(--duration-interaction)"
, "animation-timing-function": "var(--easing)"
};
