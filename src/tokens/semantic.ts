/**
 * L2 — Semantic / Default. Every value is a function of L1 primitives (or of
 * another L2 token). This is the default design language and the main place
 * to retheme the whole system.
 *
 * Three groups:
 *   1. Design meanings: colours, type, space, depth, motion.
 *   2. Property defaults: one `--<css-property>` per property a component can
 *      declare. An L3 token with no override is `var(--<css-property>)`.
 *   3. Role tones and state parameters: what L4 roles and L5 states are made
 *      of. Each component carries them down through its own L3/L4 tokens.
 *
 * `light` holds the values that change in the light theme. `palette` is the
 * declaration a `data-palette="<name>"` attribute applies.
 */

const onColor = (token: string) =>
  `oklch(from var(--${token}) clamp(18%, calc((0.6 - l) * 1000%), 92%) 0.01 h)`;
const lighten = (token: string) =>
  `oklch(from var(--${token}) calc(l + var(--color-lift)) calc(c * var(--color-chroma-ratio)) h)`;
const tintOf = (token: string) => `color-mix(in oklab, var(--${token}) var(--tint), var(--color-base))`;
const inkOnTint = (token: string) => `color-mix(in oklab, var(--${token}) 45%, var(--color-text))`;

export const semantic: Record<string, string> =
{ // --- 1. Colour meanings (prima: --color-accent) ---
  "color-palette": "var(--color-sumi)"
, "color-accent": "var(--color-palette)"
, "color-base-light": "oklch(from var(--color-accent) var(--color-base-dark-l) 0.01 h)"
, "color-base-light-inverse": "oklch(from var(--color-base-light) clamp(0, calc(1 - l), 1) 0.01 h)"
, "color-base": "color-mix(in oklch, var(--color-base-light), var(--color-accent) 2%)"
, "color-surface": "color-mix(in oklch, var(--color-base), var(--color-base-light-inverse) 4%)"
, "color-well": "var(--color-well-dark)"
, "color-well-fixed": "var(--color-well-dark)"
, "color-pop": "oklch(from var(--color-accent) l calc(c + 0.01) calc(h + 15))"
, "color-text": "var(--color-base-light-inverse)"
, "color-muted": "color-mix(in oklch, var(--color-base), var(--color-text) 5%)"
, "color-muted-foreground": "color-mix(in oklch, var(--color-text) 65%, transparent)"
, "color-border": "color-mix(in oklch, var(--color-text) 15%, transparent)"
, "color-ring": "var(--color-accent)"
, "color-overlay": "color-mix(in oklch, var(--color-black) 50%, transparent)"
, "color-on-accent": onColor("color-accent")
, "color-clear": "transparent"
, "color-destructive": "var(--color-red)"
, "color-positive": "var(--color-green)"
, "color-info": "var(--color-aizome)"
, "color-warning": "var(--color-amber)"
, "color-white-ink": "var(--color-white)"
, "tint": "calc(var(--tint-base) + var(--tint-step))"
, "lightness": "var(--color-white)"

  // Graph categorical hues (the token dependency diagram)
, "graph-layer-1": "var(--color-matcha)"
, "graph-layer-2": "var(--color-aizome)"
, "graph-layer-3": "var(--color-amber)"
, "graph-layer-4": "var(--color-kurenai)"
, "graph-layer-5": "var(--color-accent)"
, "graph-on-layer-1": onColor("graph-layer-1")
, "graph-on-layer-2": onColor("graph-layer-2")
, "graph-on-layer-3": onColor("graph-layer-3")
, "graph-on-layer-4": onColor("graph-layer-4")
, "graph-on-layer-5": onColor("graph-layer-5")

  // --- Type, space, shape, depth, motion ---
, "space": "calc(var(--space-base) + var(--space-step))"
, "font-family": "var(--font-sans)"
, "font-family-heading": "var(--font-family)"
, "font-family-code": "var(--font-mono)"
, "font-size": "calc(var(--font-size-base))"
, "font-size-ui": "calc(var(--font-size-base) * var(--font-size-ratio))"
, "font-weight": "calc(var(--font-weight-base))"
, "font-weight-ui": "calc(var(--font-weight-base) + var(--font-weight-step))"
, "font-weight-heading": "calc(var(--font-weight-base) + var(--font-weight-step) * 2)"
, "line-height": "calc(var(--line-height-base))"
, "line-height-heading": "calc(var(--line-height-base) - var(--line-height-step))"
, "measure": "var(--measure-base)"
, "measure-min": "50%"
, "border-width": "calc(var(--border-width-base))"
, "border-radius": "calc(var(--border-radius-base) + var(--border-radius-step) * 4)"
, "border-radius-surface": "calc(var(--border-radius-base) + var(--border-radius-step) * 4)"
, "border-radius-small": "calc(var(--border-radius-base) + var(--border-radius-step) * 2.5)"
, "border-radius-full": "var(--border-radius-pill)"
, "box-shadow-rest":
    "0 var(--shadow-offset-step) calc(var(--shadow-blur-step) * 2) oklch(0% 0 0deg / var(--shadow-alpha-base))"
, "box-shadow":
    "0 var(--shadow-offset-step) calc(var(--shadow-blur-step) * 3) oklch(0% 0 0deg / calc(var(--shadow-alpha-base) + var(--shadow-alpha-step)))"
    + ", 0 var(--shadow-offset-step) calc(var(--shadow-blur-step) * 2) calc(var(--shadow-offset-step) * -1) oklch(0% 0 0deg / calc(var(--shadow-alpha-base) + var(--shadow-alpha-step)))"
, "box-shadow-overlay":
    "0 calc(var(--shadow-offset-step) * 10) calc(var(--shadow-blur-step) * 15) calc(var(--shadow-offset-step) * -3) oklch(0% 0 0deg / calc(var(--shadow-alpha-base) + var(--shadow-alpha-step)))"
    + ", 0 calc(var(--shadow-offset-step) * 4) calc(var(--shadow-blur-step) * 6) calc(var(--shadow-offset-step) * -4) oklch(0% 0 0deg / calc(var(--shadow-alpha-base) + var(--shadow-alpha-step)))"
, "duration": "calc(var(--duration-base))"
, "duration-surface": "calc(var(--duration-base) * var(--duration-ratio))"
, "duration-ambient": "calc(var(--duration-base) * var(--duration-ratio) * var(--duration-ratio))"
, "duration-reveal": "calc(var(--duration-base) * var(--duration-ratio) * var(--duration-ratio) * var(--duration-ratio))"
, "duration-indeterminate": "calc(var(--duration-base) * 8)"
, "ease": "var(--ease-out)"
, "ease-ambient": "var(--ease-in-out)"
, "z-index-overlay": "calc(var(--z-index-base) + var(--z-index-step) * 5)"
, "opacity-disabled": "calc(var(--opacity-base) - var(--opacity-step) * 2)"

  // --- 2. Property defaults (the L3 fallback for an un-overridden property) ---
, "background": "var(--color-surface)"
, "color": "var(--color-text)"
, "border-color": "var(--color-border)"
, "outline-color": "var(--color-ring)"
, "padding": "calc(var(--space) * 4)"
, "padding-block": "calc(var(--space) * 2)"
, "padding-inline": "calc(var(--space) * 4)"
, "gap": "calc(var(--space) * 2)"
, "margin": "calc(var(--space) * 4)"
, "block-size": "calc(var(--space) * 9)"
, "inline-size": "calc(var(--space) * 64)"
, "opacity": "calc(var(--opacity-base))"
, "z-index": "calc(var(--z-index-base))"

  // --- 3a. Role tones: what an L4 role is made of ---
  // tone = solid fill · ink = text on that fill · surface = tinted well · surface-ink = text on the well
, "tone-primary": "var(--color-pop)"
, "tone-primary-ink": "var(--color-on-accent)"
, "tone-primary-surface": tintOf("color-accent")
, "tone-primary-surface-ink": "var(--color-text)"
, "tone-secondary": "var(--color-muted)"
, "tone-secondary-ink": "var(--color-text)"
, "tone-secondary-surface": "var(--color-muted)"
, "tone-secondary-surface-ink": "var(--color-text)"
, "tone-tertiary": "var(--color-clear)"
, "tone-tertiary-ink": "var(--color-text)"
, "tone-tertiary-surface": "var(--color-clear)"
, "tone-tertiary-surface-ink": "var(--color-muted-foreground)"
, "tone-positive": "var(--color-positive)"
, "tone-positive-ink": onColor("color-positive")
, "tone-positive-surface": tintOf("color-positive")
, "tone-positive-surface-ink": inkOnTint("color-positive")
, "tone-warn": "var(--color-warning)"
, "tone-warn-ink": onColor("color-warning")
, "tone-warn-surface": tintOf("color-warning")
, "tone-warn-surface-ink": inkOnTint("color-warning")
, "tone-danger": "var(--color-destructive)"
, "tone-danger-ink": "var(--color-white-ink)"
, "tone-danger-surface": tintOf("color-destructive")
, "tone-danger-surface-ink": inkOnTint("color-destructive")
, "tone-informational": "var(--color-info)"
, "tone-informational-ink": onColor("color-info")
, "tone-informational-surface": tintOf("color-info")
, "tone-informational-surface-ink": inkOnTint("color-info")

  // --- 3b. State parameters: what an L5 state is made of ---
  // Mixing states blend toward --lightness by a share of the mix scale.
, "state-highlighted": "calc(var(--mix-base) - var(--mix-step))"
, "state-hover": "calc(var(--mix-base))"
, "state-open": "calc(var(--mix-base))"
, "state-active": "calc(var(--mix-base) + var(--mix-step) * 2)"
, "state-pressed": "calc(var(--mix-base) + var(--mix-step) * 2)"
  // Selection states replace paint with the accent and ink with ink-on-accent.
, "state-checked": "var(--color-accent)"
, "state-checked-ink": "var(--color-on-accent)"
, "state-selected": "var(--color-accent)"
, "state-selected-ink": "var(--color-on-accent)"
, "state-current": "var(--color-accent)"
, "state-current-ink": "var(--color-on-accent)"
  // Edge states recolour borders, outlines and rings.
, "state-focus": "var(--color-ring)"
, "state-invalid": "var(--color-destructive)"
  // Disabled scales paint alpha and opacity.
, "state-disabled": "var(--opacity-disabled)"
, "state-loading": "var(--opacity-disabled)"
};

/** L2 values that change in the light theme. */
export const light: Record<string, string> =
{ "color-accent": lighten("color-palette")
, "color-base-light": "oklch(from var(--color-accent) var(--color-base-light-l) 0.01 h)"
, "color-well": "var(--color-well-light)"
, "tint": "calc(var(--tint-base))"
  // Light theme: interaction states mix with black. Dark theme: with white.
, "lightness": "var(--color-black)"
};

/** The declaration `data-palette="<name>"` applies. */
export const palette = (name: string): Record<string, string> =>
  ({ "color-palette": `var(--color-${name})` });
