import { commonAttributes } from "../component";

export const style =
{ properties: [{ property: "track" }, { property: "indicator" }, { property: "height" }]
, states: ["static"]
} as const;

export const component =
{ title: "Progress"
, type: "object"
, properties:
    { ...commonAttributes
    , value: { type: "number" }
    , max: { type: "number", default: 100 }
    , disabled: { type: "boolean", default: false }
    }
, additionalProperties: true
} as const;
