import { commonAttributes } from "../component";

export const style =
{ properties:
    [ { property: "background" }
    , { property: "border", states: ["focus", "invalid"] }
    , { property: "color" }
    , { property: "placeholder-color" }
    , { property: "radius" }
    , { property: "padding-block" }
    , { property: "padding-inline" }
    , { property: "height" }
    , { property: "font-size" }
    , { property: "ring", states: ["focus", "invalid"] }
    ]
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
