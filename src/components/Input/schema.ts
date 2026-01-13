import { commonAttributes } from "../component";

export const meta =
{ name: "input"
, cssProperties:
    [ "background"
    , "border-color"
    , "color"
    , "placeholder-color"
    , "border-radius"
    , "padding-block"
    , "padding-inline"
    , "height"
    , "font-size"
    , "ring"
    , "field-description-font-size"
    , "field-error-font-size"
    , "field-error-color"
    , "gap"
    ]
, roles: ["standard"]
, states: ["static", "focus", "invalid"]
} as const;

export const component =
{ title: "Input"
, description: "A labelled text input with optional description, error, and persistence."
, type: "object"
, properties:
    { ...commonAttributes
    , value: { type: "string" }
    , type: { type: "string", default: "text" }
    , placeholder: { type: "string" }
    , label: { type: "string" }
    , description: { type: "string" }
    , error: { type: "string" }
    , disabled: { type: "boolean", default: false }
    , readonly: { type: "boolean", default: false }
    , required: { type: "boolean", default: false }
    , name: { type: "string" }
    , storageKey: { type: "string", default: "wacss:input" }
    , persist: { type: "boolean", default: true }
    }
, additionalProperties: true
} as const;
