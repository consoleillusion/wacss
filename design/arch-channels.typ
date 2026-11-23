= Channels
<channels>
A channel is the set of CSS properties a state changes. Channels are
defined once, for the whole library, by the tokens in `channel.scss`.
They are the only place a state's effect is decided.

== The channel map
<channels:map>
A channel token is named for a state and a property:

#table(
  columns: 2,
  [Token], [Meaning],
  [`--<state>-<property>`], [The value the state applies to the property],
  [`--<state>-<property>-toward`], [For a colour property: the colour to mix toward],
  [`--<state>-<property>-amount`], [For a colour property: how much of that colour to mix in],
)

A state's channel is every property named by a token in `channel.scss`
that begins with `--<state>-`, after removing any `-toward` or `-amount`
suffix. The default map is:

#table(
  columns: 2,
  [State], [Channel],
  [`hover`], [`background`, `box-shadow`],
  [`focus`], [`outline-color`],
  [`active`], [`transform`],
  [`open`], [`transform`],
  [`disabled`], [`opacity`],
  [`loading`], [`filter`],
)

A component receives a state's effect only on the channel properties it
also declares as themable. A button declares `background` but not
`box-shadow`, so hovering a button changes its fill; a card declares both,
so hovering a card changes its fill and lifts it.

== From channel token to state token
<channels:recipes>
For a property `p` in the channel of state `s`, the L4 token of a variant
is computed from that variant's L3 token, written `L3` below, by the
first rule that applies:

#table(
  columns: 2,
  [Condition], [L4 value],
  [`--s-p-toward` exists], [`color-mix(in oklab, var(L3), var(--s-p-toward) var(--s-p-amount))`],
  [`p` is `transform` or `filter`], [`var(L3) var(--s-p)`],
  [`p` is `opacity`], [`calc(var(L3) * var(--s-p))`],
  [otherwise], [`var(--s-p)`],
)

The second and third rules build on the L3 value rather than replacing
it, which is why `transform`, `filter` and `opacity` default to values
that change nothing.

== Rules
<channels:rules>
+ A state's CSS rule sets only the properties in its channel.
+ No two states that a component declares may share a property in that
  component's channel. States that happen at the same time therefore
  never overwrite each other.
+ Every state a component declares, other than `static`, must change at
  least one of its properties.

The generator checks the second and third rules and stops the build if
either is broken (#link(<schema:checks>)[checks]).
