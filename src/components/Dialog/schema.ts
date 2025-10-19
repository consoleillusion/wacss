import { commonAttributes } from "../component";

export const style =
{ properties:
    [ { property: "background" }
    , { property: "border" }
    , { property: "color" }
    , { property: "overlay" }
    , { property: "radius" }
    , { property: "shadow" }
    , { property: "padding" }
    , { property: "gap" }
    , { property: "max-width" }
    , { property: "max-height" }
    , { property: "z" }
    ]
, states: ["static"]
} as const;

export const component =
{ title: "Dialog"
, description: "A modal dialog with a trigger, title, description, body, and footer."
, type: "object"
, properties:
    { ...commonAttributes
    , open: { type: "boolean", default: false }
    , title: { type: "string" }
    , description: { type: "string" }
    , triggerLabel: { type: "string", default: "Open dialog" }
    , closeLabel: { type: "string", default: "Close dialog" }
    }
, additionalProperties: true
} as const;
