import { commonAttributes } from "../component";

export const meta =
{ name: "table"
, cssProperties: ["head-color", "head-weight", "cell-padding-block", "cell-padding-inline", "row-border", "row-background"]
, roles: ["standard"]
, states: ["static", "hover"]
} as const;

export const component =
{ title: "Table"
, type: "object"
, properties: { ...commonAttributes }
, additionalProperties: true
} as const;
