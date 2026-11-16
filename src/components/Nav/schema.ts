import { commonAttributes } from "../component";

export const meta =
{ name: "nav-prim"
, cssProperties: []
, roles: ["standard"]
, states: ["static"]
} as const;

export const component =
{ title: "Nav"
, type: "object"
, properties: { ...commonAttributes, label: { type: "string" } }
, additionalProperties: true
} as const;
