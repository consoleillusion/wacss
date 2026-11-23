= The stylesheet
<stylesheet>
The CSS that applies tokens is generated from each component's schema. It
contains only references to that component's own L3 and L4 tokens and the
schema's structural literals.

== Selectors
<stylesheet:selectors>
#table(
  columns: 4,
  [], [Element component], [Class component], [Example],
  [Base], [`:where(<elements>)`], [`.<name>`], [`:where(button, a[data-button-root])`, `.card`],
  [Variant], [base + `:where(.<variant>)`], [base + `.<variant>`], [`:where(button, …):where(.primary)`, `.card.primary`],
  [State], [variant + `:where(<state selector>)`], [same], [`.card.primary:where(:hover)`],
  [Pseudo-element], [any of the above + `::<pseudo>`], [same], [`.accordion-trigger:where([data-state="open"])::after`],
)

The default variant uses the base selector, and `static` has no state
selector. Element rules therefore have zero specificity and act only as
defaults; class rules have the specificity of one or two classes.

== Rules
<stylesheet:rules>
For each target of a component, and for each variant in schema order:

+ #strong[Base rule.] Select the variant (plus the pseudo-element, if the
  target is one). Declare, for the default variant only, the target's
  `static` structural literals; then, for every variant, each themable
  property as `var(` its L3 token `)`.
+ #strong[State rules.] For each state the schema declares, in vocabulary
  order, skipping `static`: select the variant with the state selector
  (plus the pseudo-element). Declare, for the default variant only, the
  structural literals listed under that state; then each property the
  state changes on this target as `var(` its L4 token `)`.

A rule with no declarations is not written. Structural literals are
written once, on the default variant's rules, because every other
variant's selector also matches those rules and structure does not vary by
variant.

The result for Card's background and shadow:

```css
.card { display: grid; …; background: var(--card-secondary-background); box-shadow: var(--card-secondary-box-shadow); }
.card:where(:hover) { background: var(--card-secondary-background-hover); box-shadow: var(--card-secondary-box-shadow-hover); }
.card.primary { background: var(--card-primary-background); box-shadow: var(--card-primary-box-shadow); }
.card.primary:where(:hover) { background: var(--card-primary-background-hover); box-shadow: var(--card-primary-box-shadow-hover); }
```

Within one specificity, later rules win. Because a variant's base rule
comes after the default variant's state rules, a primary card's own values
replace the default hover values, and its own hover rule then follows.

== Cascade layers
<stylesheet:layers>
```css
@layer wacss.reset, wacss.elements, wacss.components, wacss.layout;
```

#table(
  columns: 2,
  [Layer], [Contents],
  [`wacss.reset`], [The reset and the reduced-motion rule (#link(<helpers>)[helpers])],
  [`wacss.elements`], [The rules of every element component],
  [`wacss.components`], [The rules of every class component],
  [`wacss.layout`], [The layout helpers],
)

Tokens are declared outside any layer, on `:root`. A class component
outranks an element component regardless of specificity; a layout helper
outranks both; and any CSS a product writes outside a layer outranks all
of wacss.

== The assembled file
<stylesheet:assembly>
`dist/wacss.css` contains, in order: the layer statement above; the
compiled primitives, semantic tokens and channel tokens; one `:root` block
of every L3 token; one `:root` block of every L4 token; the compiled
helpers; the `wacss.elements` layer; and the `wacss.components` layer.
Within each layer, components appear in alphabetical order of folder name.
