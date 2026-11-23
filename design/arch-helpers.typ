= Reset and layout helpers
<helpers>
`helpers.scss` is written by hand. It is not generated, and it styles no
component.

== Reset
<helpers:reset>
The `wacss.reset` layer sets `box-sizing: border-box` on everything,
removes default margins from headings, paragraphs and figures, makes media
block-level and no wider than its container, lets form controls inherit
the document font, and gives the body its background, text colour, font
and line height from L2. One rule, inside
`@media (prefers-reduced-motion: reduce)`, shortens every transition and
animation to an instant; it is the only rule in wacss that uses
`!important`.

== Layout helpers
<helpers:layout>
A layout helper arranges a page, not a component. It sets only layout
properties — `display`, flex and grid structure, gaps, margins and
`max-inline-size` — never colour or type. Each helper is one class.
Options are custom properties set on the element, such as
`--stack-space: 2`; they are local to that element and are not tokens.
Spacing is a multiple of `--space-page`, so it is measured in `rem`.

#table(
  columns: 3,
  [Helper], [Arranges], [Options],
  [`.stack`], [Children in a column with even spacing], [`--stack-space`],
  [`.cluster`], [Children in a wrapping row], [`--cluster-space`, `--cluster-justify`, `--cluster-align`],
  [`.center`], [A centred column with a maximum width], [`--center-measure`, `--center-gutter`],
  [`.grid`], [Equal cells that fit as many per row as the space allows], [`--grid-min`],
)

Helper class names never coincide with a component or variant name.
