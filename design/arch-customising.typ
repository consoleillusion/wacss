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
  --shu-light-pop: #6e1a10;          /* one colour of one theme mode */
  --radius-control: 0.25em;          /* round the corners of controls */
  --hover-background-amount: 4%;     /* a gentler hover everywhere */
  --duration-interaction: 120ms;     /* quicker feedback */
}
```

The same declarations can be placed in a `[data-palette="…"]` or
`[data-theme="…"]` block to apply only to one theme or one mode.

#table(
  columns: 2,
  [To change], [Redeclare],
  [One colour of one theme's mode], [Its primitive, `--<theme>-<mode>-<role>`],
  [How a colour is derived, in every theme], [The L2 meaning, such as `--color-border` or `--color-text-muted`],
  [Spacing, type, radii, shadows or timing everywhere], [The L1 step or base, or the L2 meaning built from it],
  [The default value of one CSS property for every component], [Its L2 property default, `--<property>`],
  [The fill or text colour of a variant everywhere], [`--tone-<variant>` or `--tone-<variant>-ink`],
  [What a state does everywhere], [Its channel token, `--<state>-<property>`],
)

== Changing what a state affects
<customising:channels>
To make a state change an additional property, add a channel token for
it to `channel.scss`: for example `--focus-box-shadow` to give focus a
glow as well as a ring. Every component that declares both the state and
the property then receives it. Regenerate; the build will refuse the
change if the property is already in the channel of another state that a
component declares (#link(<channels:rules>)[channels]).

== Adding a theme
<customising:theme>
+ Add sixteen primitives to `primitives.scss`: the eight roles for
  `--<theme>-light-…` and the eight for `--<theme>-dark-…`.
+ Add the theme's name to `$palettes` in `semantic.scss`.
+ Add it to the theme selector in `src/demo/Layout.astro`, to `PALETTES`
  in `scripts/theme-swatches.ts`, and to the list of themes in
  `design/themes.typ`.
+ Run `bun run theme-swatches` and confirm that every text pairing meets
  WCAG 2.2 AA.

The theme is then selected with `data-palette="<theme>"`.

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
  class on its root element, omitting it for the default variant. If an
  inner element needs its own styling, give it a part with its own folder
  and schema.
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
A component gains one of the seven variants by listing it in its schema;
every tone it needs already exists. A new variant name needs its tones,
`--tone-<variant>` and `--tone-<variant>-ink`, added to `semantic.scss`
before any component can use it.
