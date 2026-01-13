import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "tooltip"). */
export const tokens: Overrides =
{ "background": "var(--color-text)"
, "border-color": "var(--color-clear)"
, "color": "var(--color-on-accent)"
, "border-radius": "calc(var(--border-radius-small) * 2)"
, "box-shadow": "var(--box-shadow-overlay)"
, "padding-block": "calc(var(--space) * 1.5)"
, "padding-inline": "calc(var(--space) * 3.0)"
, "font-size": "calc(var(--font-size) * 0.75)"
, "content-border-width": "var(--border-width)"
, "content-animation": "wacss-fade-in-fast var(--duration) var(--ease)"
, "content-closed-animation": "wacss-fade-out-fast var(--duration) var(--ease)"
};
