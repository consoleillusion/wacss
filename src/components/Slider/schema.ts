import { commonAttributes } from "../component";

export const meta =
{ name: "slider"
, cssProperties:
    [ "track"
    , "range"
    , "thumb"
    , "thumb-border-color"
    , "thumb-size"
    , "track-border-radius"
    , "thumb-box-shadow"
    , "thumb-transition"
    , "thumb-focus-visible-box-shadow"
    , "opacity"
    ]
, roles: ["standard"]
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
