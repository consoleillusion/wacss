= Architecture
<architecture>
== What exists
<architecture:what-exists>
The stylesheet has five kinds of CSS and nothing else:

#table(
  columns: 4,
  [Kind], [Author], [Source], [Language],
  [L1 primitives],
  [Library, by hand],
  [`src/tokens/primitives.scss`],
  [SCSS],
  [L2 semantic],
  [Library default, rethemed by consumers],
  [`src/tokens/semantic.scss`],
  [SCSS],
  [L3–L5 tokens],
  [Generated],
  [each component\'s `schema.ts`],
  [JavaScript generator],
  [Component CSS],
  [Generated],
  [each component\'s `schema.ts`],
  [JavaScript generator],
  [Helpers],
  [Library, by hand],
  [`src/helpers/*.css`],
  [CSS],
)

Helpers are layout primitives (see #link(<layout>)[layout]), a
minimal reset and `@keyframes`. They are not component styles.

One global stylesheet is the output: generated tokens, generated
component CSS and hand-authored helpers build to `dist/wacss.css`. SCSS
is used only for L1 and L2, where loops keep the palette declarations
compact. Nothing else is SCSS.

There is no Tailwind, no component stylesheets, no scoped `<style>`
blocks, no BEM classes and no per-page styles.

== Inputs
<architecture:inputs>
- #strong[L1 and L2:] two hand-authored files.
- #strong[One schema per component:] `src/components/<Name>/schema.ts`,
  exporting `meta` (styling metadata) and `component` (the public JSON
  Schema of its props). See
  #link(<component-schema>)[component-schema].
- #strong[Optional overrides per component:]
  `src/components/<Name>/tokens.ts`. See
  #link(<generation:overrides>)[generation].

== Pipeline
<architecture:pipeline>
+ Compile L1 and L2 from SCSS.
+ Load and validate every component schema.
+ For each component, build the token hierarchy
  (`generateTokenHierarchy`).
+ Generate token values: L3 from L2, L4 by variant recipe, L5 by state
  recipe, applying overrides.
+ Generate bridges required by those recipes.
+ Validate: adjacency, matrix exactness, channel disjointness, naming.
+ Emit the L3, L4 and L5 token files.
+ Emit the component CSS.
+ Emit the token graph data.
+ Concatenate in cascade-layer order, minify and mangle.

A failed validation fails the build. Generated files are never edited by
hand.

== Outputs
<architecture:outputs>
#table(
  columns: 2,
  [File], [Contents],
  [`dist/wacss.css`],
  [Readable stylesheet],
  [`dist/wacss.min.css`],
  [Minified; L3–L5 names mangled; L1–L2 names kept],
  [`dist/tokens.json`],
  [Every token with its level, value and references (feeds the token
  graph)],
  [`dist/tokens.css`],
  [css file with all tokens defined in :root],
)

== Themes
<architecture:themes>
Themes are root-only. `data-theme` and `data-palette` on `<html>` switch
L2 values. Everything above L2 follows, because every generated token
resolves on `:root`.

```html
<html data-theme="light" data-palette="matcha">
```

There are no theme classes and no nested themes.
