import { commonAttributes } from "../component";

export const meta =
{ name: "alert"
, cssProperties: ["icon", "background", "border"]
, roles: ["informational", "positive", "warn", "danger"]
, states: ["static"]
} as const;

export const component =
{ title: "Alert"
, description: "A block-level callout for messages that deserve attention."
, type: "object"
, properties:
    { ...commonAttributes
    , variant:
        { type: "string", enum: ["info", "positive", "warning", "destructive"], default: "info" }
    , title: { type: "string" }
    , description: { type: "string" }
    }
, additionalProperties: true
} as const;
