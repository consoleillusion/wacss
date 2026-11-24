= The component schema
<schema>
== A component's folder
<schema:folder>
Every component has a folder, `src/components/<Name>/`, whose name is the
component's title in PascalCase. It contains:

#table(
  columns: 2,
  [File], [Purpose],
  [`schema.dhall`], [Required. The component's contract: how it may be styled and what data it takes.],
  [`<Name>.svelte`], [The component, when it wraps a bits-ui component or needs reactivity. At most one per folder.],
  [`<Name>.astro`], [The component, when it is structure only.],
)


== Fields
<schema:fields>
A schema is a Dhall record. It imports `../prelude.dhall`, which provides
helpers for writing the `arguments` field.

#table(
  columns: 3,
  [Field], [Required], [Meaning],
  [`title`], [yes], [The folder name. Its kebab-case form, the component's #emph[name], prefixes every token and is the class of a class component.],
  [`type`], [yes], [Always `"object"`; the schema doubles as a JSON Schema.],
  [`description`], [yes], [One sentence, shown on the demo site and in documentation.],
  [`categories`], [yes], [The kinds of component it is, from the categories in `src/components/vocabulary.dhall`. The demo filters its component grid by them.],
  [`element`], [no], [A list of element selectors. If present, the component is an element component selected by them; if absent, it is a class component selected by `.<name>`. A component that renders a native element that expresses it selects that element; a class is used only when none does (#link(<philosophy:selector>)[selection]).],
  [`variants`], [yes], [A record mapping each variant (#link(<variants>)[variants]), including `secondary`, to its colour role (#link(<variants:recipes>)[recipes]). Variants are ordered as in the vocabulary.],
  [`states`], [yes], [State names (#link(<states>)[states]), including `static`.],
  [`themeableProperties`], [yes], [The CSS properties whose values come from tokens.],
  [`structuralProperties`], [no], [Literal declarations, keyed by state. `static` holds what always applies; another state holds what applies only in that state.],
  [`pseudoElements`], [no], [A record keyed by pseudo-element (`` `::after` ``), each with its own `themeableProperties` and `structuralProperties`, and optionally `on`: a selector the element must match for the pseudo-element to be drawn.],
  [`parts`], [no], [A record keyed by part name (`cell`), each a set of descendant elements the component styles: `selector`, the elements within the component (`` "th, td" ``); its own `themeableProperties` and `structuralProperties`; and optionally `role`, a colour role its colours come from whatever the variant, as a slider's thumbs are in the accent while its track is on the surface (#link(<generation:targets>)[targets]).],
  [`values`], [no], [For the default variant, the value of a non-colour themable property's component token, keyed as the token is (`font-size`, `value-font-size`), written in L1 and L2 tokens: which semantic token the component token refers to, such as `var(--font-size-heading)` for a Stat's number. Without it, the component token refers to the property's L2 default, `--<property>`.],
  [`arguments`], [yes], [A JSON Schema for each argument the component accepts.],
  [`required`], [no], [The arguments that must be given.],
  [`details`], [no], [Paragraphs of plain text that follow the description in the component's chapter: how it is built and how it behaves.],
  [`argumentNotes`], [no], [Paragraphs of plain text that follow the arguments.],
  [`stateValues`], [no], [The component's own values for themable properties in a state, or `unchanged` (#link(<channels:component-states>)[a component's own value for a state]).],
  [`stateEffects`], [yes, for each state but `static`], [A record mapping each state to one sentence: what changes in it.],
  [`stateNotes`], [no], [Paragraphs of plain text that follow the states.],
  [`sections`], [no], [Further sections of the chapter, each `{ heading, text, columns, rows, notes }`: paragraphs, then a table when `columns` is not empty, then paragraphs.],
  [`usage`], [yes], [Examples of use, each a block of Astro code.],
  [`planned`], [no], [Sentences on what is planned and not yet done.],
  [`related`], [no], [The titles of other components the chapter refers to.],
)

Every argument has a `description`: one sentence saying what it does.
The prelude's shared arguments, `commonAttributes`, `fieldAttributes` and
`fieldArguments`, carry their own, as do its `child` and its
`controlStateEffects`, the effects shared by the form controls.

Everything a schema says is data or plain text. It holds no markup for
any one renderer: the book, the demo site and any other reader each
arrange it in their own way.

== Component chapters
<schema:chapters>
The schema is the only description of a component. Each chapter of the
Components part is not written by hand: as the book compiles, Typst
evaluates the component's `schema.dhall`, through a plugin built from the
Rust Dhall implementation (`design/dhall.wasm`), and
`design/components/component.typ` lays the result out. The chapter's
description and details, its arguments with their types, defaults and
descriptions, its variants and their colour roles, its states and their
effects, its themable properties and its examples all come from the
schema, so the book and the component's API cannot diverge. To change a
chapter, change the schema.

A plugin cannot read files, so the book passes it each schema with the
text of the prelude it imports. Typst cannot list a folder either, so
`design/book.typ` names the components, in the order of their chapters.
The book stops with a message when a state has no entry in
`stateEffects`, when `usage` is empty, or when a schema's title differs from the name it is
listed under.

== The shared vocabulary
<schema:vocabulary>
`src/components/vocabulary.dhall` holds what every schema draws on: the
variants, in order, with the default variant, `secondary`, first; the
`derived` templates by which a component makes its text, underline and
border from its background; every colour role a variant can have, with a
sentence saying how a variant in that role looks, the value each colour
property takes in it (such as `background = "var(--color-accent)"`), the
colour a transparent role reads against (`text-on`), and any value it gives
for a state; and the categories. A colour property a role does not give is
made by its `derived` template (#link(<foundations:colour>)[the colour hierarchy]). The generator, this book and the
demo site all read it, so none keeps a list of its own. The build stops
with a message when a schema names a variant, a colour role or a
category that is not in it.

== An example
<schema:example>
```dhall
let P = ../prelude.dhall

in  { title = "Button"
    , type = "object"
    , description = "An action. Wraps the bits-ui Button; renders a button, or an anchor when href is set. …"
    , element = [ "button", "a[data-button-root]" ]
    , variants =
      { secondary = "accent", primary = "pop", tertiary = "clear", danger = "danger" }
    , states = [ "static", "hover", "focus", "active", "disabled", "loading" ]
    , themeableProperties = [ "background", "color", "border-color", "opacity", "filter", … ]
    , structuralProperties =
      { static = { display = "inline-flex", cursor = "pointer", `border-style` = "solid", … }
      , disabled.cursor = "not-allowed"
      , loading.cursor = "progress"
      }
    , arguments =
          P.commonAttributes
      //  { variant = P.choice [ "secondary", "primary", "tertiary", "danger" ] "secondary"
          , label = P.string
          , href = P.described "Renders an anchor instead of a button."
          , loading = P.booleanWith False
          , disabled = P.booleanWith False
          }
    }
```

== Children
<schema:children>
A component that shows another component receives it as data:

```js
{ component: "Button", data: { label: "Open", href: "/docs" } }
```

`component` is the other component's title and `data` the arguments it
receives. The containing component loads it by title and renders it,
without importing it. Card's `figure` and `footer` and an accordion
item's `content` are children of this kind.

Everything else inside a component is plain HTML: headings, paragraphs,
the bits-ui elements it wraps. These are styled by the element
components that select them, for example Button's rules for an
accordion's trigger, and by inheritance from their container: colour,
font and `em` lengths. They are arranged with layout helpers
(#link(<helpers:layout>)[layout helpers]). A component has no rules for
its descendants, and nothing inside a component is a component of its
own unless it is given as data.

== Checks
<schema:checks>
The build stops with a message only where the generated CSS would
otherwise be broken:

+ The title differs from the folder name. Components are found by
  title, so the component could not be loaded.
+ `variants` lacks `secondary`. Every other variant takes its non-colour
  values from the secondary variant's tokens.
+ A variant is not in the vocabulary. Variants are written in vocabulary
  order, so it would have no place.
+ A variant's role gives no value for one of its colour properties
  (#link(<foundations:colour>)[the colour hierarchy]), or another
  themable property has no L2 default, `--<property>`. Its tokens would refer to a value that does not exist.
+ A state is not in the vocabulary. It has no selector, so no rule could
  be written for it.
+ A variant's colour role, or a category, is not in the shared vocabulary
  (#link(<schema:vocabulary>)[the shared vocabulary]). The role would have
  no colours to give and the category no place in the demo's filter.
