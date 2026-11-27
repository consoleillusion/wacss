= Philosophy and principles
<philosophy>
wacss holds that an interface should earn attention rather than demand
it. The Aesthetics part describes how that looks and moves. This chapter
sets out the rules of construction that make the result dependable; each
is enforced by the architecture rather than left to discipline.

== The schema is the contract
<philosophy:schema>
A component's tokens and CSS come only from its schema. If the schema does
not declare something, the component cannot do it; if it does, the
generator styles it in every combination.

== Values are derived, not repeated
<philosophy:derived>
Only foundations are written by hand: primitive tokens, semantic tokens
and channel tokens. Every other token is generated as an expression over
the level below it. A value therefore has exactly one source.

== Foundations hold bases, not scales
<philosophy:bases>
A primitive records a base and a step or ratio, never a pre-computed
series. There is one spacing step, not a list of spacing sizes; each size
is calculated where it is needed.

== Behaviour is defined once
<philosophy:behaviour>
What a state does — how hover changes a fill, how focus is shown — is
defined once for the whole library. A component chooses which of its
properties a state may affect; it cannot define a hover of its own.

== One selector per component
<philosophy:selector>
A component is selected by its native element wherever one exists, so
plain HTML is styled without any class: a `<button>`, a `<form>` or a
`<table>` looks like a wacss component however it was written. A class
selects a component only when no native element expresses it, and classes
are otherwise used as little as possible: one for each non-default
variant, and the layout helpers. State selectors add no
specificity, and there are no descendant selectors. A component shows
another component only by receiving it as data
(#link(<schema:children>)[children]).

== A designed cascade
<philosophy:cascade>
Every rule wacss writes sits in a named cascade layer, in a fixed order,
beneath anything a product writes. Precedence is decided by layer, not by
specificity contests.

== Native first, data in
<philosophy:native>
Components use native HTML wherever it does the job, and bits-ui where
behaviour is needed that HTML lacks. Each is wrapped so that it needs only
data. JavaScript is used only where the platform cannot provide the
behaviour.

== Theming happens at the root
<philosophy:root>
A palette and a light or dark mode are chosen on the `html` element and
nowhere else. Every generated token resolves on the root, so a change
there reaches the whole page.

== Mechanism and taste are separate
<philosophy:separation>
The architecture fixes how values flow; the aesthetics choose what the
values are. Anyone who disagrees with a default changes a token. Nobody
has to change the generator, a schema or a component to restyle wacss.

== When principles conflict
<philosophy:conflict>
Usability and accessibility take precedence over every aesthetic
preference. Beyond that: clarity before decoration, consistency before
novelty, predictability before cleverness, and observed behaviour before
assumption.
