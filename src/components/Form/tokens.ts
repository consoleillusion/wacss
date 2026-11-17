import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "form"). */
export const tokens: Overrides =
{ "gap": "calc(var(--space) * 4.0)"
, "columns-min": "calc(var(--space) * 64)"
, "legend-font-size": "var(--font-size-ui)"
, "legend-font-weight": "var(--font-weight-ui)"
, "legend-margin-block-end": "calc(var(--space) * 1)"
, "p-font-size": "var(--font-size-ui)"
, "p-color": "var(--tone-danger)"
, "div-gap": "calc(var(--space) * 2)"

  // The disabled opacity used to live at L3; it is now the `opacity-disabled`
  // bridge consumed by the disabled state's calc() recipe.
, "opacity-disabled": "var(--opacity-disabled)"
};
