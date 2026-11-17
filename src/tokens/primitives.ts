/**
 * L1 — Primitives. The only tokens that do not reference other tokens.
 *
 * Foundations, not ramps: a scale is a base plus a step (addition) or a ratio
 * (multiplication). Higher levels compute the points they need with calc().
 * See wacss-docs/primitives.md.
 */
export const primitives: Record<string, string> =
{ // Space: step × n, applied as em (components) or rem (page).
  "space-base": "0"
, "space-step": "0.25"

  // Radius.
, "border-radius-base": "0"
, "border-radius-step": "0.125"
, "border-radius-pill": "9999px"

  // Border.
, "border-width-base": "1px"

  // Type.
, "font-size-base": "1rem"
, "font-size-ratio": "1.2"
, "font-weight-base": "400"
, "font-weight-step": "100"
, "line-height-base": "1.5"
, "line-height-step": "0.125"
, "measure-base": "68ch"
, "font-sans": '"Inter", ui-sans-serif, system-ui, sans-serif'
, "font-mono": '"Source Code Pro", ui-monospace, SFMono-Regular, monospace'

  // Motion.
, "duration-base": "150ms"
, "duration-ratio": "1.5"
, "ease-out": "cubic-bezier(0.16, 1, 0.3, 1)"
, "ease-in-out": "cubic-bezier(0.65, 0, 0.35, 1)"

  // Depth.
, "shadow-offset-step": "1px"
, "shadow-blur-step": "1px"
, "shadow-alpha-base": "0.05"
, "shadow-alpha-step": "0.05"
, "z-index-base": "0"
, "z-index-step": "10"

  // Interaction amounts.
, "mix-base": "8%"
, "mix-step": "4%"
, "scale-step": "0.02"
, "opacity-base": "1"
, "opacity-step": "0.25"
, "tint-base": "16%"
, "tint-step": "18%"

  // Surface lightness bounds.
, "lightness-dark": "18%"
, "lightness-light": "97%"
, "lift-light": "0.1"
, "chroma-ratio-light": "0.8"

  // Hues: one value each.
, "color-sumi": "oklch(60% 0.01 260deg)"
, "color-matcha": "oklch(62% 0.075 140deg)"
, "color-sakura": "oklch(62% 0.085 5deg)"
, "color-aizome": "oklch(60% 0.075 250deg)"
, "color-red": "oklch(57.7% 0.245 27deg)"
, "color-green": "oklch(62.7% 0.17 149deg)"
, "color-amber": "oklch(76.9% 0.155 70deg)"
, "color-blue": "oklch(60% 0.12 245deg)"
, "color-white": "oklch(99% 0 0deg)"
, "color-black": "oklch(2% 0 0deg)"
};

/** Palette names that `data-palette` may select. */
export const palettes = ["sumi", "matcha", "sakura", "aizome"] as const;
