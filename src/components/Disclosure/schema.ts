import { commonAttributes } from "../component";

export const meta =
{ name: "disclosure"
, cssProperties: []
, roles: ["standard"]
, states: ["static"]
} as const;

export const component =
{ title: "Disclosure"
, type: "object"
, properties:
    { ...commonAttributes, summary: { type: "string" }, open: { type: "boolean", default: false } }
, additionalProperties: true
} as const;
