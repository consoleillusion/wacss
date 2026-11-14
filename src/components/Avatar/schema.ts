import { commonAttributes } from "../component";

export const style =
{ properties:
    [ { property: "size" }
    , { property: "size-sm" }
    , { property: "size-lg" }
    , { property: "fallback-background" }
    , { property: "fallback-color" }
    ]
, states: ["static"]
} as const;

export const component =
{ title: "Avatar"
, type: "object"
, properties: { ...commonAttributes, src: { type: "string" }, alt: { type: "string" } }
, additionalProperties: true
} as const;
