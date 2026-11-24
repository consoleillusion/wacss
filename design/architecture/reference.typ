#import "../data.typ": tokens

= Token reference
<reference>
Every L1 and L2 token, with its value as its source declares it. The
chapters describe what the tokens are for and refer here for their values;
the tables are written from `dist/tokens.json` as the book compiles, so
they are always the stylesheet's own. A value that refers to another
token, `var(--x)`, is shown as written. The colors of each palette are in
#link(<palettes>)[the Palettes chapter].

#let level-table(group) = table(
  columns: (auto, 1fr),
  [Token], [Value],
  ..tokens.filter(t => t.group == group).map(t => (raw(t.name), raw(t.value))).flatten(),
)

== Primitive tokens (L1)
<reference:primitives>
From `src/styles/primitives.scss`; the hues from `src/styles/palettes.dhall`.

#level-table("primitives")

== Semantic tokens (L2)
<reference:semantic>
From `src/styles/semantic.scss`; the colors of each mode from
`src/styles/palettes.dhall`. The values are those of the dark mode, which
is the default; the light mode changes the colors in use and the tokens
the `mode` and `light` mixins set (#link(<foundations:switching>)[choosing a palette and a mode]).

#level-table("semantic")

== Channel tokens (L2)
<reference:channels>
From `src/styles/channel.scss` (#link(<channels>)[channels]).

#level-table("channel")
