import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "toggle"). */
export const tokens: Overrides =
{ "background": "color-mix(in oklab, var(--color-text) 8%, var(--color-clear))"
, "color": "var(--color-text)"
, "border-color": "var(--color-clear)"
, "border-width": "var(--border-width)"
, "border-radius": "var(--border-radius)"
, "padding-block": "calc(var(--space) * 2)"
, "padding-inline": "calc(var(--space) * 3)"
, "font-size": "var(--font-size-small)"
, "outline-color": "var(--color-clear)"
, "outline-width": "var(--border-width)"
  /* A pressed toggle carries the positive tone on fill, edge and inherited ink. */
, "selection": "var(--tone-positive)"
, "selection-ink": "var(--tone-positive-ink)"
};
