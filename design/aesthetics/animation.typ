= Animation
<animation>
In wacss, movement is always a reply. Nothing animates until a person
does something, and the same action always produces the same movement.
The mechanism behind every state is described in
#link(<channels>)[channels] and the colour changes in
#link(<palettes:states>)[palettes]; this chapter covers motion itself.

== What moves
<animation:what>
#table(
  columns: 2,
  [When a person…], […this moves],
  [presses a control], [it sinks to 98% of its size and returns on release],
  [rests the pointer on a card], [the card rises on a soft shadow],
  [opens or closes an accordion section], [its body slides open or closed as its chevron turns half a turn],
)

Every other state response is a change of colour, opacity or saturation,
and it eases in over the same duration, so a hover deepens rather than
switches. Colour, opacity, shadow and transform are animated, and the
height of a section as it opens or closes; nothing else in the layout
moves.

== Timing
<animation:timing>
Three durations are derived from one base of 250 ms and a ratio of 1.5.
`--duration-interaction`, 250 ms, is used for every direct response to
input: quick enough to feel immediate, long enough to be seen.
`--duration-surface`, about 375 ms, is for surfaces that appear or move.
`--duration-reveal`, about 840 ms, is for disclosures large enough that
the eye should follow them. `--duration-turn`, a hundred base durations
(25 s, from the L1 `--turn-ratio`), is one full turn of something that
turns, such as a Globe; it is the default `--animation-duration`.

Something that turns does so while its `animation-play-state` is
`running`. It rests at `paused` (`--animation-play-state`), and the hover
channel sets it running, so a turn is started and stopped by state, like
any other change, whether the state comes from the pointer or is applied
in another way. Every change of speed is a transition like any other: a Globe that starts
or stops turning speeds up or slows down over the base duration and along
`--easing`, as its colours change. A component whose motion is drawn by a
script reads these from its own computed style, so its tokens govern it.

== Easing
<animation:easing>
Every transition uses `--easing`, `cubic-bezier(0.2, 0, 0, 1)`: an
ease-out curve that gathers itself for an instant, moves, and settles
gently, the way a physical object comes to rest. It spreads the change
across the whole duration, so a colour or a shadow is seen to move rather
than to jump. There is no
bounce, no overshoot and no constant-speed movement. A second curve,
`--easing-ambient`, eases in and out for the rare movement that is not a
direct reply to input.

== What never moves
<animation:never>
There are no looping effects, no parallax, no carousels that advance on
their own, and no video that plays itself. The single state not triggered
directly by a person is `loading`, and it reports work they asked for.
Motion never carries information that is unavailable without it, and a
reduced-motion preference removes it entirely
(#link(<helpers:reset>)[reset]).
