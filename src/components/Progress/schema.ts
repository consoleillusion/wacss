import { commonAttributes } from "../component";

export const meta =
{ name: "progress"
, cssProperties:
    [ "track"
    , "indicator"
    , "height"
    , "border-radius"
    , "div-transition"
    , "div-animation"
    ]
, roles: ["standard"]
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
