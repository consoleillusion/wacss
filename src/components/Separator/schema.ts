import { commonAttributes } from "../component";

export const style = { properties: [{ property: "color" }], states: ["static"] } as const;

export const component =
{ title: "Separator"
, type: "object"
, properties: { ...commonAttributes, decorative: { type: "boolean", default: false } }
, additionalProperties: true
} as const;
