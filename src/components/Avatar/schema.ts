import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "avatar"
, cssProperties:
    [ "size"
    , "size-sm"
    , "size-lg"
    , "inline-size"
    , "block-size"
    , "background"
    , "color"
    , "border-radius"
    , "font-size"
    , "font-weight"
    ]
, variants: ["secondary"]
, states: ["static"]
, structure:
    { static:
        { position: "relative"
        , display: "inline-flex"
        , "align-items": "center"
        , "justify-content": "center"
        , "flex-shrink": "0"
        , overflow: "hidden"
        }
    }
} as const satisfies Meta;

export const component =
{ title: "Avatar"
, type: "object"
, properties: { ...commonAttributes, src: { type: "string" }, alt: { type: "string" } }
, additionalProperties: true
} as const;
