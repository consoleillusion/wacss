= States
<states>
A state is a condition a component can be in. For each property in the
state's channel, a component has a state token named with the state last:
`--button-primary-background-hover`.

== The vocabulary
<states:vocabulary>
#table(
  columns: 2,
  [State], [Selector, placed inside `:where(…)`],
  [`static`], [none; this is the default condition],
  [`hover`], [`:hover`],
  [`focus`], [`:focus-visible`],
  [`active`], [`:active`],
  [`open`], [`[aria-expanded="true"], [data-state="open"]`],
  [`current`], [`[aria-current="page"], [aria-current="true"]`],
  [`pressed`], [`[aria-pressed="true"]`],
  [`disabled`], [`:disabled, [aria-disabled="true"], [data-disabled]`],
  [`loading`], [`[aria-busy="true"]`],
)

`static` means no particular condition. A pair of opposites such as open
and closed is a single state: the absence of `open` is `static`. Selectors
prefer native pseudo-classes, then ARIA attributes, then the `data-*`
attributes bits-ui sets. Wrapping them in `:where()` gives every state rule
the same specificity as the rule for its variant.

A component lists the states it supports. The
order above is also the order in which state rules are written, so when
two states that are true at once set the same property, the later one
wins.
