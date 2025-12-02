import { commonAttributes } from "../component";

export const meta =
{ name: "popover"
, cssProperties: ["background", "border", "color", "radius", "shadow", "padding", "min-width", "z"]
, roles: ["standard"]
, states: ["static"]
} as const;

export const component =
{ title: "Popover"
, type: "object"
, properties:
    { ...commonAttributes
    , open: { type: "boolean", default: false }
    , openOnHover: { type: "boolean", default: false }
    }
, additionalProperties: true
} as const;
