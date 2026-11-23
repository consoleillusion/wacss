= Overview
<overview>
This part specifies wacss precisely enough to implement, extend or
customise it. It covers the hand-written sources, the rules the generator
follows, the stylesheet it writes and the supported ways to change the
result.

== Sources and outputs
<overview:sources>
#table(
  columns: 3,
  [File], [Holds], [Written by],
  [`src/styles/primitives.scss`], [L1 primitive tokens, including every palette's colours], [hand],
  [`src/styles/semantic.scss`], [L2 semantic tokens and the palette and mode switching], [hand],
  [`src/styles/channel.scss`], [L2 channel tokens: what each state does], [hand],
  [`src/styles/helpers.scss`], [The reset, layout helpers and the reduced-motion rule], [hand],
  [`src/components/<Name>/schema.dhall`], [One component's contract], [hand],
  [`src/components/<Name>/<Name>.svelte` or `.astro`], [The component itself], [hand],
  [`src/lib/generateTokens.ts`], [The generator], [hand],
  [`scripts/generate-tokens.ts`], [The build that runs it], [hand],
  [`dist/wacss.css`], [The complete stylesheet], [generated],
  [`dist/tokens.css`], [Every token on `:root`], [generated],
  [`dist/tokens.json`], [Every token with its references, and each component's metadata], [generated],
)

The hand-written styles are SCSS; what is built and distributed is CSS.
Generated files begin with a comment saying so and are never edited.

== From a decision to a pixel
<overview:flow>
A value passes through four levels. A primitive (L1) records a raw
choice, such as a palette's accent colour. A semantic token (L2) gives it a
meaning, such as "the fill of a primary control". A component token (L3)
applies that meaning to one property of one variant of one component. A
state token (L4) adjusts a component token for one state. The generated
CSS reads only L4 tokens, including each property's `static` token. The next chapter defines the levels; the
chapters after it define how each generated level is computed.

== The build
<overview:build>
`bun run generate:tokens` compiles the four SCSS sources, reads their
tokens, loads every component schema, generates every component's tokens
and CSS, and writes `dist/`. It stops, naming the component and the
problem, only where the CSS it would write would be broken
(#link(<schema:checks>)[checks]). It enforces no other rule, and wacss has
no test suite: what the library should do is stated in this book, and is
verified by looking at the demo site. The complete
procedure is specified in #link(<generation>)[generation] and
#link(<stylesheet>)[the stylesheet].
