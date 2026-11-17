import type { Overrides } from "../../tokens/generate";

/** Hand-authored overrides of generated L3–L5 tokens (keys are relative to "avatar"). */
export const tokens: Overrides =
{ "size": "calc(var(--space) * 10)"
, "size-sm": "calc(calc(var(--space) * 10) - calc(var(--space) * 2))"
, "size-lg": "calc(calc(var(--space) * 10) + calc(var(--space) * 2))"
, "fallback-background": "var(--color-muted)"
, "fallback-color": "var(--color-muted-foreground)"
, "border-radius": "var(--border-radius-full)"
, "image-font-size": "var(--font-size-ui)"
, "image-font-weight": "var(--font-weight-ui)"
};
