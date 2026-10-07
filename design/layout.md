# Layout helpers

Page layout uses a small set of hand-authored, intrinsic layout primitives in the style of Heydon Pickering and Andy Bell's *Every Layout*. They lay out a page, not a component, and are not generated.

## Principles

- Intrinsic web design and modern CSS: components size to their content and layouts reflow without breakpoints or special logic where possible.
- Sizes are intrinsic: `min()`, `max()`, `clamp()`, `flex-basis` thresholds, `auto-fit` grids.
- Spacing is in `rem` (via `--space-page`) so it doesn't drift with component font sizes.
- A helper sets only layout properties: `display`, flex and grid structure, gaps, margins, `max-inline-size`. Never colour or type.
- Each helper is one class. Options are custom properties set inline (`style="--stack-space: 2"`), not modifier classes.

## The set

| Helper | Purpose | Options |
| --- | --- | --- |
| `.stack` | Vertical flow with consistent spacing between children | `--stack-space` (multiplier of `--space-page`) |
| `.cluster` | Wrapping horizontal group (tags, actions, toolbars) | `--cluster-space`, `--cluster-justify`, `--cluster-align` |
| `.sidebar` | Sidebar + content that stacks when content would get too narrow | `--sidebar-width`, `--sidebar-content-min` |
| `.center` | Centred column with a max measure | `--center-measure`, `--center-gutter` |
| `.grid` | Auto-fitting grid of equal cells | `--grid-min` |
| `.switcher` | Row that becomes a column below a threshold | `--switcher-threshold` |
| `.cover` | Full-height block with a vertically centred principal element | `--cover-min-height` |
| `.frame` | Fixed aspect-ratio media frame | `--frame-ratio` |
| `.reel` | Horizontal scrolling strip | `--reel-item-width` |
| `.box` | Padded region | `--box-padding` |

Helper option custom properties are local to the element. They are not tokens and are not mangled. Their defaults reference L2 tokens.

## Other helpers

- **Reset:** box sizing, margins, media defaults. Kept minimal.
- **Keyframes:** named `wacss-*` (e.g. `wacss-spin`, `wacss-shimmer`). Keyframes are helper definitions; a component opts in by listing `animation-name` and the other animation properties it needs in `cssProperties`.
- **Reduced motion:** a single `@media (prefers-reduced-motion: reduce)` rule that shortens transitions and stops animations globally.

## Naming

Helper class names must not collide with component names or variant names. The generator checks this.
