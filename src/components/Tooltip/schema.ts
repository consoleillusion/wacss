import { commonAttributes } from "../component";

export const meta =
{ name: "tooltip"
, cssProperties:
    [ "background"
    , "border-color"
    , "color"
    , "border-radius"
    , "box-shadow"
    , "padding-block"
    , "padding-inline"
    , "font-size"
    , "content-border-width"
    , "content-animation"
    , "content-closed-animation"
    ]
, roles: ["standard"]
, states: ["static"]
} as const;

export const component =
{ title: "Tooltip"
, type: "object"
, properties: { ...commonAttributes, disabled: { type: "boolean", default: false } }
, additionalProperties: true
} as const;
