import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "disclosure"
, element: "details"
, cssProperties:
    [ "border-color"
    , "border-block-end-width"
    , "color"
    ]
, variants: ["secondary"]
, states: ["static", "open"]
, structure:
  { static:
    { "inline-size": "100%"
    , "border-block-end-style": "solid"
    , cursor: "pointer"
    , "list-style": "none"
    , "text-align": "start"
    }
  }
} as const satisfies Meta;

export const component =
{ title: "Disclosure"
, type: "object"
, properties:
    { ...commonAttributes, summary: { type: "string" }, open: { type: "boolean", default: false } }
, additionalProperties: true
} as const;
