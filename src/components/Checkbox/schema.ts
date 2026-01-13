import { commonAttributes } from "../component";

export const meta =
{ name: "checkbox"
, cssProperties:
    [ "background"
    , "border-color"
    , "color"
    , "size"
    , "border-radius"
    , "label-gap"
    , "label-font-size"
    , "label-font-weight"
    , "input-accent-color"
    , "gap"
    , "color-2"
    , "font-size"
    , "font-weight"
    , "hover-color"
    , "span-border-width"
    , "span-transition"
    , "span-background-lightness"
    ]
, roles: ["standard"]
, states: ["static", "checked"]
} as const;

export const component =
{ title: "Checkbox"
, description: "A styled checkbox with label, description, indeterminate state, and persistence."
, type: "object"
, properties:
    { ...commonAttributes
    , checked: { type: "boolean", default: false }
    , indeterminate: { type: "boolean", default: false }
    , label: { type: "string" }
    , description: { type: "string" }
    , disabled: { type: "boolean", default: false }
    , required: { type: "boolean", default: false }
    , readonly: { type: "boolean", default: false }
    , name: { type: "string" }
    , value: { type: "string" }
    , storageKey: { type: "string", default: "wacss:checkbox" }
    , persist: { type: "boolean", default: true }
    }
, additionalProperties: true
} as const;
