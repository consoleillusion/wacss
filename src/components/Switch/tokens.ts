import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "switch"). */
export const tokens: Overrides =
{ "track": "color-mix(in oklch, var(--color-text) 20%, var(--color-clear))"
, "thumb": "var(--color-base)"
, "width": "calc(var(--space) * 9)"
, "height": "calc(var(--space) * 5.0)"
, "thumb-size": "calc(var(--space) * 4.0)"
, "border-radius": "var(--border-radius-full)"
, "border": "var(--border-width) solid transparent"
, "transition": "background var(--duration) var(--ease)"
, "box-shadow-focus-ring-span": "calc(var(--border-width) * 3)"
, "opacity": "var(--opacity-disabled)"
, "inset-inline-start": "calc(var(--space) * 0.5)"
, "box-shadow": "var(--box-shadow-rest)"
, "transition-2": "translate var(--duration) var(--ease), background var(--duration) var(--ease)"
, "translate-space": "var(--space)"
, "translate-border-width": "var(--border-width)"

  // L5: the checked thumb takes ink-on-accent, not the accent.
, "thumb-standard-checked": "var(--switch-state-checked-ink-standard)"
};
