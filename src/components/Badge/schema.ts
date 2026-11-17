import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "badge"
, cssProperties:
    [ "background"
    , "color"
    , "border-color"
    , "border-width"
    , "border-radius"
    , "padding-block"
    , "padding-inline"
    , "font-size"
    , "font-weight"
    , "line-height"
    , "transition"
    ]
, variants: ["secondary", "tertiary", "informational", "positive", "warning", "danger"]
, states: ["static"]
, structure:
  { static:
    { display: "inline-flex"
    , "align-items": "center"
    , "inline-size": "fit-content"
    , "border-style": "solid"
    }
  }
} as const satisfies Meta;

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
