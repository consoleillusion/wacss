import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "button"
, element: "button"
, cssProperties:
    [ "background"
    , "color"
    , "border-color"
    , "border-width"
    , "border-radius"
    , "padding-block"
    , "padding-inline"
    , "font-size"
    , "font-size-small"
    , "accent-color"
    , "gap"
    , "height"
    , "height-sm"
    , "height-lg"
    , "height-icon"
    , "outline-color"
    , "outline-width"
    , "outline-offset"
    , "transform"
    , "opacity"
    , "filter"
    , "transition-duration"
    , "text-decoration-line"
    , "text-underline-offset"
    ]
, variants: ["secondary", "primary", "tertiary", "danger"]
, states: ["static", "hover", "focus", "active", "disabled", "loading"]
, structure:
  { static:
    { appearance: "none"
    , display: "inline-flex"
    , "align-items": "center"
    , "justify-content": "center"
    , "white-space": "nowrap"
    , "border-style": "solid"
    , "outline-style": "solid"
    , "line-height": "1"
    , cursor: "pointer"
    , "transition-property": "background, color, border-color, transform"
    }
  , disabled: { cursor: "not-allowed" }
  , loading: { position: "relative" }
  }
} as const satisfies Meta;

export const component =
{ title: "Button"
, description: "A styled action element. Renders a button or an anchor when href is set."
, type: "object"
, properties:
    { ...commonAttributes
    , variant:
        { type: "string"
        , enum: ["default", "primary", "secondary", "destructive", "link"]
        , default: "default"
        }
    , size: { type: "string", enum: ["sm", "md", "lg", "icon"], default: "md" }
    , type: { type: "string", enum: ["button", "submit", "reset"], default: "button" }
    , href: { type: "string", description: "Renders an anchor instead of a button." }
    , loading: { type: "boolean", default: false }
    , disabled: { type: "boolean", default: false }
    }
, additionalProperties: true
} as const;
