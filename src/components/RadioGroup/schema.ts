import { commonAttributes } from "../component";

export const meta =
{ name: "radio"
, cssProperties:
    [ "background"
    , "border-color"
    , "dot"
    , "size"
    , "group-gap"
    , "group-item-border-width"
    , "group-item-transition"
    , "group-item-outline"
    , "group-item-opacity"
    , "input-accent-color"
    ]
, roles: ["standard"]
, states: ["static", "hover", "checked"]
} as const;

export const component =
{ title: "RadioGroup"
, type: "object"
, properties:
    { ...commonAttributes
    , value: { type: "string" }
    , required: { type: "boolean", default: false }
    , name: { type: "string" }
    , loop: { type: "boolean", default: false }
    , disabled: { type: "boolean", default: false }
    }
, additionalProperties: true
} as const;
