import { commonAttributes } from "../component";

export const style =
{ properties:
    [ { property: "background" }
    , { property: "border" }
    , { property: "color" }
    , { property: "radius" }
    , { property: "shadow" }
    , { property: "padding" }
    , { property: "min-width" }
    , { property: "z" }
    ]
, states: ["static"]
} as const;

export const component =
{ title: "Popover"
, type: "object"
, properties:
    { ...commonAttributes
    , open: { type: "boolean", default: false }
    , openOnHover: { type: "boolean", default: false }
    }
, additionalProperties: true
} as const;
