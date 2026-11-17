import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "label"
, element: "label"
, cssProperties:
    [ "color"
    , "font-size"
    , "font-weight"
    , "line-height"
    ]
, variants: ["secondary"]
, states: ["static"]
} as const satisfies Meta;

export const component =
{ title: "Label"
, description: "A styled label associated with a form control."
, type: "object"
, properties:
    { ...commonAttributes
    , for: { type: "string", description: "The id of the associated control." }
    , text: { type: "string" }
    , required: { type: "boolean", default: false }
    }
, additionalProperties: true
} as const;
