import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "radio"
, cssProperties:
    [ "background"
    , "border-color"
    , "dot"
    , "size"
    , "group-gap"
    , "group-item-border-width"
    , "group-item-transition"
    , "group-item-outline"
    , "group-item-opacity"
    , "input-accent-color"
    , "box-shadow"
    , "outline-color"
    , "opacity"
    ]
, variants: ["secondary"]
, states: ["static", "hover", "focus", "checked", "disabled"]
, structure:
  { static:
    { display: "grid"
    , "outline-style": "solid"
    }
  , disabled: { "pointer-events": "none" }
  }
} as const satisfies Meta;

export const component =
{ title: "RadioGroup"
, type: "object"
, properties:
    { ...commonAttributes
    , value: { type: "string" }
    , required: { type: "boolean", default: false }
    , name: { type: "string" }
    , loop: { type: "boolean", default: false }
    , disabled: { type: "boolean", default: false }
    }
, additionalProperties: true
} as const;
