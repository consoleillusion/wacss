import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "progress"
, cssProperties:
    [ "background"
    , "color"
    , "height"
    , "border-radius"
    , "transition-duration"
    , "animation-duration"
    , "opacity"
    ]
, variants: ["secondary"]
, states: ["static", "disabled"]
, structure:
  { static:
    { position: "relative"
    , overflow: "hidden"
    , "inline-size": "100%"
    }
  }
} as const satisfies Meta;

export const component =
{ title: "Progress"
, type: "object"
, properties:
    { ...commonAttributes
    , value: { type: "number" }
    , max: { type: "number", default: 100 }
    , disabled: { type: "boolean", default: false }
    }
, additionalProperties: true
} as const;
