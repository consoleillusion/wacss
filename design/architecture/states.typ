#import "../data.typ": vocabulary, listed

= States
<states>
A state is a condition a component can be in. For each property in the
state's channel, a component has a state token named with the state last:
`--button-primary-background-hover`.

== The vocabulary
<states:vocabulary>
#table(
  columns: 3,
  [State], [Selector, placed inside `:where(…)`], [Meaning],
  ..vocabulary.states.map(st => (
    raw(st.name),
    if st.selector == "" [none] else if st.pointer [#raw(":is(<interactive>)" + st.selector)] else [#raw(st.selector)],
    st.meaning,
  )).flatten(),
)

`<interactive>` is the elements a person can act on:
#raw(vocabulary.interactive). The pointer states,
#listed(vocabulary.states.filter(st => st.pointer).map(st => raw(st.name))), apply only to them, so nothing that cannot be used ever
looks as if it could. A component that is not interactive, such as a
Badge, declares no pointer states at all; a label that can be pressed is a
different component, a Chip. An element that has its own
interaction, such as a globe that can be turned, is made focusable with
`tabindex` and so is interactive. `focus` needs no such limit, because
only these elements take focus.

`static` means no particular condition. A pair of opposites such as open
and closed is a single state: the absence of `open` is `static`. Selectors
prefer native pseudo-classes, then ARIA attributes, then the `data-*`
attributes bits-ui sets. Wrapping them in `:where()` gives every state rule
the same specificity as the rule for its variant.

The states, their selectors and their order are defined in
`src/components/vocabulary.dhall`, which the generator and this table both
read. A component lists the states it supports. The
order above is also the order in which state rules are written, so when
two states that are true at once set the same property, the later one
wins.
