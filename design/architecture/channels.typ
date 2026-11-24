= Channels
<channels>
A channel is the set of CSS properties a state changes. Channels are
defined once, for the whole library, by the tokens in `channel.scss`.
They are the only place a state's effect is decided.

== The channel map
<channels:map>
A channel token is named for a state and a property key: the property's
name, or for a pseudo-element its name and the property's, exactly as
they appear in component token names (`background`, `after-transform`;
#link(<generation:targets>)[targets]).

#table(
  columns: 2,
  [Token], [Meaning],
  [`--<state>-<key>`], [The value the state applies],
  [`--<state>-<key>-toward`], [For a colour property: the colour to mix toward],
  [`--<state>-<key>-amount`], [For a colour property: how much of that colour to mix in],
)

A state's channel is every key named by a token in `channel.scss` that
begins with `--<state>-`, after removing any `-toward` or `-amount`
suffix. The default map is:

#table(
  columns: 2,
  [State], [Channel],
  [`hover`], [`background`, `text-decoration-color` (toward the accent), `box-shadow` (the hover ring), and `animation-play-state` (running what is paused)],
  [`focus`], [`outline-color`],
  [`active`], [`transform`],
  [`open`], [`after-transform`],
  [`current`], [`font-weight`],
  [`pressed`], [`background`, `border-color` and `color`, all the way to the accent and, for text, the base colour],
  [`disabled`], [`opacity`],
  [`loading`], [`filter`],
)

A component receives a state's effect only on the keys of its own themable
properties that are in the channel. A button declares `background` but not
`box-shadow`, so hovering a button changes its fill; a card declares both,
so hovering a card changes its fill and lifts it. Opening turns a button's
`::after` chevron, but not the button itself, because the channel names
`after-transform` rather than `transform`.

== From channel token to state token
<channels:recipes>
For a key `k` in the channel of state `s`, whose CSS property is `p`, the
L4 token of a variant is computed from that variant's L3 token, written
`L3` below, by the first rule that applies:

#table(
  columns: 2,
  [Condition], [L4 value],
  [`--s-k-toward` exists], [`color-mix(in oklab, var(L3), var(--s-k-toward) var(--s-k-amount))`],
  [`p` is `transform` or `filter`], [`var(L3) var(--s-k)`],
  [`p` is `opacity`], [`calc(var(L3) * var(--s-k))`],
  [otherwise], [`var(--s-k)`],
)

The second and third rules build on the L3 value rather than replacing
it, which is why `transform`, `filter` and `opacity` default to values
that change nothing.

== A role's own colour for a state
<channels:role-states>
A channel changes a property the same way on every component. A colour
role can instead give its own value of a colour property for a state, in
its definition in `vocabulary.dhall`, such as the map role's
`hover = { fill = "var(--color-land-hover)", … }`. When the role of a
variant gives one, that colour property changes in that state on that
variant, whether or not the state's channel names it, and its L4 token is
the role's value as it is. This takes
precedence over the recipes above. Only components whose variants have
that role are affected.

== A component's own value for a state
<channels:component-states>
A component can set its own value for a themable property in a state, in
its schema's `stateValues`: a record keyed by state, then by property (or
`<pseudo>-<property>` for a pseudo-element). The value is written in terms
of L1 and L2 tokens, such as `var(--color-accent)`, and becomes the
property's L4 token in that state, on every variant. The word `unchanged`
instead keeps the property at its static value in that state, even where
the state's channel would change it. These come before a role's own
colour and before the channels. No component uses them at present. A value used by more than one
component does not belong here but in L2, where every component shares
it.

== The hover ring
<channels:ring>
Every component that can be interacted with lists `box-shadow`, and the
hover channel draws a ring with it. A component that is not itself
interacted with, such as a Card, has no hover state at all: only the
components inside it respond. A Globe draws no ring either; its colouring
and turning are its hover effect. At rest, `--box-shadow` is two
transparent shadows at the element's edge; on hover they become a gap of
`--ring-gap` (0.125rem) in the page's colour and, outside it, a ring of
`--ring` as wide as the focus outline. The transition moves the ring out
from the edge to its place as it fades in from nothing. It is a shadow, not
an outline, so the outline stays free for the focus ring; and a shadow
takes no space, so nothing around it moves. A state never changes the size
of anything.

== Rules
<channels:rules>
A state's CSS rule sets only the properties in its channel. When two
states that are true at the same time set the same property, the one
later in the vocabulary order wins (#link(<stylesheet:rules>)[rules]).
