# L1 — Primitives

Primitives quantise the design space. They are the only tokens chosen by judgement rather than calculation, so they are hand-authored and kept few.

## Rules

- Literals only. No `var()`.
- No ramps (`radius-1…12`, `color-50…950`). A scale is a **base** plus a **step** (added) or a **ratio** (multiplied). L2 computes the points it needs.
- One value per colour hue. Light and dark variants are computed in L2.
- Units belong where the quantity is physical (`px` for hairlines, `ms` for time). A spacing step is unitless so L2 can apply it in `em` or `rem`.

## The set

```scss
:root {
  // Space: step × n, applied as em (components) or rem (page).
  --space-base: 0;
  --space-step: 0.25;

  // Radius (em).
  --border-radius-base: 0;
  --border-radius-step: 0.125;
  --border-radius-pill: 9999px;

  // Border.
  --border-width-base: 1px;

  // Type.
  --font-size-base: 1rem;
  --font-size-ratio: 1.2;          // modular scale
  --font-weight-base: 400;
  --font-weight-step: 100;
  --line-height-base: 1.5;
  --line-height-step: 0.125;
  --measure-base: 68ch;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Source Code Pro", ui-monospace, SFMono-Regular, monospace;

  // Motion.
  --duration-base: 150ms;
  --duration-ratio: 1.5;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

  // Depth.
  --shadow-offset-step: 1px;
  --shadow-blur-step: 1px;
  --shadow-alpha-base: 0.05;
  --shadow-alpha-step: 0.05;
  --z-index-base: 0;
  --z-index-step: 10;

  // Interaction amounts.
  --mix-base: 8%;                   // hover lightens/darkens by this much
  --mix-step: 4%;
  --scale-step: 0.02;               // active/pressed shrink
  --opacity-base: 1;
  --opacity-step: 0.25;
  --tint-base: 16%;                 // status surface tint, light theme
  --tint-step: 18%;                 // added in the dark theme

  // Surface lightness bounds.
  --lightness-dark: 18%;
  --lightness-light: 97%;
  --lift-light: 0.1;                // light-theme accent lift
  --chroma-ratio-light: 0.8;        // light-theme accent desaturation

  // Hues: one value each.
  --color-sumi:   oklch(60% 0.01 260deg);
  --color-matcha: oklch(62% 0.075 140deg);
  --color-sakura: oklch(62% 0.085 5deg);
  --color-aizome: oklch(60% 0.075 250deg);
  --color-red:    oklch(57.7% 0.245 27deg);
  --color-green:  oklch(62.7% 0.17 149deg);
  --color-amber:  oklch(76.9% 0.155 70deg);
  --color-blue:   oklch(60% 0.12 245deg);
  --color-white:  oklch(99% 0 0deg);
  --color-black:  oklch(2% 0 0deg);
}
```

## Why these values

| Primitive | Reason |
| --- | --- |
| `--space-step: 0.25` | A quarter of the font size is the smallest perceptible gap. Multiples of it give 4/8/12/16 px at 16 px text. |
| `--border-radius-step: 0.125` | Soft corners. 2 steps ≈ 4 px on controls, 4 steps ≈ 8 px on surfaces. |
| `--font-size-ratio: 1.2` | A minor-third scale: restrained heading contrast for the editorial direction. |
| `--duration-base: 150ms`, ratio 1.5 | Interaction feedback at ~150 ms, surfaces at ~225 ms, reveals at ~500 ms. |
| `--mix-base: 8%` | Visible on every surface without overpowering a variant's hue. |
| Hues at ~60% L, low chroma | Muted, low-saturation direction; a mid lightness reads on both themes. |
| Status hues at higher chroma | Meaning must be unmistakable. |

Changing a primitive moves every derived value. That is intended, but it is a design decision, not a retheme. Rethemes happen in L2.
