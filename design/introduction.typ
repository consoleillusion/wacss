= wacss specification
<introduction>
wacss is a data-driven component library with one global, token-driven
stylesheet. Pass data, get a complete, accessible UI.

Developers hand-author a small set of foundational tokens (L1, L2) and
one schema per component. Everything else is generated: component tokens
(L3), variant tokens (L4), state tokens (L5) and the CSS that applies
them.

== Core rules
<introduction:core-rules>
+ #strong[Define foundations, not ramps.] L1 holds bases, steps and
  ratios. Every scale is calculated.
+ #strong[Derive, don\'t duplicate.] Every themable token references the
  level below it.
+ #strong[Generate by default, override when necessary.] Variants and
  states work with no per-component values, but any generated token can
  be overridden.
+ #strong[One selector per component.] Generated CSS applies only L5
  tokens and schema-declared structural literals.
+ #strong[The schema is the contract.] A component\'s tokens and CSS
  come only from its schema.

#pagebreak(weak: false)

== Glossary
<introduction:glossary>
#table(
  columns: 2,
  [Term], [Meaning],
  [Primitive],
  [L1 token. A literal: a base, step, ratio or single colour.],
  [Semantic],
  [L2 token. A design meaning or default built from L1.],
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
