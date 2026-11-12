import { commonAttributes } from "../component";

export const style =
{ properties:
    [ { property: "background", states: ["hover"] }
    , { property: "border" }
    , { property: "color", states: ["hover"] }
    , { property: "radius" }
    , { property: "padding-block" }
    , { property: "padding-inline" }
    , { property: "font-size" }
    , { property: "gap" }
    , { property: "height" }
    , { property: "height-sm" }
    , { property: "height-lg" }
    , { property: "height-icon" }
    ]
, states: ["static", "hover"]
} as const;

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
