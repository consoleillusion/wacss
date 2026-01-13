import { commonAttributes } from "../component";

export const meta =
{ name: "alert-dialog"
, cssProperties:
    [ "content-border-width"
    , "overlay-animation"
    , "content-animation"
    , "content-closed-animation"
    , "title-font-size"
    , "title-font-weight"
    , "title-line-height"
    , "description-font-size"
    ]
, roles: ["standard"]
, states: ["static"]
} as const;

export const component =
{ title: "AlertDialog"
, type: "object"
, properties: { ...commonAttributes, open: { type: "boolean", default: false } }
, additionalProperties: true
} as const;
