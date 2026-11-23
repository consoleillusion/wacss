= Primitive and semantic tokens
<foundations>
L1 and L2 are the only tokens written by hand. They live in three SCSS
files, each of which declares its tokens on `:root`.

== Primitives
<foundations:primitives>
`primitives.scss` holds literals only. A scale is recorded as a base and a
step or ratio (`--space-step: 0.25`, `--font-size-ratio: 1.2`), never as a
series of sizes; L2 calculates the points it needs. Steps that will be
applied in both `em` and `rem` are unitless. Units appear only where the
quantity is physical, such as `px` for hairlines and `ms` for durations.

Primitives also hold every colour of every theme. Each mode of each theme
contributes eight tokens, named `--<theme>-<mode>-<role>`, where the role
is `base`, `surface`, `accent`, `pop`, `positive`, `warning`, `danger` or
`informational`. What each colour is for is described in
#link(<themes>)[themes].

== Semantic tokens
<foundations:semantic>
`semantic.scss` gives primitives meaning. Its tokens fall into four
groups.

#table(
  columns: 2,
  [Group], [Contents],
  [Meanings], [Named design values: colours (`--color-text`, `--color-border`), space (`--space`, `--space-page`), type (`--font-size-heading`), shape (`--radius-control`), depth (`--shadow-overlay`) and motion (`--duration-interaction`, `--easing`).],
  [Property defaults], [One token per CSS property a component may make themable, named after the property: `--background`, `--padding-inline`, `--transition-duration`. A component's default variant takes its values from these. `transform`, `box-shadow` and `filter` default to values that change nothing, so that states can add to them.],
  [Variant tones], [For every variant except the default, a fill `--tone-<variant>` and the text that sits on it, `--tone-<variant>-ink`. The status variants also have tinted surfaces, `--tone-<variant>-surface` and `--tone-<variant>-surface-ink`.],
  [Interaction amounts], [The quantities channels are built from: `--interaction` (the colour a hover mixes toward), `--mix-hover`, `--scale-active`, `--opacity-disabled`, `--ring`.],
)

`channel.scss` holds the channel tokens; they are described in
#link(<channels>)[channels].

== Choosing a theme and a mode
<foundations:switching>
The theme and mode are attributes of the `html` element:

```html
<html data-palette="shu" data-theme="light">
```

`semantic.scss` implements the choice in two steps, using two SCSS
mixins.

+ #strong[Theme.] The `palette` mixin points sixteen slot tokens,
  `--palette-<mode>-<role>`, at one theme's primitives. It is applied to
  `:root` for the default theme (Kinari) and to
  `:root[data-palette="<theme>"]` for each theme.
+ #strong[Mode.] The `theme` mixin points the colour meanings
  (`--color-base`, `--color-surface`, `--color-accent`, `--color-pop` and
  the four `--color-<status>` tokens) at one mode's slots, and sets
  `--lightness-text`. Dark is applied to `:root`. Light is applied by a
  `light` mixin, which also sets `color-scheme: light`, makes `--tint`
  10% and points `--interaction` at black; it is applied to
  `:root[data-theme="light"]` and, inside a `prefers-color-scheme: light`
  query, to `:root:not([data-theme="dark"])`.

Every other colour meaning is an expression over these, so it follows
automatically. Because every generated token is declared on `:root`,
changing either attribute restyles the whole page.
