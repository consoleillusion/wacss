= Primitive and semantic tokens
<foundations>
L1 and L2 are the only tokens written by hand. They live in three SCSS
files, each of which declares its tokens on `:root`.

== Primitives
<foundations:primitives>
`primitives.scss` holds literals, and the few colours defined from other
primitives. A scale is recorded as a base and a
step or ratio (`--space-step: 0.25`, `--font-size-ratio: 1.2`), never as a
series of sizes; L2 calculates the points it needs. Steps that will be
applied in both `em` and `rem` are unitless. Units appear only where the
quantity is physical, such as `px` for hairlines and `ms` for durations.

Primitives also hold every colour of every palette. Each mode of each palette
contributes eight tokens, named `--<palette>-<mode>-<role>`, where the role
is `base`, `surface`, `accent`, `pop`, `positive`, `warning`, `danger` or
`informational`. Six are literals; the base and surface are computed from
the accent with CSS relative colour, using lightness and chroma
primitives that all palettes share (#link(<palettes:derived>)[palettes]).

== Semantic tokens
<foundations:semantic>
`semantic.scss` gives primitives meaning. Its tokens fall into five
groups.

#table(
  columns: 2,
  [Group], [Contents],
  [Meanings], [Named design values: the palette's colours in effect (`--palette-base`, `--palette-surface`, `--palette-accent`, `--palette-pop` and the four `--palette-<status>`), colours derived from them (`--color-text`, `--color-on-accent`), the hairline `--color-border`, a translucent neutral grey from the L1 `--hairline` that reads on every palette in either mode, space (`--space`, `--space-page`), type (`--font-size-heading`), depth (`--shadow-overlay`) and motion (`--duration-interaction`, `--easing`).],
  [Colour roles], [For each colour property and each role, the colour that property takes: `--background-<role>`, `--color-<role>` (the text on it) and `--border-color-<role>`. The roles are `base`, `surface`, `accent`, `pop`, `clear`, the four statuses, and `map`, which colours a map: its sea (`--color-map`) and its land (`--fill-map`). At rest the sea lies on the scale from the palette's base to its surface and the land is a blue-grey; in the hover state each takes only a hue, mixed in oklch: `--map-tone`, halfway from the palette's accent to its pop, mixed with the L1 primitives `--map-sea`, a teal, for the sea and `--map-land`, a yellow-green, for the land, the palette's share being `--map-tone-share` (25%), so every palette tints its globe while the sea stays blue and the land green. Chroma comes from L1, `--map-sea-chroma` (0.09) and `--map-land-chroma` (0.12), and lightness from L1 for each mode, lighter in light mode and darker in dark: `--map-sea-lightness-light` and `-dark` (0.72 and 0.5) and `--map-land-lightness-light` and `-dark` (0.88 and 0.68) (#link(<channels:role-states>)[a role's own colour for a state]). While alive it also glows with its atmosphere, `--atmosphere`: the sea's hue at `--atmosphere-lightness` and `--atmosphere-chroma` (0.85 and 0.06), spread over `--atmosphere-size`, 0.6rem in light mode and 0.45rem in dark. The glow is a `drop-shadow`; the resting `--filter` is a transparent one written in oklab, so the glow fades in with its own colour. On `base`, `surface` and `clear`, text is `--color-text`; on the filled roles it is `--color-on-accent`, the base. Borders are the hairline `--color-border` on `base` and `surface`, transparent on `clear`, and the fill itself on filled roles. Each status also has a tinted pair, `--background-<status>-tint` and `--color-<status>-tint`. Native controls take `--accent-color-<role>` (the role's fill, or the accent on `base`, `surface` and `clear`) and links `--text-decoration-color-<role>` (the hairline on the page's colours, the text on fills).],
  [Chart colours], [The colours a chart gives its series, in order: `--chart-1` to `--chart-6`, the palette's accent, informational, positive, warning, danger and pop, so every palette draws its charts in its own colours. The charts are drawn by LayerChart, which reads its own variables; wacss sets them from its tokens: `--color-primary` is `--chart-1`, `--color-surface-content` (axis labels and legend text) is `--color-text`, and `--color-surface-100`, `-200` and `-300` (the tooltip, the plot behind it and the grid lines) are the palette's surface, its base and the hairline `--color-border`.],
  [Property defaults], [One token per non-colour CSS property a component may make themable, named after the property: `--padding-inline`, `--transition-duration`. A component's default variant takes its values from these. `transform`, `box-shadow` and `filter` default to values that change nothing, so that states can add to them.],
  [Interaction amounts], [The quantities channels are built from: `--interaction` (the colour a hover mixes toward), `--mix-hover`, `--scale-active`, `--opacity-disabled`, `--ring`.],
)

`channel.scss` holds the channel tokens; they are described in
#link(<channels>)[channels].

== Choosing a palette and a mode
<foundations:switching>
The palette and mode are attributes of the `html` element:

```html
<html data-palette="shu" data-mode="light">
```

`semantic.scss` implements the choice in two steps, using two SCSS
mixins.

+ #strong[Palette.] The `palette` mixin points sixteen slot tokens,
  `--palette-<mode>-<role>`, at one palette's primitives. It is applied to
  `:root` for the default palette (Kinari) and to
  `:root[data-palette="<palette>"]` for each palette.
+ #strong[Mode.] The `mode` mixin points the colour meanings
  (`--palette-base`, `--palette-surface`, `--palette-accent`, `--palette-pop` and
  the four `--palette-<status>` tokens) at one mode's slots, and sets
  `--lightness-text`. Dark is applied to `:root`. Light is applied by a
  `light` mixin, which also sets `color-scheme: light`, makes `--tint`
  10% and points `--interaction` at black; it is applied to
  `:root[data-mode="light"]` and, inside a `prefers-color-scheme: light`
  query, to `:root:not([data-mode="dark"])`.

Every other colour meaning is an expression over these, so it follows
automatically. Because every generated token is declared on `:root`,
changing either attribute restyles the whole page.
