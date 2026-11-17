import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "alert-dialog"
, cssProperties:
    [ "background"
    , "border-color"
    , "border-width"
    , "border-radius"
    , "box-shadow"
    , "color"
    , "padding"
    , "gap"
    , "max-width"
    , "max-height"
    , "z-index"
    , "overlay"
    , "animation-duration"
    , "animation-timing-function"
    , "title-font-size"
    , "title-font-weight"
    , "title-line-height"
    , "description-font-size"
    ]
, variants: ["secondary"]
, states: ["static", "open"]
, structure:
  { static:
    { position: "fixed"
    , left: "50%"
    , top: "50%"
    , display: "grid"
    , width: "100%"
    , "overflow-y": "auto"
    , transform: "translate(-50%, -50%)"
    , "border-style": "solid"
    }
  , open: { "animation-name": "wacss-pop-in" }
  }
} as const satisfies Meta;

export const component =
{ title: "AlertDialog"
, type: "object"
, properties: { ...commonAttributes, open: { type: "boolean", default: false } }
, additionalProperties: true
} as const;
