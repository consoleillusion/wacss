import { commonAttributes } from "../component";

export const meta =
{ name: "badge"
, cssProperties: ["background", "border", "color", "radius", "padding-block", "padding-inline", "font-size", "line-height", "font-weight"]
, roles: ["standard", "secondary", "tertiary", "positive", "danger"]
, states: ["static"]
} as const;

export const component =
{ title: "Badge"
, type: "object"
, properties:
    { ...commonAttributes
    , as: { type: "string", default: "span" }
    , variant: { type: "string", enum: ["default", "secondary", "destructive", "outline", "positive", "neutral", "negative"] }
    }
, additionalProperties: true
} as const;
