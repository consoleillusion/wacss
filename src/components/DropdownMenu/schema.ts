import { commonAttributes } from "../component";

export const style =
{ properties:
    [ { property: "background" }
    , { property: "border" }
    , { property: "color" }
    , { property: "radius" }
    , { property: "shadow" }
    , { property: "padding" }
    , { property: "item-radius" }
    , { property: "item-padding-block" }
    , { property: "item-padding-inline" }
    , { property: "item-font-size" }
    , { property: "item-gap" }
    , { property: "item-indicator-size" }
    , { property: "item-background", states: ["highlighted"] }
    , { property: "item-color", states: ["highlighted"] }
    ]
, states: ["static", "highlighted"]
} as const;

export const component =
{ title: "DropdownMenu"
, type: "object"
, properties:
    { ...commonAttributes
    , disabled: { type: "boolean", default: false }
    , loop: { type: "boolean", default: false }
    }
, additionalProperties: true
} as const;
