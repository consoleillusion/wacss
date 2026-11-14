import { commonAttributes } from "../component";

export const style =
{ properties:
    [ { property: "icon-info" }
    , { property: "icon-warning" }
    , { property: "icon-positive" }
    , { property: "icon-destructive" }
    , { property: "background-info" }
    , { property: "background-warning" }
    , { property: "background-positive" }
    , { property: "background-destructive" }
    , { property: "border-info" }
    , { property: "border-warning" }
    , { property: "border-positive" }
    , { property: "border-destructive" }
    ]
, states: ["static"]
} as const;

export const component =
{ title: "Alert"
, description: "A block-level callout for messages that deserve attention."
, type: "object"
, properties:
    { ...commonAttributes
    , variant:
        { type: "string", enum: ["info", "positive", "warning", "destructive"], default: "info" }
    , title: { type: "string" }
    , description: { type: "string" }
    }
, additionalProperties: true
} as const;
