import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "field"
, cssProperties:
    [ "gap"
    , "description-color"
    ]
, variants: ["secondary"]
, states: ["static"]
, structure:
  { static: { display: "grid" }
  }
} as const satisfies Meta;

export const component =
{ title: "Field"
, type: "object"
, properties:
    { ...commonAttributes
    , id: { type: "string", description: "Control id used for label and help/error ids." }
    , label: { type: "string" }
    , help: { type: "string" }
    , error: { type: "string" }
    , required: { type: "boolean", default: false }
    }
, additionalProperties: true
} as const;
