import { commonAttributes } from "../component";

export const meta =
{ name: "aspect-ratio"
, cssProperties: []
, roles: ["standard"]
, states: ["static"]
} as const;

export const component =
{ title: "AspectRatio"
, type: "object"
, properties: { ...commonAttributes, ratio: { type: "number" } }
, additionalProperties: true
} as const;
