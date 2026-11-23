= Animation
<animation>
In wacss, movement is always a reply. Nothing animates until a person
does something, and the same action always produces the same movement.
The mechanism behind every state is described in
#link(<channels>)[channels] and the colour changes in
#link(<themes:states>)[themes]; this chapter covers motion itself.

== What moves
<animation:what>
#table(
  columns: 2,
  [When a person…], […this moves],
  [presses a control], [it sinks to 98% of its size and returns on release],
  [rests the pointer on a card], [the card rises on a soft shadow],
  [opens an accordion section], [its chevron turns half a turn],
)

Every other state response is a change of colour, opacity or saturation,
and it eases in over the same duration, so a hover deepens rather than
switches. Only colour, opacity, shadow and transform are animated; layout
never moves to accommodate an animation.

== Timing
<animation:timing>
Three durations are derived from one base of 150 ms and a ratio of 1.5.
`--duration-interaction`, 150 ms, is used for every direct response to
input: quick enough to feel immediate, long enough to be seen.
`--duration-surface`, about 225 ms, is for surfaces that appear or move.
`--duration-reveal`, about 500 ms, is for disclosures large enough that
the eye should follow them.

== Easing
<animation:easing>
Every transition uses `--easing`, an ease-out curve that starts quickly
and settles gently, the way a physical object comes to rest. There is no
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
