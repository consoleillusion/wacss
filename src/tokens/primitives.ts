/**
 * L1 — Primitives. The only tokens that do not reference other tokens.
 *
 * Foundations, not ramps: every scale is a base plus a step (addition) or a
 * ratio (multiplication). Higher levels compute their values with calc().
 * Palette hues are single colours; their light-theme variants are derived in L2.
 */
export const primitives: Record<string, string> =
{ // --- Space ---
  "space-base": "0rem"
, "space-step": "0.25rem"

  // --- Radius ---
, "border-radius-base": "0rem"
, "border-radius-step": "0.05rem"
, "border-radius-pill": "9999px"

  // --- Border ---
, "border-width-base": "1px"

  // --- Type ---
, "font-size-base": "1rem"
, "font-size-ratio": "0.875"
, "font-weight-base": "400"
, "font-weight-step": "100"
, "line-height-base": "1.5"
, "line-height-step": "0.25"
, "measure-base": "68ch"
, "font-sans": "\"Inter\", ui-sans-serif, system-ui, sans-serif"
, "font-mono": "\"Source Code Pro\", ui-monospace, SFMono-Regular, monospace"

  // --- Motion ---
, "duration-base": "150ms"
, "duration-ratio": "1.5"
, "ease-out": "cubic-bezier(0.16, 1, 0.3, 1)"
, "ease-in-out": "cubic-bezier(0.65, 0, 0.35, 1)"

  // --- Depth ---
, "shadow-offset-step": "1px"
, "shadow-blur-step": "1px"
, "shadow-alpha-base": "0.05"
, "shadow-alpha-step": "0.05"
, "z-index-base": "0"
, "z-index-step": "10"

  // --- Opacity and interaction mixing ---
, "opacity-base": "1"
, "opacity-step": "0.25"
, "mix-base": "10%"
, "mix-step": "4%"
, "tint-base": "16%"
, "tint-step": "18%"

  // --- Colour: one value per hue ---
, "color-sakura": "oklch(62% 0.085 5deg)"
, "color-matcha": "oklch(62% 0.075 140deg)"
, "color-sumi": "oklch(60% 0.01 260deg)"
, "color-aizome": "oklch(60% 0.075 250deg)"
, "color-kurenai": "oklch(60% 0.095 25deg)"
, "color-red": "oklch(57.7% 0.245 27.325deg)"
, "color-green": "oklch(62.7% 0.17 149deg)"
, "color-amber": "oklch(76.9% 0.155 70deg)"
, "color-white": "oklch(99% 0 0deg)"
, "color-black": "oklch(2% 0 0deg)"
, "color-lift": "0.1"
, "color-chroma-ratio": "0.8"
, "color-base-dark-l": "18%"
, "color-base-light-l": "97%"
, "color-well-dark": "#111111"
, "color-well-light": "#fafafa"
};

/** Palette names that `data-palette` may select; each must have a `color-<name>` primitive. */
export const palettes = ["sakura", "matcha", "sumi", "aizome", "kurenai"] as const;
