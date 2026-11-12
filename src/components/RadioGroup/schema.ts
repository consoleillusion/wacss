import { commonAttributes } from "../component";

export const style =
{ properties:
    [ { property: "background", states: ["checked"] }
    , { property: "border", states: ["checked"] }
    , { property: "dot" }
    , { property: "size" }
    ]
, states: ["static", "checked"]
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
