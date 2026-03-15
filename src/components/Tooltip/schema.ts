import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "tooltip"
, cssProperties:
    [ "background"
    , "border-color"
    , "border-width"
    , "border-radius"
    , "box-shadow"
    , "color"
    , "padding-block"
    , "padding-inline"
    , "font-size"
    , "max-inline-size"
    , "animation-duration"
    , "animation-timing-function"
    ]
, variants: ["secondary"]
, states: ["static"]
, structure:
  { static:
    { width: "fit-content"
    , "border-style": "solid"
    , "animation-name": "wacss-fade-in-fast"
    }
  }
} as const satisfies Meta;

export const component =
{ title: "Tooltip"
, type: "object"
, properties: { ...commonAttributes, disabled: { type: "boolean", default: false } }
, additionalProperties: true
} as const;
