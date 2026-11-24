= Reset and layout helpers
<helpers>
`helpers.scss` is written by hand. It is not generated, and it styles no
component.

== Reset
<helpers:reset>
The `wacss.reset` layer sets `box-sizing: border-box` on everything,
removes default margins from headings, paragraphs and figures, aligns
table headings to the start and cells to the top, removes the default
frame of a fieldset, keeps `hidden` content hidden whatever display a component gives it,
colors selected text with `--selection` and `--selection-ink` (the pop,
with text its inverse), leaves a button that no component styles plain,
makes media
block-level and no wider than its container, lets form controls inherit
the document font, and sets the root's font family and line height. The
body's background, text, font size and line height are not set here: the
body is the Page component, which makes its text from its background as
every component does (#link(<foundations:color>)[the color hierarchy]). One rule, inside
`@media (prefers-reduced-motion: reduce)`, shortens every transition and
animation to an instant; it is the only rule in wacss that uses
`!important`.

== Layout helpers
<helpers:layout>
A layout helper arranges a page, not a component. It sets only layout
properties — `display`, flex and grid structure, gaps, margins and
`max-inline-size` — never color or type. Each helper is one class.
Options are custom properties set on the element, such as
`--stack-space: 2`; they are local to that element and are not tokens.
Spacing is a multiple of `--space-page`, so it is measured in `rem`.

#table(
  columns: 3,
  [Helper], [Arranges], [Options],
  [`.visually-hidden`], [Nothing on screen: the element is read by assistive technology but not shown, such as a live announcement or a label beside an icon], [none],
  [`.stack`], [Children in a column with even spacing], [`--stack-space`],
  [`.push`], [In a stack, the element and those after it at the far end], [none],
  [`.cluster`], [Children in a wrapping row], [`--cluster-space`, `--cluster-justify`, `--cluster-align`],
  [`.box`], [Padding on every side: the L2 `--padding`], [`--box-padding`],
  [`.spread`], [Two groups at either end of a row, wrapping when space runs out], [`--spread-space`],
  [`.frame`], [A cell that centres its content and clips what overflows], [none],
  [`.center`], [A centred column with a maximum width], [`--center-measure`, `--center-gutter`],
  [`.grid`], [Equal cells that fit as many per row as the space allows], [`--grid-min`],
)

Helper class names never coincide with a component or variant name.
