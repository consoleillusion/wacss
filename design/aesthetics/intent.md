= Design intent
<intent>
Every decision in this part is a default, expressed as token values and
changeable without touching the architecture
(#link(<customising>)[customising]). This chapter explains what those
defaults are for.

== A quiet interface
<intent:quiet>
Most interfaces compete for attention with saturated color, constant
motion and visual noise, and the people using them pay for it in fatigue.
wacss is designed to recede. Its pages are close to neutral; color is
reserved for what can be acted on, and most of all for the one action
that matters most in a view. Because so little else asks to be noticed,
a small amount of color is enough to guide the eye.

== The person leads
<intent:agency>
Nothing in wacss starts moving by itself: no autoplay, no looping
effects, no content that changes while it is being read. The interface
waits, and every movement is a direct response to something a person
did. Responses are consistent, so the same action always produces the
same result, and an interface built with wacss can be learned once and
trusted.

== Beauty through restraint
<intent:restraint>
Beauty here comes from proportion, tone and timing rather than
decoration. Colors sit close to one another in value; raised surfaces
are a single step from the page; corners are square; type uses few sizes
and weights. Motion is smooth and settles gently. The quality of the
result depends as much on what is left out as on what is included.

== Details worth discovering
<intent:discovery>
A few details are there to be found rather than announced: a chevron
that turns as a section opens, a card that rises slightly beneath the
pointer, a fill that deepens just enough to feel. Each is small, local to
whatever the person is attending to, and never competes with content.
Someone who looks closely is rewarded; someone who does not is never
distracted.

== The principles behind the defaults
<intent:principles>
The visual language draws on Japanese aesthetics and Western editorial
design. These principles are the criteria each default is judged
against:

#table(
  columns: 3,
  [Principle], [Meaning], [How it shows in wacss],
  [Wa 和], [Harmony], [One coherent design across every component, palette and mode],
  [Kanso 簡素], [Simplicity], [Four decor colors and four intent colors per mode, from one hue; few sizes; nothing ornamental],
  [Ma 間], [Space and interval], [Whitespace and timing give structure and pace],
  [Seijaku 静寂], [Energised calm], [Stillness until something is done],
  [Yūgen 幽玄], [Subtle depth], [Hints rather than highlights],
  [Shibui 渋い], [Unobtrusive beauty], [Quality that reveals itself with use],
  [Shizen 自然], [Naturalness], [Derived values, layouts shaped by content, natural easing],
  [Fukinsei 不均斉], [Asymmetry], [Balance through unequal weights rather than mirroring],
)

These are tendencies, not laws, and they give way to usability and
accessibility whenever the two disagree
(#link(<philosophy:conflict>)[principles]).
