import { commonAttributes } from "../component";

export const style = { properties: [], states: ["static"] } as const;

export const component =
{ title: "AspectRatio"
, type: "object"
, properties: { ...commonAttributes, ratio: { type: "number" } }
, additionalProperties: true
} as const;
