import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "separator"
, element: "hr"
, cssProperties:
    [ "background"
    , "height"
    , "margin"
    ]
, variants: ["secondary"]
, states: ["static"]
, structure:
  { static:
    { border: "none"
    , "flex-shrink": "0"
    , "inline-size": "100%"
    }
  }
} as const satisfies Meta;

export const component =
{ title: "Separator"
, type: "object"
, properties: { ...commonAttributes, decorative: { type: "boolean", default: false } }
, additionalProperties: true
} as const;
