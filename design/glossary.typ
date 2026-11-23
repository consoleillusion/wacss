#pagebreak(weak: false)

== Glossary
<introduction:glossary>
#table(
  columns: 2,
  [Term], [Meaning],
  [Primitive],
  [L1 token. A literal: a base, step, ratio or single colour.],
  [Semantic],
  [L2 token. A design meaning or default built from L1. Their names are frequently CSS property names and are the default value set which are often inherited by components],
  [Component token],
  [L3 token: `--<component>-<property>`.],
  [Variant],
  [A named appearance of a component: `primary`, `secondary`, … Fills
  the `<variant>` slot of L4 and L5 names. Default: `secondary`.],
  [State],
  [A named UI condition: `hover`, `checked`, … Fills the `<state>` slot
  of L5 names. Default: `static`.],
  [Matrix],
  [All tokens of a component: properties × variants × states.],
  [Themable property],
  [A CSS property whose value goes through the token hierarchy.],
  [Structural property],
  [A CSS property the component needs in order to work, written as a
  literal in the schema. It has no tokens.],
  [Channel],
  [The properties a state changes. Co-occurring states must use
  different channels.],
  [Bridge],
  [A component token that carries an L2 value (the interaction colour, a
  mix amount, a variant tone) down to L4 and L5 so recipes never skip a
  level.],
  [Override],
  [A hand-authored replacement for one generated token. It keeps the
  token\'s name.],
  [Element component],
  [A component that wraps a native HTML element. Selected by element
  name, no class.],
  [Class component],
  [A component with no native element. Selected by one class.],
)

`<component>`, `<property>`, `<variant>` and `<state>` in this spec are
placeholders. The words \"variant\" and \"state\" never appear in a
token name.
