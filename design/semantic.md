# L2 — Semantic

L2 is the design language: what things mean, and the default for every property a component can use. It is the level consumers edit to retheme. It must stay readable.

Every L2 token is an expression over L1 (or other L2) plus literals.

Palettes are desaturated and earthy, with a neutral foundation and a limited set of accents that carry meaning. Do not declare colour ramps; derive variations with `color-mix()`, `calc()`, `pow()` or other CSS functions.

## Groups

1. **Meanings:** colours, type, space, depth, motion.
2. **Property defaults:** one token per CSS property a component may declare. An L3 token with no override takes its value from here.
3. **Variant tones:** the colours each variant is made of.
4. **Interaction parameters:** what states are made of.

## Meanings

```scss
:root {
  color-scheme: dark;

  // Colour. Prima: --color-accent.
  --color-palette: var(--color-sumi);
  --color-accent: var(--color-palette);
  --color-base: oklch(from var(--color-accent) var(--lightness-dark) 0.01 h);
  --color-surface: color-mix(in oklch, var(--color-base), var(--color-text) 4%);
  --color-text: oklch(from var(--color-base) calc(1 - l) 0.01 h);
  --color-text-muted: color-mix(in oklch, var(--color-text) 65%, transparent);
  --color-border: color-mix(in oklch, var(--color-text) 15%, transparent);
  --color-ring: var(--color-accent);
  --color-overlay: color-mix(in oklch, var(--color-black) 50%, transparent);
  --color-on-accent: oklch(from var(--color-accent) clamp(18%, calc((0.6 - l) * 1000%), 92%) 0.01 h);
  --color-clear: transparent;

  // Space.
  --space: calc((var(--space-base) + var(--space-step)) * 1em);
  --space-page: calc((var(--space-base) + var(--space-step)) * 1rem);

  // Type.
  --font-family: var(--font-sans);
  --font-family-code: var(--font-mono);
  --font-size-body: var(--font-size-base);
  --font-size-small: calc(var(--font-size-base) / var(--font-size-ratio));
  --font-size-heading: calc(var(--font-size-base) * var(--font-size-ratio) * var(--font-size-ratio));
  --font-weight-body: var(--font-weight-base);
  --font-weight-ui: calc(var(--font-weight-base) + var(--font-weight-step));
  --font-weight-heading: calc(var(--font-weight-base) + var(--font-weight-step) * 2);
  --line-height-body: var(--line-height-base);
  --line-height-heading: calc(var(--line-height-base) - var(--line-height-step) * 2);
  --measure: var(--measure-base);

  // Shape and depth.
  --radius-control: calc((var(--border-radius-base) + var(--border-radius-step) * 2) * 1em);
  --radius-surface: calc((var(--border-radius-base) + var(--border-radius-step) * 4) * 1em);
  --radius-full: var(--border-radius-pill);
  --shadow-surface:
    0 var(--shadow-offset-step) calc(var(--shadow-blur-step) * 3) oklch(0% 0 0deg / calc(var(--shadow-alpha-base) + var(--shadow-alpha-step)));
  --shadow-overlay:
    0 calc(var(--shadow-offset-step) * 10) calc(var(--shadow-blur-step) * 15) calc(var(--shadow-offset-step) * -3)
    oklch(0% 0 0deg / calc(var(--shadow-alpha-base) + var(--shadow-alpha-step)));
  --layer-overlay: calc(var(--z-index-base) + var(--z-index-step) * 5);

  // Motion.
  --duration-interaction: var(--duration-base);
  --duration-surface: calc(var(--duration-base) * var(--duration-ratio));
  --duration-reveal: calc(var(--duration-base) * var(--duration-ratio) * var(--duration-ratio) * var(--duration-ratio));
  --easing: var(--ease-out);
  --easing-ambient: var(--ease-in-out);
}
```

## Property defaults

One per CSS property a component may list in `cssProperties`. The generator finds the default for a component property by its name: `padding-inline` → `--padding-inline`.

Properties that recipes build on (`transform`, `box-shadow`, `filter`) default to **identity values**. Then a recipe can append to them (`var(L4) scale(0.98)`) without breaking on `none`.

```scss
:root {
  --background: var(--color-surface);
  --color: var(--color-text);
  --border-color: var(--color-border);
  --border-width: var(--border-width-base);
  --border-radius: var(--radius-control);
  --outline-color: var(--color-clear);
  --outline-width: calc(var(--border-width-base) * 2);
  --outline-offset: calc(var(--border-width-base) * 2);
  --padding: calc(var(--space) * 4);
  --padding-block: calc(var(--space) * 2);
  --padding-inline: calc(var(--space) * 4);
  --gap: calc(var(--space) * 2);
  --min-block-size: calc(var(--space) * 9);
  // --font-family is already defined under Meanings and doubles as the default
  --font-size: var(--font-size-body);
  --font-weight: var(--font-weight-body);
  --line-height: var(--line-height-body);
  --box-shadow: 0 0 0 0 transparent;          // identity
  --transform: translate(0);                  // identity
  --filter: brightness(1);                    // identity
  --opacity: var(--opacity-base);
  --transition-duration: var(--duration-interaction);
  --transition-timing-function: var(--easing);
}
```

Where a meaning and a property default would share a name (`--font-family`), there is only one token.

## Variant tones

Each variant has a **tone** (fill) and an **ink** (text on that fill). Variants with meaning also have a **surface** (tinted well) and **surface ink**.

```scss
:root {
  --tone-primary: var(--color-accent);
  --tone-primary-ink: var(--color-on-accent);
  --tone-secondary: color-mix(in oklch, var(--color-text) 8%, transparent);
  --tone-secondary-ink: var(--color-text);
  --tone-tertiary: transparent;
  --tone-tertiary-ink: var(--color-text);

  --tone-positive: var(--color-green);
  --tone-warning: var(--color-amber);
  --tone-danger: var(--color-red);
  --tone-informational: var(--color-blue);
  // ink on each status tone: same contrast switch as --color-on-accent
  --tone-positive-ink: oklch(from var(--tone-positive) clamp(18%, calc((0.6 - l) * 1000%), 92%) 0.01 h);
  // … one per status variant

  --tint: calc(var(--tint-base) + var(--tint-step));
  --tone-positive-surface: color-mix(in oklab, var(--tone-positive) var(--tint), var(--color-base));
  --tone-positive-surface-ink: color-mix(in oklab, var(--tone-positive) 45%, var(--color-text));
  // … one pair per status variant
}
```

Status surfaces mix in `oklab`, not `oklch`, because a polar mix rotates green and red towards the base hue.

## Interaction parameters

```scss
:root {
  --interaction: var(--color-white);          // dark theme mixes toward white
  --mix-hover: var(--mix-base);
  --mix-highlighted: calc(var(--mix-base) - var(--mix-step));
  --mix-open: var(--mix-base);
  --scale-active: calc(1 - var(--scale-step));
  --scale-pressed: calc(1 - var(--scale-step));
  --opacity-disabled: calc(var(--opacity-base) - var(--opacity-step) * 2);
  --opacity-loading: calc(var(--opacity-base) - var(--opacity-step));
  --ring: var(--color-ring);
  --selection: var(--color-accent);
  --selection-ink: var(--color-on-accent);
  --invalid: var(--tone-danger);
  --mix-invalid: 85%;
}
```

## Themes

`[data-palette=""]` is used as the attribute selector, but `--color-accent` is actually what it changes. This is because palette changes more than one color, accent is only one color.

Dark is the default. The light theme overrides only what changes:

```scss
@mixin light {
  color-scheme: light;
  --color-accent: oklch(from var(--color-palette) calc(l + var(--lift-light)) calc(c * var(--chroma-ratio-light)) h);
  --color-base: oklch(from var(--color-accent) var(--lightness-light) 0.01 h);
  --tint: var(--tint-base);
  --interaction: var(--color-black);          // light theme mixes toward black
}

@media (prefers-color-scheme: light) { :root:not([data-theme="dark"]) { @include light; } }
:root[data-theme="light"] { @include light; }
```

## Palettes

A palette replaces the prima. Everything else follows.

```scss
$palettes: sumi, matcha, sakura, aizome;
@each $p in $palettes {
  :root[data-palette="#{$p}"] { --color-palette: var(--color-#{$p}); }
}
```

| Palette | | Character |
| --- | --- | --- |
| Sumi (default) | 墨 | Ink black, as in calligraphy |
| Matcha | 抹茶 | Fresh, balanced green |
| Sakura | 桜 | Delicate, warm pink |
| Aizome | 藍染 | Refined indigo blue |

A custom accent is an inline `--color-accent` on `<html>`. It overrides the palette in both themes.
