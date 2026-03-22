import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "checkbox"). */
export const tokens: Overrides =
{ "background": "var(--color-clear)"
, "border-color": "var(--color-border)"
, "color": "var(--color-on-accent)"
, "size": "calc(var(--space) * 4.0)"
, "border-radius": "calc(var(--border-radius-small) * 1)"
, "label-gap": "calc(var(--space) * 2)"
, "label-font-size": "var(--font-size-ui)"
, "label-font-weight": "var(--font-weight)"
, "input-accent-color": "var(--color-accent)"
, "gap": "calc(var(--space) * 2)"
, "color-2": "var(--color-text)"
, "font-size": "var(--font-size-ui)"
, "font-weight": "var(--font-weight)"
, "hover-color": "var(--color-text)"
, "span-border-width": "var(--border-width)"
, "span-transition": "background var(--duration) var(--ease), border-color var(--duration) var(--ease), color var(--duration) var(--ease)"
  // Old `--lightness` is now the spec interaction colour bridge.
, "span-interaction": "var(--interaction)"
};
