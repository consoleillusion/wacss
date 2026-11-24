= Build and outputs
<build>
== Commands
<build:commands>
#table(
  columns: 2,
  [Command], [Does],
  [`bun run generate:tokens`], [Check `palettes.dhall` and write it to `src/styles/_palettes.scss`, compile the styles, check every schema against the vocabulary, generate tokens and CSS, and write `dist/`. `_palettes.scss` is generated and not kept in the repository.],
  [`bun run dev`], [Generate, then serve the demo site],
  [`bun run build`], [Generate, then build the demo site into `demo-dist/`],
  [`bun run palette-swatches`], [Render every palette and mode in Chrome and write `design/palettes.json`, each colour as the hex it is drawn with in the Palettes chapter, and `design/palettes-exact.json`, each colour as the browser computes it before rounding, from which the chapter prints its oklch value. It uses a browser so that every value is the one the stylesheet renders, resolved by a real CSS engine through its references, relative colours and mixes, rather than recomputed],
  [`bun run export:tokens`], [After generation, resolve every token in a browser in every palette and mode, and write the Design Tokens Format files to `dist/dtcg/` (#link(<build:dtcg>)[below])],
  [`bun run build:book`], [Compile this book, in a dark and a light edition. It first runs `generate:tokens` and `palette-swatches`, because the Palettes chapter reads its colours from `dist/tokens.json` and the files `palette-swatches` writes, so a change to `palettes.dhall` reaches the book in one step. Each component chapter is laid out from the component's `schema.dhall` as the book compiles (#link(<schema:chapters>)[component chapters])],
  [`bun run globe-relief <planet.jpeg>`], [Write `src/components/Globe/relief.webp`, Globe's texture of relief and sea depth, from the Blue Marble image `planet.jpeg` in the npm package `@freetiler/nasa-bluemarble`, which is too large to be a dependency. Run only to change the texture; the file is committed],
  [`bun run build:dhall-plugin`], [Build the Typst plugin that evaluates Dhall, `design/dhall.wasm`, from `design/dhall-plugin/`. It needs Rust with the `wasm32-unknown-unknown` target, and is run only when the plugin changes],
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
  [`dist/dtcg/`], [Every token in the Design Tokens Format (#link(<build:dtcg>)[below])],
)

The demo site is built by Astro with Vite. Two of its dependencies
need telling apart: bits-ui, \@xyflow/svelte and LayerChart are left out
of Vite's dependency pre-bundling, and LayerChart and its
\@layerstack helpers are bundled into the server build
(`resolve.noExternal`), because they ship Svelte source that Node
cannot load on its own.

`tokens.json` has two members. `tokens` is a list of every token as
recorded during generation: `name`, `level`, `group`, `value` and
`refs`. `components` maps each component's title to its `name`,
`description`, `element`, `variants`, `roles` (each variant's colour
role), `states`, `arguments`, `required`, and `channels`: for each declared state, the names of the L4 tokens it
produces. The demo site reads this file to draw the token graph and to
force states on its samples.

`dist/` is rebuilt on every run and is not committed.

== The Design Tokens Format
<build:dtcg>
`bun run export:tokens` writes every token in the Design Tokens Community
Group's format, version 2025.10 (designtokens.org/tr/2025.10), so that
design tools and AI agents can read wacss's tokens in a published
standard. It writes three kinds of file to `dist/dtcg/`:

#table(
  columns: 2,
  [File], [Contents],
  [`wacss.tokens.json`], [Every token, as it resolves in the default palette, Kinari, and mode, dark],
  [`<palette>-<mode>.tokens.json`], [For each palette and mode, the tokens whose value differs from the default],
  [`wacss.resolver.json`], [A resolver with one set, the default tokens, and one modifier, `palette-mode`, whose contexts are each palette and mode, the first palette, dark, by default],
)

Tokens are grouped as `generateTokens` groups them: `primitives`,
`semantic`, `channel`, and one group per component. A token keeps its
name without the leading dashes, so `--button-secondary-background`
becomes `button.button-secondary-background`, and its description names
its level, such as `L3`.

The format has types for colours, dimensions, durations, cubic Béziers,
numbers, font families and weights, and shadows, but it has no
calculations: a value is a literal or a reference. Each token is
therefore exported in one of three ways:

+ A token whose CSS value is a single reference, `var(--x)`, becomes an
  alias, `{group.x}`, so the hierarchy is kept.
+ Any other token is exported resolved, as the browser computes it in
  that palette and mode, with its CSS kept under
  `$extensions["org.wacss"].css`. Colours are written in oklch.
  Dimensions are resolved to pixels at a root font size of 16 px, since
  the format allows only `px` and `rem`.
+ A token the format has no type for, such as a percentage, a transform,
  a filter or a keyword, is listed with its CSS under the root's
  `$extensions["org.wacss"].unsupported`.

The CSS remains the source of every value; these files are generated
from it and never edited.

== Planned
<build:planned>
#table(
  columns: 2,
  [Addition], [Purpose],
  [Contrast check], [Fail the build if any text colour on any fill, in any mode of any palette, falls below WCAG 2.2 AA. Today this is checked by hand from `design/palettes.json`.],
  [`dist/wacss.min.css`], [A minified stylesheet in which L3 and L4 names are shortened. L1 and L2 names stay readable, so products can still customise them at runtime.],
  [Package exports], [Publish the stylesheet, tokens, schemas and components so wacss can be installed and restyled from another project.],
)
