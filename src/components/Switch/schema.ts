import { commonAttributes } from "../component";

export const style =
{ properties:
    [ { property: "track", states: ["hover", "checked"] }
    , { property: "thumb", states: ["hover", "checked"] }
    , { property: "width" }
    , { property: "height" }
    , { property: "thumb-size" }
    ]
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
