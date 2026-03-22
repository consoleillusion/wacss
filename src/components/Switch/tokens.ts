import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "switch"). */
export const tokens: Overrides =
{ "track": "color-mix(in oklch, var(--color-text) 20%, var(--color-clear))"
, "thumb": "var(--color-base)"
, "width": "calc(var(--space) * 9)"
, "height": "calc(var(--space) * 5.0)"
, "thumb-size": "calc(var(--space) * 4.0)"
, "border-radius": "var(--radius-full)"
, "border": "var(--border-width) solid transparent"
, "transition": "background var(--duration) var(--ease)"
, "box-shadow-focus-ring-span": "calc(var(--border-width) * 3)"
, "inset-inline-start": "calc(var(--space) * 0.5)"
, "box-shadow": "var(--box-shadow-rest)"
, "transition-2": "translate var(--duration) var(--ease), background var(--duration) var(--ease)"
, "translate-space": "var(--space)"
, "translate-border-width": "var(--border-width)"
, "outline-offset": "2px"

  // The disabled opacity used to live at L3; it is now the state bridge.
, "opacity-disabled": "var(--opacity-disabled)"

  // L5: checked paints the track with the selection colour and the thumb with
  // the matching ink (the old `state-checked-ink` bridge is now `selection-ink`).
, "track.secondary.checked": "var(--switch-selection-secondary)"
, "thumb.secondary.checked": "var(--switch-selection-ink-secondary)"
};
