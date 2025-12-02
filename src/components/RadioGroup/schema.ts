import { commonAttributes } from "../component";

export const meta =
{ name: "radio"
, cssProperties: ["background", "border", "dot", "size"]
, roles: ["standard"]
, states: ["static", "hover", "checked"]
} as const;

export const component =
{ title: "RadioGroup"
, type: "object"
, properties:
    { ...commonAttributes
    , value: { type: "string" }
    , required: { type: "boolean", default: false }
    , name: { type: "string" }
    , loop: { type: "boolean", default: false }
    , disabled: { type: "boolean", default: false }
    }
, additionalProperties: true
} as const;
