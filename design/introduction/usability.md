= Usability and accessibility
<usability>
These commitments apply to every component and to anything built with
wacss. Where they meet an aesthetic preference, they win.

== Accessibility
<usability:accessibility>
wacss targets WCAG 2.2 at level AA and follows WAI-ARIA. It begins with
semantic HTML: native elements before custom widgets, a class only where
no element fits, and headings, landmarks, lists and labels that mirror the
structure of the content. bits-ui supplies keyboard handling and ARIA
state where HTML has none. Every function is reachable from the keyboard
in a logical order, and focus is always visible. Informative images carry
alternative text, errors are announced and tied to their fields, and no
information is carried by color or motion alone. Every text and fill
pairing in every palette meets the AA contrast ratio. Text can be enlarged
without breaking layouts, and a reduced-motion preference removes
animation entirely. Automated checks are a floor, not a finish: components
are also tested with assistive technology.

== How the architecture helps
<usability:architecture>
Several of these commitments are guaranteed by construction. Because
every interactive component declares `focus` and `disabled` states, and
because each state changes properties no other state touches, every state
remains distinguishable even when several occur together
(#link(<channels>)[channels]). Because component lengths are relative to
the font size, components scale with text (#link(<tokens:units>)[units]).
Because both modes of every palette are designed rather than inverted,
neither is an afterthought (#link(<palettes>)[palettes]).

== Interaction
<usability:interaction>
Every meaningful action receives immediate feedback, and interactive
elements are visibly different from static ones. Controls that look alike
behave alike, and a label says what its action does. Targets are large
enough for touch. Destructive actions can be confirmed or undone, and
input is never discarded, even when it is invalid. Long operations show
their progress; success is confirmed, and errors explain how to recover.
Empty, loading, error and unavailable states are designed rather than
left blank, and nothing fails silently.

== Forms
<usability:forms>
Labels are visible and placed next to their controls; placeholders give
examples and never replace labels. Inputs use the type that matches their
content. Validation happens early without interrupting, and an error says
both what is wrong and how to fix it. Related fields are grouped,
required fields are marked, and a form asks only for what it needs.

== Layout
<usability:layout>
Layouts respond to their content rather than to particular devices.
Sizes are fluid, nothing scrolls sideways unintentionally, and both
orientations work. Important content renders first, space is reserved for
anything that loads later, and core features work without JavaScript
wherever the platform allows.

== Respect
<usability:respect>
wacss uses no dark patterns. It honours a person's preferences for
palette and mode, motion and language, collects only what is needed, explains why,
and leaves people in control of their data and their work.

== References
<usability:references>
#table(
  columns: 2,
  [Source], [Used for],
  [WCAG 2.2], [Accessibility requirements (normative)],
  [WAI-ARIA 1.2], [Semantics for custom widgets (normative)],
  [Nielsen Norman Group], [Usability research and heuristics],
  [Inclusive Design Principles], [Inclusive design],
  [#emph[Every Layout] (Pickering and Bell)], [Intrinsic layout],
)
