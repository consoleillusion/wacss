= Customising wacss
<customising>
wacss is customised by changing hand-written tokens and schemas. Nothing
generated is ever edited, and no page adds selectors of its own. This
chapter lists every supported change, from the smallest to the largest.

== Which tokens to change
<customising:which>
Only L1 and L2 tokens are meant to be changed from outside the library.
L3 and L4 names are generated, and the planned minified stylesheet will
shorten them (#link(<build:planned>)[planned]). A product therefore never
refers to a component token; it changes what component tokens are made
from.

== Changing a value at runtime
<customising:runtime>
Any L1 or L2 token can be redeclared in a product's own CSS. Because
wacss's rules are in cascade layers and its tokens are plain declarations
on `:root`, an unlayered `:root` block that comes later wins:

```css
:root {
  --shu-light-pop: oklch(32% 0.11 32); /* one colour of one palette's mode */
  --border-radius: 0.25em;           /* round every corner */
  --hover-background-amount: 4%;     /* a gentler hover everywhere */
  --duration-interaction: 120ms;     /* quicker feedback */
}
```

The same declarations can be placed in a `[data-palette="…"]` or
`[data-mode="…"]` block to apply only to one palette or one mode.

#table(
  columns: 2,
  [To change], [Redeclare],
  [One colour of one palette's mode], [Its primitive, `--<palette>-<mode>-<role>`],
  [How a colour is derived, in every palette], [The L2 meaning, such as `--color-border` or `--color-text-muted`],
  [Spacing, type, radii, shadows or timing everywhere], [The L1 step or base, or the L2 meaning built from it],
  [The default value of one non-colour property for every component], [Its L2 property default, `--<property>`],
  [A colour property in one role, for every component], [`--background-<role>`, `--color-<role>` or `--border-color-<role>`],
  [What a state does everywhere], [Its channel token, `--<state>-<property>`],
)

== Changing what a state affects
<customising:channels>
To make a state change an additional property, add a channel token for
it to `channel.scss`: for example `--focus-box-shadow` to give focus a
glow as well as a ring. Every component that declares both the state and
the property then receives it. Regenerate.

== Adding a palette
<customising:palette>
+ Add sixteen primitives to `primitives.scss`: the eight roles for
  `--<palette>-light-…` and the eight for `--<palette>-dark-…`. Choose the
  accent, pop and status colours; write the base and surface with the same
  relative-colour expression as the other palettes, from the new accent.
+ Add the palette's name to `$palettes` in `semantic.scss`.
+ Add it to the palette selector in `src/demo/Layout.astro`, to `PALETTES`
  in `scripts/palette-swatches.ts`, and to the list of palettes in
  `design/aesthetics/palettes.typ`.
+ Run `bun run palette-swatches` and confirm that every text pairing meets
  WCAG 2.2 AA.

The palette is then selected with `data-palette="<palette>"`.

== Adding a component
<customising:component>
+ Create `src/components/<Name>/` and write `schema.dhall`
  (#link(<schema:fields>)[fields]). Choose its variants and states from
  the vocabularies, list its themable and structural properties, and
  describe its arguments.
+ Make sure every themable property has an L2 default. If a property is
  new to the library, add `--<property>` to the property defaults in
  `semantic.scss`.
+ Write the component: a Svelte wrapper around bits-ui if it needs
  behaviour, or an Astro file if it is structure only. Put the variant
  class on its root element, omitting it for the default variant. Any
  other component it shows is passed to it as data, `{ component, data }`,
  and loaded by title (#link(<schema:children>)[children]); inner elements
  that are not components are plain HTML, arranged with layout helpers.
+ Run `bun run generate:tokens`. Fix anything the checks report.

== Adding a state
<customising:state>
States are a closed vocabulary, because each needs a selector. To add
one, add its name and selector to `STATE_SELECTORS` in
`src/lib/generateTokens.ts` (its position there is its rule order), add
at least one channel token for it to `channel.scss`, and list it in the
schemas of the components that support it.

== Adding a variant
<customising:variant>
A component gains one of the seven variants by listing it in its schema
with a colour role. A new variant name is added to the vocabulary, the
`VARIANTS` list in `scripts/generate-tokens.ts`; a new role needs its
`--background-<role>`, `--color-<role>` and `--border-color-<role>`
tokens in `semantic.scss`.
