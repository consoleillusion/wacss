import { commonAttributes } from "../component";

export const style =
{ properties: [{ property: "gap" }, { property: "description-color" }]
, states: ["static"]
} as const;

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
