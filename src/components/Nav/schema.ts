import { commonAttributes } from "../component";

export const style = { properties: [], states: ["static"] } as const;

export const component =
{ title: "Nav"
, type: "object"
, properties: { ...commonAttributes, label: { type: "string" } }
, additionalProperties: true
} as const;
