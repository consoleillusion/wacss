import { commonAttributes } from "../component";

export const style = { properties: [], states: ["static"] } as const;

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
