import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "alert"
, cssProperties:
    [ "background"
    , "color"
    , "border-color"
    , "border-width"
    , "border-radius"
    , "padding"
    , "gap"
    ]
, variants: ["secondary", "informational", "positive", "warning", "danger"]
, states: ["static"]
, structure:
  { static:
    { display: "grid"
    , "grid-template-columns": "auto 1fr"
    , "align-items": "start"
    , "border-style": "solid"
    }
  }
} as const satisfies Meta;

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
