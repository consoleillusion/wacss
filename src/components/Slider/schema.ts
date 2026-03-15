import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "slider"
, cssProperties:
    [ "track"
    , "range"
    , "thumb"
    , "thumb-border-color"
    , "thumb-size"
    , "track-border-radius"
    , "thumb-box-shadow"
    , "thumb-transition"
    , "thumb-focus-visible-box-shadow"
    , "opacity"
    , "outline-color"
    , "outline-offset"
    ]
, variants: ["secondary"]
, states: ["static", "focus", "disabled"]
, structure:
  { static:
    { position: "relative"
    , display: "flex"
    , "align-items": "center"
    , width: "100%"
    , "touch-action": "none"
    , "user-select": "none"
    , "outline-style": "solid"
    }
  , disabled: { "pointer-events": "none" }
  }
} as const satisfies Meta;

export const component =
{ title: "Slider"
, description: "A range slider."
, type: "object"
, properties:
    { ...commonAttributes
    , value: { type: "number" }
    , min: { type: "number", default: 0 }
    , max: { type: "number", default: 100 }
    , step: { type: "number", default: 1 }
    , disabled: { type: "boolean", default: false }
    }
, additionalProperties: true
} as const;
