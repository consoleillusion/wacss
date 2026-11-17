/**
 * L2 — Semantic / Default. Every value is an expression over L1 primitives (or
 * another L2 token). This is the default design language and the main place to
 * retheme the whole system. See wacss-docs/semantic.md.
 */
const onColor = (token: string) =>
  `oklch(from var(--${token}) clamp(18%, calc((0.6 - l) * 1000%), 92%) 0.01 h)`;
const surfaceOf = (token: string) => `color-mix(in oklab, var(--${token}) var(--tint), var(--color-base))`;
const inkOnSurface = (token: string) => `color-mix(in oklab, var(--${token}) 45%, var(--color-text))`;

export const semantic: Record<string, string> =
{ // --- Meanings: colour (prima: --color-accent) ---
  "color-palette": "var(--color-sumi)"
, "color-accent": "var(--color-palette)"
, "color-base": "oklch(from var(--color-accent) var(--lightness-dark) 0.01 h)"
, "color-surface": "color-mix(in oklch, var(--color-base), var(--color-text) 4%)"
, "color-text": "oklch(from var(--color-base) calc(1 - l) 0.01 h)"
, "color-text-muted": "color-mix(in oklch, var(--color-text) 65%, transparent)"
, "color-border": "color-mix(in oklch, var(--color-text) 15%, transparent)"
, "color-ring": "var(--color-accent)"
, "color-overlay": "color-mix(in oklch, var(--color-black) 50%, transparent)"
, "color-on-accent": onColor("color-accent")
, "color-clear": "transparent"

  // Space. Component lengths are em, page lengths rem.
, "space": "calc((var(--space-base) + var(--space-step)) * 1em)"
, "space-page": "calc((var(--space-base) + var(--space-step)) * 1rem)"

  // Type.
, "font-family": "var(--font-sans)"
, "font-family-code": "var(--font-mono)"
, "font-size-body": "var(--font-size-base)"
, "font-size-small": "calc(var(--font-size-base) / var(--font-size-ratio))"
, "font-size-heading": "calc(var(--font-size-base) * var(--font-size-ratio) * var(--font-size-ratio))"
, "font-weight-body": "var(--font-weight-base)"
, "font-weight-ui": "calc(var(--font-weight-base) + var(--font-weight-step))"
, "font-weight-heading": "calc(var(--font-weight-base) + var(--font-weight-step) * 2)"
, "line-height-body": "var(--line-height-base)"
, "line-height-heading": "calc(var(--line-height-base) - var(--line-height-step) * 2)"
, "measure": "var(--measure-base)"

  // Shape and depth.
, "radius-control": "calc((var(--border-radius-base) + var(--border-radius-step) * 2) * 1em)"
, "radius-surface": "calc((var(--border-radius-base) + var(--border-radius-step) * 4) * 1em)"
, "radius-full": "var(--border-radius-pill)"
, "border-radius-surface": "var(--radius-surface)"
, "border-radius-control": "var(--radius-control)"
, "shadow-surface":
    "0 var(--shadow-offset-step) calc(var(--shadow-blur-step) * 3) oklch(0% 0 0deg / calc(var(--shadow-alpha-base) + var(--shadow-alpha-step)))"
, "shadow-overlay":
    "0 calc(var(--shadow-offset-step) * 10) calc(var(--shadow-blur-step) * 15) calc(var(--shadow-offset-step) * -3) " +
    "oklch(0% 0 0deg / calc(var(--shadow-alpha-base) + var(--shadow-alpha-step)))"
, "layer-overlay": "calc(var(--z-index-base) + var(--z-index-step) * 5)"

  // Motion.
, "duration-interaction": "var(--duration-base)"
, "duration-surface": "calc(var(--duration-base) * var(--duration-ratio))"
, "duration-reveal": "calc(var(--duration-base) * var(--duration-ratio) * var(--duration-ratio) * var(--duration-ratio))"
, "easing": "var(--ease-out)"
, "easing-ambient": "var(--ease-in-out)"

  // --- Property defaults: one per CSS property a component may declare ---
, "background": "var(--color-surface)"
, "color": "var(--color-text)"
, "border-color": "var(--color-border)"
, "border-width": "var(--border-width-base)"
, "border-radius": "var(--radius-control)"
, "outline-color": "var(--color-clear)"
, "outline-width": "calc(var(--border-width-base) * 2)"
, "outline-offset": "calc(var(--border-width-base) * 2)"
, "padding": "calc(var(--space) * 4)"
, "padding-block": "calc(var(--space) * 2)"
, "padding-inline": "calc(var(--space) * 4)"
, "gap": "calc(var(--space) * 2)"
, "min-block-size": "calc(var(--space) * 9)"
, "font-size": "var(--font-size-body)"
, "font-weight": "var(--font-weight-body)"
, "line-height": "var(--line-height-body)"
, "box-shadow": "0 0 0 0 transparent" // identity
, "transform": "translate(0)" // identity
, "filter": "brightness(1)" // identity
, "opacity": "var(--opacity-base)"
, "transition-duration": "var(--duration-interaction)"
, "transition-timing-function": "var(--easing)"

  // --- Variant tones ---
, "tone-primary": "var(--color-accent)"
, "tone-primary-ink": "var(--color-on-accent)"
, "tone-secondary": "color-mix(in oklch, var(--color-text) 8%, transparent)"
, "tone-secondary-ink": "var(--color-text)"
, "tone-tertiary": "transparent"
, "tone-tertiary-ink": "var(--color-text)"
, "tone-positive": "var(--color-green)"
, "tone-positive-ink": onColor("tone-positive")
, "tone-warning": "var(--color-amber)"
, "tone-warning-ink": onColor("tone-warning")
, "tone-danger": "var(--color-red)"
, "tone-danger-ink": onColor("tone-danger")
, "tone-informational": "var(--color-blue)"
, "tone-informational-ink": onColor("tone-informational")

, "tint": "calc(var(--tint-base) + var(--tint-step))"
, "tone-positive-surface": surfaceOf("tone-positive")
, "tone-positive-surface-ink": inkOnSurface("tone-positive")
, "tone-warning-surface": surfaceOf("tone-warning")
, "tone-warning-surface-ink": inkOnSurface("tone-warning")
, "tone-danger-surface": surfaceOf("tone-danger")
, "tone-danger-surface-ink": inkOnSurface("tone-danger")
, "tone-informational-surface": surfaceOf("tone-informational")
, "tone-informational-surface-ink": inkOnSurface("tone-informational")

  // --- Interaction parameters ---
, "interaction": "var(--color-white)" // dark theme mixes toward white
, "mix-hover": "var(--mix-base)"
, "mix-highlighted": "calc(var(--mix-base) - var(--mix-step))"
, "mix-open": "var(--mix-base)"
, "mix-invalid": "85%"
, "scale-active": "calc(1 - var(--scale-step))"
, "scale-pressed": "calc(1 - var(--scale-step))"
, "opacity-disabled": "calc(var(--opacity-base) - var(--opacity-step) * 2)"
, "opacity-loading": "calc(var(--opacity-base) - var(--opacity-step))"
, "ring": "var(--color-ring)"
, "selection": "var(--color-accent)"
, "selection-ink": "var(--color-on-accent)"
, "invalid": "var(--tone-danger)"

  // --- Derived conveniences used by the demo and existing component overrides ---
, "color-muted": "var(--color-text-muted)"
, "color-muted-foreground": "var(--color-text-muted)"
, "color-well": "var(--color-base)"
, "color-well-fixed": "var(--color-base)"
, "color-pop": "var(--color-accent)"
, "color-destructive": "var(--tone-danger)"
, "color-positive": "var(--tone-positive)"
, "color-warning": "var(--tone-warning)"
, "color-info": "var(--tone-informational)"
, "color-white-ink": "var(--color-white)"
, "space-page-lg": "calc(var(--space-page) * 2)"
, "border-radius-small": "calc(var(--border-radius-base) + var(--border-radius-step) * 2)"
, "font-size-ui": "var(--font-size-small)"
, "shadow-rest": "var(--shadow-surface)"
, "box-shadow-rest": "var(--shadow-surface)"
, "box-shadow-overlay": "var(--shadow-overlay)"
, "duration": "var(--duration-interaction)"
, "duration-ambient": "var(--duration-surface)"
, "duration-indeterminate": "calc(var(--duration-base) * 8)"
, "ease": "var(--easing)"
, "ease-ambient": "var(--easing-ambient)"
, "z-index-overlay": "var(--layer-overlay)"
, "measure-min": "50%"
, "max-width": "var(--measure)"
, "max-height": "calc(var(--space) * 64)"
, "min-width": "calc(var(--space) * 16)"
, "block-size": "var(--min-block-size)"
, "inline-size": "calc(var(--space) * 64)"
, "margin": "calc(var(--space) * 4)"
, "z-index": "var(--z-index-base)"
, "transition": "var(--duration-interaction) var(--easing)"

  // Graph categorical hues (token dependency diagram).
, "graph-layer-1": "var(--color-matcha)"
, "graph-layer-2": "var(--color-aizome)"
, "graph-layer-3": "var(--color-amber)"
, "graph-layer-4": "var(--color-red)"
, "graph-layer-5": "var(--color-accent)"
, "graph-on-layer-1": onColor("graph-layer-1")
, "graph-on-layer-2": onColor("graph-layer-2")
, "graph-on-layer-3": onColor("graph-layer-3")
, "graph-on-layer-4": onColor("graph-layer-4")
, "graph-on-layer-5": onColor("graph-layer-5")
};

/** L2 values that change in the light theme. */
export const light: Record<string, string> =
{ "color-accent":
    "oklch(from var(--color-palette) calc(l + var(--lift-light)) calc(c * var(--chroma-ratio-light)) h)"
, "color-base": "oklch(from var(--color-accent) var(--lightness-light) 0.01 h)"
, "tint": "var(--tint-base)"
, "interaction": "var(--color-black)"
};

/** The declaration `data-palette="<name>"` applies. */
export const palette = (name: string): Record<string, string> =>
  ({ "color-palette": `var(--color-${name})` });
