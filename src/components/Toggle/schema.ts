import { commonAttributes } from "../component";

export const style = { properties: [], states: ["static"] } as const;

export const component =
{ title: "Toggle"
, type: "object"
, properties: { ...commonAttributes, pressed: { type: "boolean", default: false } }
, additionalProperties: true
} as const;
