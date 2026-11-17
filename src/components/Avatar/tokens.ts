import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "avatar"). */
export const tokens: Overrides =
{ "size": "calc(var(--space) * 10)"
, "size-sm": "calc(var(--space) * 8)"
, "size-lg": "calc(var(--space) * 12)"
  /* `size` is selected per instance in markup by overriding these two L3 tokens. */
, "inline-size": "var(--avatar-size)"
, "block-size": "var(--avatar-size)"
, "background": "var(--color-text-muted)"
, "color": "var(--color-text)"
, "border-radius": "var(--radius-full)"
, "font-size": "var(--font-size-small)"
, "font-weight": "var(--font-weight-ui)"
};
