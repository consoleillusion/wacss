#import "../data.typ": vocabulary

= Primitive and semantic tokens
<foundations>
L1 and L2 are the only tokens written by hand. They live in three SCSS
files, each of which declares its tokens on `:root`.

== Primitives
<foundations:primitives>
`primitives.scss` holds literals, and the few colors defined from other
primitives. A scale is recorded as a base and a
step or ratio (`--space-step: 0.25`, `--font-size-ratio: 1.2`), never as a
series of sizes; L2 calculates the points it needs. Steps that will be
applied in both `em` and `rem` are unitless. Units appear only where the
quantity is physical, such as `px` for hairlines and `ms` for durations.

Primitives also hold the hues, the only color values in L1: one for each
palette, `--hue-<palette>`, and one for each intent color,
`--hue-<intent>`. They are not written by hand but come from the color
configuration (#link(<foundations:color>)[the color hierarchy]).

== The color hierarchy
<foundations:color>
Color is configured at the top, in one file, `src/styles/palettes.dhall`,
and flows down the levels. Nothing else holds a color value.

+ #strong[Configuration.] `palettes.dhall` lists the palettes, each a name,
  its name in Japanese, a hue and a description, the first the default; the
  decor colors every palette has (base, surface, accent, pop), each with its
  use, its turn of the palette's hue, and its lightness and chroma in each
  mode; and the intent colors (positive, warning, danger, informational),
  each with its hue and use, and one lightness and chroma for them all in
  each mode. The token generator checks it and writes it to
  `src/styles/_palettes.scss` as Sass maps, which the primitives and
  the semantic tokens read; the book writes its Palettes chapter from it
  (#link(<palettes>)[palettes]), and the demo lists its palettes from it.
+ #strong[L1.] `--hue-<palette>` for each palette and `--hue-<intent>`
  for each intent color.
+ #strong[L2, the prima.] `--hue-accent`, the hue of the palette in
  effect. It is the only token that knows which palette that is
  (#link(<foundations:switching>)[choosing a palette]).
+ #strong[L2, the colors of each mode.] For each color and mode,
  `--color-<color>-<mode>`: `oklch(<lightness> <chroma> <hue>)`, where the
  lightness and chroma are the configured values, written as literals, and
  the hue is `var(--hue-accent)` for the decor colors, turned by
  `calc(var(--hue-accent) + <turn>)` when the turn is not 0, and
  `var(--hue-<intent>)` for the intent colors.
+ #strong[L2, the colors in use.] `--color-<color>`, which the mode
  points at `--color-<color>-dark` or `--color-<color>-light`.
+ #strong[Everything else] refers to `--color-<color>`: the colors
  derived from them (`--color-ring`, `--selection`), the tints, the
  charts, and the component tokens, through the color roles.

Color reaches a component through its variants' roles
(#link(<schema:fields>)[schema]). The roles are defined in
`src/components/vocabulary.dhall`: each gives the value each color property
takes (`background` and `accent-color`, and on a map `color` and `fill`),
written in terms of `--color-<color>`, and the generator writes it as the variant's L3 token,
such as `--button-secondary-background: var(--color-accent)`. There are no
tokens between `--color-<color>` and the component's own. A role may also
give a property's value in a state, as the map role does for hover. Each
intent color also has a tint role, such as `danger-tint`, whose background
is the intent color's tint, `--color-<intent>-tint`: a Notice or a Badge
marking something wrong uses it, so the text made from its background is
near the page's own and readable in both modes. A part of a component may
name its own role, whatever the variant's (#link(<generation:targets>)[targets]).

Text and borders are not palette colors, and no token above a component
holds them: a text color depends on what the text sits on, which only the
component knows. A component makes its text, underline and border from its
own background, by the templates under `derived` in `vocabulary.dhall`:

- `color`: #raw(vocabulary.derived.color), the background's
  lightness inverted, with its chroma and hue;
- `text-decoration-color`: #raw(vocabulary.derived.at("text-decoration-color")), the text;
- `border-color`: #raw(vocabulary.derived.at("border-color")),
  the background moved part of the way toward its inverse.

The background is the variant's own background token when it has one, such
as `--card-secondary-color: oklch(from var(--card-secondary-background) calc(1 - l) c h)`,
and the role's background otherwise. A role whose background is transparent,
`clear`, names the color it reads against instead, `text-on`: the base; it
gives `border-color: transparent` itself. A role may give its own value for
any of these, which takes precedence over the template.

The webpage is a component, Page, whose element is `body` and whose role is
`base`; text outside any other component is the page's text. A component
without a text color of its own inherits the text of the component it is
in. Where an L2 token stands for text (a syntax color, a chart's labels),
it is `currentColor` or mixed from it, the text of the
component it is used in, never a color of its own. The same inverse
makes the text of selected text from the pop, and of a pressed control
from the accent. The contrast the text template gives on each fill is
measured in #link(<palettes:legibility>)[legibility].

== Semantic tokens
<foundations:semantic>
`semantic.scss` gives primitives meaning. Its tokens fall into these
groups.

#table(
  columns: 2,
  [Group], [Contents],
  [Colors], [The prima, `--hue-accent`; each color in each mode, `--color-<color>-<mode>`; and each color in use, `--color-<color>` (#link(<foundations:color>)[the color hierarchy]).],
  [Meanings], [Named design values: colors derived from the colors in use (`--color-ring`, and each intent color's tint, `--color-<intent>-tint`, the intent color washed into the base by `--tint`), space (`--space`, `--space-page`), type (`--font-size-heading`), depth (`--shadow-overlay`) and motion (`--duration-interaction`, `--easing`).],
  [Map colors], [A map's sea and land, which the `map` role gives a component's `color` and `fill`: `--color-sea` and `--color-land` at rest, `--color-sea-hover` and `--color-land-hover` under the pointer. At rest the sea lies on the scale from the base to the surface and the land is a blue-grey. Under the pointer each takes only a hue, mixed in oklch: `--map-tone`, halfway from the accent to the pop, mixed with the L1 primitive `--map-sea`, a teal, for the sea and `--map-land`, a yellow-green, for the land, the palette's share being `--map-tone-share`; so every palette tints its globe while the sea stays blue and the land green. Their chroma is `--map-sea-chroma` and `--map-land-chroma`, and their lightness `--map-sea-lightness` and `--map-land-lightness` for each mode, so a globe is neither dark in light mode nor glaring in dark. While alive a globe also glows with its atmosphere, `--atmosphere`: the sea's hue at `--atmosphere-lightness` and `--atmosphere-chroma`, spread over `--atmosphere-size`. The glow is a `drop-shadow`; the resting `--filter` is a transparent one written in oklab, so the glow fades in with its own color. Their values are in the token reference (#link(<reference>)[token reference]).],
  [Chart colors], [The colors a chart gives its series, in order: `--chart-1` to `--chart-6`, the palette's accent and pop, then the intent colors, so every palette draws its charts in its own colors and its first two series in its decor. The charts are drawn by LayerChart, which reads its own variables; wacss sets them from its tokens: `--color-primary` is `--chart-1`, `--color-surface-content` (axis labels and legend text) is `currentColor`, the chart's own text, and `--color-surface-100`, `-200` and `-300` (the tooltip, the plot behind it and the grid lines) are the palette's surface, its base, and the chart's text faded.],
  [Property defaults], [One token per non-color CSS property a component may make themable, named after the property: `--padding-inline`, `--transition-duration`. A component's default variant takes its values from these. `transform`, `box-shadow` and `filter` default to values that change nothing, so that states can add to them.],
  [Interaction amounts], [The quantities channels are built from: `--interaction` (the color a hover mixes toward), `--mix-hover`, `--scale-active`, `--opacity-disabled`, `--ring`.],
)

`channel.scss` holds the channel tokens; they are described in
#link(<channels>)[channels].

== Choosing a palette and a mode
<foundations:switching>
The palette and mode are attributes of the `html` element:

```html
<html data-palette="sakura" data-mode="light">
```

`semantic.scss` implements the choice in two steps.

+ #strong[Palette.] The prima, `--hue-accent`, is the hue of the first
  palette in `palettes.dhall` on `:root`, and `--hue-<palette>` on
  `:root[data-palette="<palette>"]` for each palette. Nothing above L2
  knows which palette is in effect: every color is derived from the
  prima.
+ #strong[Mode.] The `mode` mixin points each color in use,
  `--color-<color>`, at that mode's `--color-<color>-<mode>`, and sets
  the map's lightness and the atmosphere's size for the mode. Dark is applied to `:root`. Light is applied by a
  `light` mixin, which also sets `color-scheme: light`, makes `--tint`
  `--tint-base` alone and points `--interaction` at black; it is applied to
  `:root[data-mode="light"]` and, inside a `prefers-color-scheme: light`
  query, to `:root:not([data-mode="dark"])`. The rule is on `:root`, not
  on any element with `data-mode`: the colors derived from the colors in
  use, such as `--color-ring`, are computed where they are declared, on
  `:root`, so a mode set on an inner element would change its colors but
  not what is derived from them.

Every other color meaning is an expression over these, so it follows
automatically. Because every generated token is declared on `:root`,
changing either attribute restyles the whole page.
