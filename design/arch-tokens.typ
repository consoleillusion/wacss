= The token hierarchy
<tokens>
Every value in wacss is a CSS custom property, and every custom property
belongs to one of four levels.

== Levels
<tokens:levels>
#table(
  columns: 4,
  [Level], [Name pattern], [Example], [Origin],
  [L1 primitive], [`--<name>`], [`--space-step`, `--shu-light-accent`], [hand-written],
  [L2 semantic], [`--<name>` or `--<property>`], [`--color-text`, `--padding-inline`], [hand-written],
  [L2 channel], [`--<state>-<property>`, with optional `-toward` and `-amount` suffixes], [`--focus-outline-color`], [hand-written],
  [L3 component], [`--<component>-<variant>-<property>`], [`--button-primary-background`], [generated],
  [L4 state], [`--<component>-<variant>-<property>-<state>`], [`--button-primary-background-hover`], [generated],
)

`<component>` is the component's name in kebab case (`AccordionTrigger`
becomes `accordion-trigger`). `<property>` is a CSS property name; for a
property of a pseudo-element it is prefixed with the pseudo-element's name
without colons, so `transform` on `::after` becomes `after-transform`.

== What exists at each generated level
<tokens:matrix>
A component has one L3 token for each pair of a variant it declares and a
themable property it declares. It has one L4 token for each combination
of a variant, a state it declares, and a property in that state's channel
(#link(<channels>)[channels]). A property outside a state's channel has no
L4 token for that state; the CSS rule for the state does not mention it,
so the L3 value continues to apply.

== References
<tokens:references>
A token may refer only to the levels listed below. Every reference is a
`var()` naming the referenced token.

#table(
  columns: 2,
  [Level], [May refer to],
  [L1], [nothing; it is a literal],
  [L2], [L1 and other L2 tokens],
  [L3], [L2 tokens, and the same component's default-variant L3 tokens],
  [L4], [the same component's L3 token for the same property, and L2 channel tokens],
)

L4's reference to channel tokens is the single place a level is skipped.
A channel token is a state's effect, and it is read where the state is
applied rather than copied down through each component.

== Themable and structural properties
<tokens:properties>
A themable property's value goes through the hierarchy: it has L3 and L4
tokens and can be changed by changing a token. A structural property's
value is a literal written in the component's schema: it has no tokens,
never contains `var()`, and is the same in every theme. A property is
structural when changing it would break the component (`display`,
`overflow`, `position`, grid and flex structure, `appearance`, `cursor`).
It is themable when a designer might reasonably change it, or when it
differs between variants.

== Units
<tokens:units>
Lengths inside components — padding, gaps, radii, offsets — are expressed
in `em`, so a component takes its size from the font size of its context.
Page-level lengths and font sizes are expressed in `rem`. There is
therefore no size axis: a component becomes smaller by being placed in
smaller text.
