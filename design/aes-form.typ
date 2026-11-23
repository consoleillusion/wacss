= Space, type and form
<form>
== Space
<form:space>
Whitespace carries structure. Related things sit close together and
unrelated things further apart, so grouping is clear before colour or
type have said anything. Every distance comes from one step, a quarter of
the font size (`--space-step: 0.25`), giving 4, 8, 12 and 16 pixels at a
16-pixel font size. Only a few multiples are used; when a gap seems to
need a new value, the arrangement usually needs rethinking instead.
Components measure space in `em` and pages in `rem`
(#link(<tokens:units>)[units]).

== Type
<form:type>
Type sizes come from one base and a ratio of 1.2, a minor third, which
separates headings from body text without shouting. Three weights come
from one base and a step of 100: body, interface and heading. Body text
is held to about 68 characters per line, with a line height of 1.5.

== Shape and depth
<form:shape>
Corners are square: the radius step is zero, so every radius derived from
it is zero too. Surfaces are told apart by a small change of tone and a
hairline border rather than by shadow; a shadow appears only when a
surface rises in reply to the pointer.

== Arrangement
<form:arrangement>
Pages are arranged with the layout helpers (#link(<helpers:layout>)[layout
helpers]), never with component styles. Layouts take their shape from
their content: they reflow when content needs room rather than at fixed
breakpoints, and content is never cropped to keep a grid intact. A view
has a single focal point and a clear path through it. Empty space marks
the pauses between sections. Balance comes from unequal weights — an
offset heading, columns of different widths — while baselines, gutters
and reading order stay consistent, so the asymmetry reads as composition
rather than accident. The visual order always matches the source order.
