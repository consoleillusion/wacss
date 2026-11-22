= Layout helpers
<layout>
Page layout uses a small set of hand-authored, intrinsic layout
primitives in the style of Heydon Pickering and Andy Bell\'s #emph[Every
Layout]. They lay out a page, not a component, and are not generated.

== Principles
<layout:principles>
- Intrinsic web design and modern CSS: components size to their content
  and layouts reflow without breakpoints or special logic where
  possible.
- Sizes are intrinsic: `min()`, `max()`, `clamp()`, `flex-basis`
  thresholds, `auto-fit` grids.
- Spacing is in `rem` (via `--space-page`) so it doesn\'t drift with
  component font sizes.
- A helper sets only layout properties: `display`, flex and grid
  structure, gaps, margins, `max-inline-size`. Never colour or type.
- Each helper is one class. Options are custom properties set inline
  (`style="--stack-space: 2"`), not modifier classes.

== The set
<layout:the-set>
#table(
  columns: 3,
  [Helper], [Purpose], [Options],
  [`.stack`],
  [Vertical flow with consistent spacing between children],
  [`--stack-space` (multiplier of `--space-page`)],
  [`.cluster`],
  [Wrapping horizontal group (tags, actions, toolbars)],
  [`--cluster-space`, `--cluster-justify`, `--cluster-align`],
  [`.sidebar`],
  [Sidebar + content that stacks when content would get too narrow],
  [`--sidebar-width`, `--sidebar-content-min`],
  [`.center`],
  [Centred column with a max measure],
  [`--center-measure`, `--center-gutter`],
  [`.grid`],
  [Auto-fitting grid of equal cells],
  [`--grid-min`],
  [`.switcher`],
  [Row that becomes a column below a threshold],
  [`--switcher-threshold`],
  [`.cover`],
  [Full-height block with a vertically centred principal element],
  [`--cover-min-height`],
  [`.frame`],
  [Fixed aspect-ratio media frame],
  [`--frame-ratio`],
  [`.reel`],
  [Horizontal scrolling strip],
  [`--reel-item-width`],
  [`.box`],
  [Padded region],
  [`--box-padding`],
)

