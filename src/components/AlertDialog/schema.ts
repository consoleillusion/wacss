import { commonAttributes } from "../component";

export const style = { properties: [], states: ["static"] } as const;

export const component =
{ title: "AlertDialog"
, type: "object"
, properties: { ...commonAttributes, open: { type: "boolean", default: false } }
, additionalProperties: true
} as const;
