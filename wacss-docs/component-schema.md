# Component schema

Every component lives in `src/components/<Name>/` and exports two things from `schema.ts`:

- `meta`: styling metadata. The **only** input to token and CSS generation.
- `component`: the public JSON Schema of the component's props (data and configuration). It is not used for styling.

## `meta`

```ts
import type { Meta } from "../../tokens/types";

export const meta =
{ name: "button"
, element: "button"
, cssProperties:
  [ "background", "color", "border-color", "border-width", "border-radius"
  , "padding-block", "padding-inline", "gap", "font-size", "font-weight"
  , "outline-color", "outline-width", "outline-offset"
  , "transform", "opacity", "transition-duration"
  ]
, variants: ["secondary", "primary", "tertiary", "danger"]
, states: ["static", "hover", "focus", "active", "disabled"]
, structure:
  { static:
    { display: "inline-flex", "align-items": "center", "justify-content": "center"
    , "white-space": "nowrap", cursor: "pointer", "border-style": "solid"
    , "outline-style": "solid", "transition-property": "background, color, border-color, transform"
    }
  , disabled: { cursor: "not-allowed" }
  }
} as const satisfies Meta;
```

| Field | Required | Meaning |
| --- | --- | --- |
| `name` | yes | Token prefix and, for class components, the class name. Lowercase kebab-case. |
| `element` | no | The native element this component wraps (`button`, `input`, `table`, `details`…). If set, it is an **element component** selected by element name. If absent, it is a **class component** selected by `.<name>`. |
| `cssProperties` | yes | Themable CSS properties. Each gets L3, L4 and L5 tokens. |
| `variants` | yes | Variant names from [variants](variants.md). Must include `secondary`. |
| `states` | yes | State names from [states](states.md). Must include `static`. |
| `structure` | no | Structural literals, keyed by state. See Structure. |
| `pseudoElements` | no | Themable properties of pseudo-elements. See Pseudo-elements. |
| `channels` | no | Explicit state → properties assignment, replacing the defaults in [states](states.md#co-occurring-states-and-channels). |

The token matrix is exactly `cssProperties × variants × states`, plus the same for each pseudo-element.

## `structure`

Non-themable declarations (see [tokens](tokens.md#structural-values)), keyed by state:

```ts
structure:
{ static: { display: "grid", overflow: "hidden" }
, open: { "content-visibility": "visible" }
}
```

- Values are literals. No `var()`.
- A property may not appear in both `structure` and `cssProperties`.
- Structural declarations are the same for every variant. A value that differs by variant is themable by definition.
- `animation-name` may name a keyframe from the helpers. Its timing goes in `cssProperties` (`animation-duration`).

## Third-party custom properties

A component that wraps a third-party widget (SVAR grid, xyflow) themes it through the widget's own custom properties. They are listed in `cssProperties` like any CSS property:

```ts
cssProperties: ["background", "--wx-background", "--wx-color-primary", "--xy-edge-stroke"]
```

The token drops the leading dashes (`--datatable-wx-background-secondary-static`). The generated CSS sets the widget's property: `.datatable { --wx-background: var(--datatable-wx-background-secondary-static); }`. Their type (fill, ink, edge, other) is given in `meta.types`, because it can't be inferred from the name.

## `pseudoElements`

```ts
pseudoElements:
{ "::placeholder": ["color"]
, "::details-content": ["transition-duration"]
}
```

Each listed property gets the full matrix under a name that includes the pseudo-element: `--input-placeholder-color-secondary-static`. The CSS rule is the component's selector plus the pseudo-element (`:where(input)::placeholder`). Pseudo-elements take the same `structure` shape, as `pseudoStructure`.

## Sub-parts

There are no sub-part declarations and no descendant selectors.

The inner elements of a component are styled by their own element components (`button`, `h2`, `figure`, `a`). They are influenced by their container only through inheritance: `color`, the font properties and `em`-based lengths.

If an inner part needs its own styling, it becomes a component, with its own schema, class and tokens. Its class outranks the element rules (see [css-output](css-output.md)).

## Validation

Before generation, each schema is checked:

- `name` is unique, kebab-case, and doesn't collide with a variant name or a helper class.
- Variants and states are from the allowed sets, unique, and include the defaults.
- `cssProperties` are unique, and each is a known CSS property or a `--` custom property.
- Every `cssProperties` entry has an L2 default (`--<property>`) or an L3 override.
- `structure` keys are listed states, and its properties don't overlap `cssProperties`.
- Channels are valid and disjoint for co-occurring states, and every state has one.
