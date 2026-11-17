import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "alert"). */
export const tokens: Overrides =
{
  // Status wells: tinted surfaces with matching ink and a tone-coloured edge.
  "background": "var(--tone-informational-surface)"
, "color": "var(--tone-informational-surface-ink)"
, "border-color": "color-mix(in oklch, var(--tone-informational) 55%, var(--color-clear))"
, "border-width": "var(--border-width)"
, "border-radius": "var(--radius-surface)"
, "padding": "calc(var(--space) * 3) calc(var(--space) * 4)"
, "gap": "calc(var(--space) * 3)"

  // L4: surfaces are bridged from the L2 status tones, not solid fills.
, "background.informational": "var(--alert-tone-informational-surface)"
, "color.informational": "var(--alert-tone-informational-surface-ink)"
, "border-color.informational": "color-mix(in oklch, var(--alert-tone-informational) 55%, transparent)"
, "background.positive": "var(--alert-tone-positive-surface)"
, "color.positive": "var(--alert-tone-positive-surface-ink)"
, "border-color.positive": "color-mix(in oklch, var(--alert-tone-positive) 55%, transparent)"
, "background.warning": "var(--alert-tone-warning-surface)"
, "color.warning": "var(--alert-tone-warning-surface-ink)"
, "border-color.warning": "color-mix(in oklch, var(--alert-tone-warning) 55%, transparent)"
, "background.danger": "var(--alert-tone-danger-surface)"
, "color.danger": "var(--alert-tone-danger-surface-ink)"
, "border-color.danger": "color-mix(in oklch, var(--alert-tone-danger) 55%, transparent)"
};
