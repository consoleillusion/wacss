import { commonAttributes } from "../component";

export const meta =
{ name: "dialog"
, cssProperties:
    [ "background"
    , "border-color"
    , "color"
    , "overlay"
    , "border-radius"
    , "box-shadow"
    , "padding"
    , "gap"
    , "max-width"
    , "max-height"
    , "z-index"
    , "content-border-width"
    , "overlay-animation"
    , "overlay-closed-animation"
    , "content-animation"
    , "content-closed-animation"
    , "title-font-size"
    , "title-font-weight"
    , "title-line-height"
    , "description-font-size"
    , "header-gap"
    , "body-gap"
    , "body-font-size"
    , "footer-gap"
    , "close-right"
    , "close-top"
    , "close-border-radius"
    , "close-padding"
    ]
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
