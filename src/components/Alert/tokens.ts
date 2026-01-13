import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "alert"). */
export const tokens: Overrides =
{ "icon": "var(--color-info)"
, "background": "var(--tone-informational-surface)"
, "border-color": "color-mix(in oklch, var(--color-info) 55%, var(--color-clear))"
, "gap": "calc(var(--space) * 3)"
, "padding": "calc(var(--space) * 3) calc(var(--space) * 4)"
, "border-width": "var(--border-width)"
, "border-radius": "var(--border-radius-surface)"
, "svg-inline-size": "calc(var(--space) * 5)"
, "svg-block-size": "calc(var(--space) * 5)"
, "body-gap": "calc(var(--space) * 1)"
, "title-font-size": "var(--font-size-ui)"
, "title-font-weight": "var(--font-weight-ui)"
, "title-line-height": "var(--line-height-heading)"
, "title-color": "var(--color-text)"
, "description-font-size": "var(--font-size-ui)"
, "description-color": "var(--color-text)"
, "description-line-height": "var(--line-height)"

  // L4: alerts are tinted wells with a tone-coloured icon and border.
, "icon-informational": "var(--alert-tone-informational)"
, "background-informational": "var(--alert-tone-informational-surface)"
, "border-color-informational": "color-mix(in oklch, var(--alert-tone-informational) 55%, transparent)"
, "icon-positive": "var(--alert-tone-positive)"
, "background-positive": "var(--alert-tone-positive-surface)"
, "border-color-positive": "color-mix(in oklch, var(--alert-tone-positive) 55%, transparent)"
, "icon-warn": "var(--alert-tone-warn)"
, "background-warn": "var(--alert-tone-warn-surface)"
, "border-color-warn": "color-mix(in oklch, var(--alert-tone-warn) 55%, transparent)"
, "icon-danger": "var(--alert-tone-danger)"
, "background-danger": "var(--alert-tone-danger-surface)"
, "border-color-danger": "color-mix(in oklch, var(--alert-tone-danger) 55%, transparent)"
};
