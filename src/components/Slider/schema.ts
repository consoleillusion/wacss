import { commonAttributes } from "../component";

export const style =
{ properties:
    [ { property: "track" }
    , { property: "range" }
    , { property: "thumb" }
    , { property: "thumb-border" }
    , { property: "thumb-size" }
    ]
, states: ["static"]
} as const;

export const component =
{ title: "Slider"
, description: "A range slider."
, type: "object"
, properties:
    { ...commonAttributes
    , value: { type: "number" }
    , min: { type: "number", default: 0 }
    , max: { type: "number", default: 100 }
    , step: { type: "number", default: 1 }
    , disabled: { type: "boolean", default: false }
    }
, additionalProperties: true
} as const;
