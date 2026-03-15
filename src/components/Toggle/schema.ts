import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "toggle"
, cssProperties:
    [ "background"
    , "color"
    , "border-color"
    , "border-width"
    , "border-radius"
    , "padding-block"
    , "padding-inline"
    , "font-size"
    , "outline-color"
    , "outline-width"
    , "box-shadow"
    , "transform"
    , "opacity"
    ]
, variants: ["secondary"]
, states: ["static", "hover", "focus", "active", "pressed", "disabled"]
, structure:
    { static:
        { display: "inline-flex"
        , "align-items": "center"
        , "justify-content": "center"
        , "border-style": "solid"
        , "outline-style": "solid"
        , cursor: "pointer"
        }
    , disabled: { cursor: "not-allowed" }
    }
} as const satisfies Meta;

export const component =
{ title: "Toggle"
, type: "object"
, properties: { ...commonAttributes, pressed: { type: "boolean", default: false } }
, additionalProperties: true
} as const;
