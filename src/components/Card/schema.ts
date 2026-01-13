import { commonAttributes } from "../component";

export const meta =
{ name: "card"
, cssProperties:
    [ "background"
    , "figure-background"
    , "border-color"
    , "color"
    , "description-color"
    , "border-radius"
    , "padding"
    , "box-shadow"
    , "title-font-size"
    , "border-width"
    , "textarea-gap"
    , "label-font-size"
    , "label-color"
    , "figcaption-padding-space"
    , "figcaption-font-size"
    , "gap"
    , "slot-card-header-gap"
    , "font-weight"
    , "line-height"
    , "font-size"
    , "slot-card-footer-gap"
    ]
, roles: ["standard"]
, states: ["static"]
} as const;

export const component =
{ title: "Card"
, description:
    "A surface for grouping content with optional header, text, and a figure (media or any wacss component)."
, type: "object"
, properties:
    { ...commonAttributes
    , as: { type: "string", enum: ["article", "section", "div"], default: "article" }
    , header: { type: "string", description: "Card header text." }
    , text: { type: "string", description: "Body text shown below the figure." }
    , figure:
        { type: "object"
        , description: "Figure data: media or a component schema instance identified by title."
        , additionalProperties: true
        }
    , footer: { type: "string" }
    }
, additionalProperties: true
} as const;
