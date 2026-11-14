import { commonAttributes } from "../component";

export const style = { properties: [], states: ["static"] } as const;

export const component =
{ title: "Color"
, description: "A color selector with swatch and hex value input."
, type: "object"
, properties:
    { ...commonAttributes
    , value: { type: "string", description: "Selected color value." }
    , label: { type: "string" }
    , description: { type: "string" }
    , disabled: { type: "boolean", default: false }
    }
, additionalProperties: true
} as const;
