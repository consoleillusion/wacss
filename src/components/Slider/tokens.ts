import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "slider"). */
export const tokens: Overrides =
{ "track": "color-mix(in oklch, var(--color-text) 15%, var(--color-clear))"
, "range": "var(--color-accent)"
, "thumb": "var(--color-base)"
, "thumb-border-color": "var(--color-accent)"
, "thumb-size": "calc(var(--space) * 4.0)"
, "track-border-radius": "var(--border-radius-full)"
, "thumb-box-shadow": "var(--box-shadow-rest)"
, "thumb-transition": "box-shadow var(--duration) var(--ease)"
, "thumb-focus-visible-box-shadow": "0 0 0 2px var(--color-base), 0 0 0 4px var(--color-ring)"
, "opacity": "var(--opacity-disabled)"
};
