= Build and outputs
<build>
== Commands
<build:commands>
#table(
  columns: 2,
  [Command], [Does],
  [`bun run generate:tokens`], [Compile the styles, check every schema, generate tokens and CSS, and write `dist/`],
  [`bun run dev`], [Generate, then serve the demo site],
  [`bun run build`], [Generate, then build the demo site into `demo-dist/`],
  [`bun run theme-swatches`], [Render every mode of every theme in a browser and write `design/themes.json`, which this book reads],
  [`bun run build:book`], [Compile this book, in a dark and a light edition],
)

There is no separate verification step and there are no tests: the
schema checks run as part of generation, and the token hierarchy is
verified by inspecting it on the demo site's design page.

== Outputs
<build:outputs>
#table(
  columns: 2,
  [File], [Contents],
  [`dist/wacss.css`], [The complete stylesheet (#link(<stylesheet:assembly>)[assembly])],
  [`dist/tokens.css`], [Every token, L1 to L4, without the helpers or component rules],
  [`dist/tokens.json`], [See below],
)

`tokens.json` has two members. `tokens` is a list of every token as
recorded during generation: `name`, `level`, `group`, `value` and
`refs`. `components` maps each component's title to its `name`,
`description`, `element`, `variants`, `states`, `parts`, `arguments`, and
`channels`: for each declared state, the names of the L4 tokens it
produces. The demo site reads this file to draw the token graph and to
force states on its samples.

`dist/` is rebuilt on every run and is not committed.

== Planned
<build:planned>
#table(
  columns: 2,
  [Addition], [Purpose],
  [Contrast check], [Fail the build if any text colour on any fill, in any mode of any theme, falls below WCAG 2.2 AA. Today this is checked by hand from `design/themes.json`.],
  [Required-states check], [Fail the build if a focusable component does not declare `focus`, or one that can be disabled does not declare `disabled` (#link(<schema:checks>)[checks]).],
  [`dist/wacss.min.css`], [A minified stylesheet in which L3 and L4 names are shortened. L1 and L2 names stay readable, so products can still customise them at runtime.],
  [Package exports], [Publish the stylesheet, tokens, schemas and components so wacss can be installed and themed from another project.],
)
