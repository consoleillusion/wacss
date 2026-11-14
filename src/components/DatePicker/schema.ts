import { commonAttributes } from "../component";

export const style = { properties: [], states: ["static"] } as const;

export const component =
{ title: "DatePicker"
, description: "A date picker composed with bits-ui DatePicker primitives."
, type: "object"
, properties:
    { ...commonAttributes
    , value: { type: "string", description: "Selected date as ISO string (YYYY-MM-DD)." }
    , label: { type: "string" }
    , description: { type: "string" }
    , placeholder: { type: "string" }
    , disabled: { type: "boolean", default: false }
    }
, additionalProperties: true
} as const;
