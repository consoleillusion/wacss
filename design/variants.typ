= Variants (L3 → L4)
<variants>
A variant is a named appearance of a component. Its name fills the
`<variant>` slot: `--button-background-primary`.

== The set
<variants:the-set>
#table(
  columns: 3,
  [Variant], [Meaning], [Default appearance],
  [`secondary`],
  [The ordinary appearance. #strong[Default.]],
  [The component\'s L3 values],
  [`primary`],
  [The main action or emphasis in a region],
  [Accent fill, ink-on-accent text],
  [`tertiary`],
  [Least emphasis; text-like],
  [Clear fill, plain text, no edge],
  [`positive`],
  [Success, confirmation],
  [Green tone],
  [`warning`],
  [Caution, reversible risk],
  [Amber tone],
  [`danger`],
  [Destructive or failed],
  [Red tone],
  [`informational`],
  [Neutral notice],
  [Blue tone],
)

A component lists the variants that make sense for it, always including
`secondary`. A separator has only `secondary`. A button has `secondary`,
`primary`, `tertiary` and `danger`. An alert has `secondary`,
`informational`, `positive`, `warning` and `danger`.

Variants are intended for emphasising certain things. A CTA should use
the primary variant, it adds weight and uses the `pop` color. Each one
adds tokens, CSS and tests (see #link(<ux-and-accessibility>)[ux-and-accessibility]).

Button styles such as \"outline\", \"ghost\" or \"link\" are not
variants, they are how a variant might be displayed. HTML has no
semantics to distinguish between a primary and secondary button,
designers just choose to mark them up differently. Variants fill this
role within the design system. You can\'t add variants, but you can
style a variant. Variants expose how the same component can play
different roles or receive different emphasis. There is probably no need
for more than the 7 currently used, if you think otherwise, most likely
your are thinking about style.

== Markup
<variants:markup>
The default variant has no class. Every other variant is a class on the
component\'s element:

```html
<button>Save</button>                    <!-- secondary -->
<button class="primary">Publish</button>
<div class="card informational">…</div>
```

A variant class is only styled together with a component
(`button.primary`, `.card.primary`), never on its own.

== Property types
<variants:property-types>
Each property\'s recipes depend on its type, which comes from its name:

#table(
  columns: 2,
  [Type], [Properties],
  [fill],
  [`background`, `background-color`, `accent-color`, `fill`],
  [ink],
  [`color`, `caret-color`, `stroke`],
  [edge],
  [`border-color`, `outline-color`, `text-decoration-color`,
  `column-rule-color`],
  [other],
  [everything else: lengths, shadows, transforms, opacity, durations],
)

The table is closed. A property not listed is `other`.

== Variant recipes
<variants:variant-recipes>
For a property `p` of component `c`, each L4 token is generated from L3:

#table(
  columns: 5,
  [Variant], [fill], [ink], [edge], [other],
  [`secondary`],
  [`var(--c-p)`],
  [`var(--c-p)`],
  [`var(--c-p)`],
  [`var(--c-p)`],
  [`primary`, `positive`, `warning`, `danger`, `informational`],
  [`var(--c-tone-<variant>)`],
  [`var(--c-tone-<variant>-ink)`],
  [`var(--c-tone-<variant>)`],
  [`var(--c-p)`],
  [`tertiary`],
  [`var(--c-tone-tertiary)`],
  [`var(--c-tone-tertiary-ink)`],
  [`var(--c-tone-tertiary)`],
  [`var(--c-p)`],
)

`--c-tone-…` are bridges from the L2 variant tones (see
#link(<generation:bridges>)[generation]).

Some components want a tinted surface rather than a solid fill for their
status variants: alerts, badges, callouts. They override the fill and
ink with the surface bridges:

```ts
// src/components/Alert/tokens.ts
export const tokens =
{ "background.danger": "var(--alert-tone-danger-surface)"
, "color.danger": "var(--alert-tone-danger-surface-ink)"
, "border-color.danger": "color-mix(in oklch, var(--alert-tone-danger) 55%, transparent)"
};
```

== Choosing variants per component
<variants:choosing-variants-per-component>
#table(
  columns: 2,
  [Kind of component], [Typical variants],
  [Actions (button, toggle)],
  [secondary, primary, tertiary, danger],
  [Messages (alert, badge, toast)],
  [secondary, informational, positive, warning, danger],
  [Surfaces (card, dialog, popover)],
  [secondary, primary],
  [Inputs (input, select, checkbox)],
  [secondary],
  [Structure (separator, skeleton, layout)],
  [secondary],
)

Final variant lists are decided per component (see
#link(<components-and-api>)[components-and-api]).
