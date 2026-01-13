import { commonAttributes } from "../component";

export const meta =
{ name: "switch"
, cssProperties:
    [ "track"
    , "thumb"
    , "width"
    , "height"
    , "thumb-size"
    , "border-radius"
    , "border"
    , "transition"
    , "box-shadow-focus-ring-span"
    , "opacity"
    , "inset-inline-start"
    , "box-shadow"
    , "transition-2"
    , "translate-space"
    , "translate-border-width"
    ]
, roles: ["standard"]
, states: ["static", "hover", "checked"]
} as const;

export const component =
{ title: "Switch"
, description: "A styled switch with label, description, and persistence."
, type: "object"
, properties:
    { ...commonAttributes
    , checked: { type: "boolean", default: false }
    , label: { type: "string" }
    , description: { type: "string" }
    , disabled: { type: "boolean", default: false }
    , required: { type: "boolean", default: false }
    , name: { type: "string" }
    , value: { type: "string" }
    , storageKey: { type: "string", default: "wacss:switch" }
    , persist: { type: "boolean", default: true }
    }
, additionalProperties: true
} as const;
