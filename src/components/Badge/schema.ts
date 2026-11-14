import { commonAttributes } from "../component";

export const style =
{ properties:
    [ { property: "background" }
    , { property: "border" }
    , { property: "color" }
    , { property: "radius" }
    , { property: "padding-block" }
    , { property: "padding-inline" }
    , { property: "font-size" }
    , { property: "line-height" }
    , { property: "font-weight" }
    ]
, states: ["static"]
} as const;

export const component =
{ title: "Badge"
, type: "object"
, properties:
    { ...commonAttributes
    , as: { type: "string", default: "span" }
    , variant: { type: "string", enum: ["default", "positive", "neutral", "negative"] }
    }
, additionalProperties: true
} as const;
