= Component schema
<component-schema>
Every component lives in `src/components/<Name>/` and may have the following files:
- schema.dhall
- <Component>.astro
- <Component>.svelte

The Astro file is meant to provide the structure and any non reactive components, while the svelte has the reactive part. If a component contains multiple reactive parts they should come from other components. There should not be two separate svelte files in one folder. 

`bitsui` library is used to make the mvp, in such a way that the wacss component only needs to receive data in its parameter to construct a component.

Each listed property gets the full matrix under a name that includes the
pseudo-element: `--input-placeholder-color-secondary-static`. The CSS
rule is the component\'s selector plus the pseudo-element
(`:where(input)::placeholder`). Pseudo-elements take the same
`structure` shape, as `pseudoStructure`.

== Sub-parts
<component-schema:sub-parts>
There are no sub-part declarations and no descendant selectors.

The inner elements of a component are styled by their own element
components (`button`, `h2`, `figure`, `a`). They are influenced by their
container only through inheritance: `color`, the font properties and
`em`-based lengths.

If an inner part needs its own styling, it becomes a component, with its
own schema, class and tokens. Its class outranks the element rules (see
#link(<css-output>)[css-output]).

== Validation
<component-schema:validation>
Before generation, each schema is checked:

- `name` is unique, kebab-case, and doesn\'t collide with a variant name
  or a helper class.
- Variants and states are from the allowed sets, unique, and include the
  defaults.
- `cssProperties` are unique, and each is a known CSS property or a `--`
  custom property.
- Every `cssProperties` entry has an L2 default (`--<property>`) or an
  L3 override.
- `structure` keys are listed states, and its properties don\'t overlap
  `cssProperties`.
- Channels are valid and disjoint for co-occurring states, and every
  state has one.


== Components

The components should be made primaly of bitsui components, but wrapped so that they can simply take a data object and create the component.

```ocaml
let P = ../prelude.dhall
in
{ title = "Button"
, type = "object"
, description = "A styled action element. Renders a button, or an anchor when href is set."
, element = "button"
, variants = [ "secondary", "primary", "tertiary", "danger" ]
, states = [ "static", "hover", "focus", "active", "disabled", "loading" ]
, themeableProperties =
  [ "background"
  , "color"
  , "border-color"
  , "border-width"
  , "border-radius"
  , "padding-block"
  , "padding-inline"
  , "gap"
  , "font-size"
  , "font-weight"
  , "outline-color"
  , "outline-width"
  , "outline-offset"
  , "transform"
  , "opacity"
  , "transition-duration"
  ]
, structuralProperties =
    { appearance = "none"
    , display = "inline-flex"
    , `align-items` = "center"
    , `justify-content` = "center"
    , `white-space` = "nowrap"
    , `border-style` = "solid"
    , `outline-style` = "solid"
    , `line-height` = "1"
    , cursor = "pointer"
    , `transition-property` = "background, color, border-color, transform"
    }
  }
, arguments =
  { variant = P.choice [ "secondary", "primary", "tertiary", "danger" ] "secondary"
  , type = P.choice [ "button", "submit", "reset" ] "button"
  , label = P.string
  , href = P.described "Renders an anchor instead of a button."
  , loading = P.booleanWith False
  , disabled = P.booleanWith False
  }
}
```
