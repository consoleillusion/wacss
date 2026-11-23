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

A folder may hold only a schema. That is the case for a part, a component
that exists only inside another and is rendered by its parent.

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
  [`element`], [no], [A list of element selectors. If present, the component is an element component selected by them; if absent, it is a class component selected by `.<name>`.],
  [`variants`], [yes], [Variant names (#link(<variants>)[variants]), including `secondary`.],
  [`states`], [yes], [State names (#link(<states>)[states]), including `static`.],
  [`themeableProperties`], [yes], [The CSS properties whose values come from tokens.],
  [`structuralProperties`], [no], [Literal declarations, keyed by state. `static` holds what always applies; another state holds what applies only in that state.],
  [`pseudoElements`], [no], [A record keyed by pseudo-element (`` `::after` ``), each with its own `themeableProperties` and `structuralProperties`.],
  [`parts`], [no], [The titles of the parts this component renders.],
  [`arguments`], [yes], [A JSON Schema for each argument the component accepts.],
  [`required`], [no], [The arguments that must be given.],
)

== An example
<schema:example>
```dhall
let P = ../prelude.dhall

in  { title = "Button"
    , type = "object"
    , description = "An action. Wraps the bits-ui Button; renders a button, or an anchor when href is set."
    , element = [ "button", "a[data-button-root]" ]
    , variants = [ "secondary", "primary", "tertiary", "danger" ]
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

== Parts
<schema:parts>
A component never styles what is inside it. Inner elements are styled by
their own element components and are influenced by their container only
through inheritance: colour, font and `em` lengths. When an inner element
needs styling of its own, it becomes a part: a component with its own
folder, schema and class, named in its parent's `parts`. Class components
sit in a later cascade layer than element components
(#link(<stylesheet:layers>)[layers]), so a part's class takes precedence
over the element rules for every property it declares.

== Checks
<schema:checks>
Before generating anything, the build checks each schema and stops with a
message if any of these fail:

+ The title matches the folder name.
+ `variants` includes `secondary`, and `states` includes `static`.
+ Every state is in the vocabulary.
+ Every themable property has an L2 default, `--<property>`.
+ Every declared state other than `static` changes at least one of the
  component's properties.
+ No two declared states change the same property.

#emph[Planned:] the build will also require the states an element needs,
so that anything focusable declares `focus` and anything that can be
disabled declares `disabled`.
