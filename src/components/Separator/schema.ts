import { commonAttributes } from "../component";

export const meta =
{ name: "separator"
, cssProperties: ["color"]
, roles: ["standard"]
, states: ["static"]
} as const;

export const component =
{ title: "Separator"
, type: "object"
, properties: { ...commonAttributes, decorative: { type: "boolean", default: false } }
, additionalProperties: true
} as const;
