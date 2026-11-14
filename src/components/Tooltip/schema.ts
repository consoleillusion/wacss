import { commonAttributes } from "../component";

export const style =
{ properties:
    [ { property: "background" }
    , { property: "border" }
    , { property: "color" }
    , { property: "radius" }
    , { property: "shadow" }
    , { property: "padding-block" }
    , { property: "padding-inline" }
    , { property: "font-size" }
    ]
, states: ["static"]
} as const;

export const component =
{ title: "Tooltip"
, type: "object"
, properties: { ...commonAttributes, disabled: { type: "boolean", default: false } }
, additionalProperties: true
} as const;
