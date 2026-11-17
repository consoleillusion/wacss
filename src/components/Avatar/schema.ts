import { commonAttributes } from "../component";

export const meta =
{ name: "avatar"
, cssProperties:
    [ "size"
    , "size-sm"
    , "size-lg"
    , "fallback-background"
    , "fallback-color"
    , "border-radius"
    , "image-font-size"
    , "image-font-weight"
    ]
, roles: ["standard"]
, states: ["static"]
} as const;

export const component =
{ title: "Avatar"
, type: "object"
, properties: { ...commonAttributes, src: { type: "string" }, alt: { type: "string" } }
, additionalProperties: true
} as const;
