#import "../data.typ": vocabulary, listed

= Variants
<variants>
A variant is a role a component can play. Each variant has its own set of
component tokens, named with the variant after the component:
`--button-primary-background`.

== The vocabulary
<variants:vocabulary>
#table(
  columns: 2,
  [Variant], [For],
  ..vocabulary.variants.map(v => (raw(v.name), v.meaning)).flatten(),
)

The variants are defined, in this order, in `src/components/vocabulary.dhall`; the
first is the default.

A component lists the variants that make sense for it. Variants express
role and emphasis; visual treatments such as "outline" or "ghost" are not
variants.

== In markup
<variants:markup>
The default variant has no class. Every other variant is a class on the
component's root element, and is only ever styled together with the
component:

```html
<button>Save</button>
<button class="primary">Publish</button>
<article class="card primary">…</article>
```

== Computing a variant's tokens
<variants:recipes>
The color properties are those whose values come from a variant's color
role, listed in `src/components/vocabulary.dhall`:
#listed(vocabulary.colorProperties.map(raw)). Every other property,
including `outline-color`, which belongs to the focus channel, is not.

Every variant a component lists is given a color role in its schema
(#link(<schema:fields>)[fields]): `accent`, `surface`, `pop`, `clear`,
`base`, `map`, an intent color, or an intent color's tint
(`positive-tint`). The L3 token for component `c`, variant `v` with role
`r`, and property `p` is then:

#table(
  columns: 2,
  [Case], [L3 value],
  [`p` is a color property], [The value role `r` gives `p` in `vocabulary.dhall`; for `color`, when the role gives none, the inverse of the variant's background (#link(<foundations:color>)[the color hierarchy])],
  [`v` is `secondary`], [The schema's `values` entry for `p`, if it has one, such as `var(--font-size-heading)`; otherwise `var(--p)`, the L2 property default],
  [`p` is anything else], [`var(--c-secondary-p)`, the default variant's value],
)

So a component's variants differ only in their colors, and the role
decides which. The same variant name can take different roles in
different components: Button's `secondary` is `accent`, so a secondary
button is filled with the accent, while Card's `secondary` is `surface`.
A component's tokens are its own, so a button inside a card keeps its
own colors whatever the card's are. 
