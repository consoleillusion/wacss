= Variants
<variants>
A variant is a role a component can play. Each variant has its own set of
component tokens, named with the variant after the component:
`--button-primary-background`.

== The vocabulary
<variants:vocabulary>
#table(
  columns: 2,
  [Variant], [Role],
  [`secondary`], [The ordinary appearance. The default; every component has it.],
  [`primary`], [The main action or emphasis in a region],
  [`tertiary`], [The least emphasis; reads like text],
  [`positive`], [Success or confirmation],
  [`warning`], [Caution; a risk that can be undone],
  [`danger`], [Destructive or failed],
  [`informational`], [A neutral notice],
)

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
Each property is classified by name:

#table(
  columns: 2,
  [Type], [Properties],
  [fill], [`background`, `background-color`, `accent-color`, `fill`],
  [ink], [`color`, `caret-color`, `stroke`],
  [edge], [`border-color`, `text-decoration-color`, `column-rule-color`],
  [other], [every other property, including `outline-color`],
)

Every variant a component lists is given a colour role in its schema
(#link(<schema:fields>)[fields]): `accent`, `surface`, `pop`, `clear`,
`base`, or a status. The L3 token for component `c`, variant `v` with role
`r`, and property `p` is then:

#table(
  columns: 2,
  [Case], [L3 value],
  [`p` is a fill, an ink or an edge], [`var(--p-r)`, the role's colour for that property],
  [`v` is `secondary`], [`var(--p)`, the L2 property default],
  [`p` is anything else], [`var(--c-secondary-p)`, the default variant's value],
)

So a component's variants differ only in their colours, and the role
decides which. The same variant name can take different roles in
different components: Button's `secondary` is `accent`, so a secondary
button is filled with the accent, while Card's `secondary` is `surface`.
A component's tokens are its own, so a button inside a card keeps its
own colours whatever the card's are. `outline-color` is classed as "other"
because the outline belongs to the focus channel, not to the variant.
