import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "popover"
, cssProperties:
    [ "background"
    , "border-color"
    , "border-width"
    , "border-radius"
    , "box-shadow"
    , "color"
    , "padding"
    , "content-padding"
    , "min-width"
    , "inline-size"
    , "z-index"
    , "animation-duration"
    , "animation-timing-function"
    ]
, variants: ["secondary"]
, states: ["static", "open"]
, structure:
  { static: { overflow: "hidden", "border-style": "solid" }
  , open: { "animation-name": "wacss-fade-in-fast" }
  }
} as const satisfies Meta;

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
