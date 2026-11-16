import { commonAttributes } from "../component";

export const meta =
{ name: "dialog"
, cssProperties: ["background", "border", "color", "overlay", "radius", "shadow", "padding", "gap", "max-width", "max-height", "z"]
, roles: ["standard"]
, states: ["static"]
} as const;

export const component =
{ title: "Dialog"
, description: "A modal dialog with a trigger, title, description, body, and footer."
, type: "object"
, properties:
    { ...commonAttributes
    , open: { type: "boolean", default: false }
    , title: { type: "string" }
    , description: { type: "string" }
    , triggerLabel: { type: "string", default: "Open dialog" }
    , closeLabel: { type: "string", default: "Close dialog" }
    }
, additionalProperties: true
} as const;
