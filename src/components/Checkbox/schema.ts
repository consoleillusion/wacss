import { commonAttributes } from "../component";

export const style =
{ properties:
    [ { property: "background", states: ["checked"] }
    , { property: "border", states: ["checked"] }
    , { property: "color" }
    , { property: "size" }
    , { property: "radius" }
    ]
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
