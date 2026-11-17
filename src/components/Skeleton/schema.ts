import { commonAttributes } from "../component";

export const meta =
{ name: "skeleton"
, cssProperties:
    [ "background"
    , "gap"
    , "circle-animation"
    , "circle-inline-size"
    , "circle-block-size"
    , "circle-border-radius"
    , "bar-block-size"
    , "bar-border-radius"
    ]
, roles: ["standard"]
, states: ["static"]
} as const;

export const component =
{ title: "Skeleton"
, description: "A quiet placeholder that pulses while content loads."
, type: "object"
, properties:
    { ...commonAttributes
    , lines: { type: "number", default: 1, description: "Number of bar lines to render." }
    , circle:
        { type: "boolean"
        , default: false
        , description: "Render an avatar-sized circle instead of bars."
        }
    }
, additionalProperties: true
} as const;
