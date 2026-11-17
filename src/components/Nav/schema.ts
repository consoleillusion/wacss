import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "nav"
, element: "nav"
, cssProperties: []
, variants: ["secondary"]
, states: ["static"]
} as const satisfies Meta;

export const component =
{ title: "Nav"
, type: "object"
, properties: { ...commonAttributes, label: { type: "string" } }
, additionalProperties: true
} as const;
