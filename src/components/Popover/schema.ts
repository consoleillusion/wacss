import { commonAttributes } from "../component";

export const meta =
{ name: "popover"
, cssProperties:
    [ "background"
    , "border-color"
    , "color"
    , "border-radius"
    , "box-shadow"
    , "padding"
    , "min-width"
    , "z-index"
    , "content-border-width"
    , "content-animation"
    , "content-closed-animation"
    , "dropdown-menu-item-opacity"
    , "dropdown-menu-separator-height"
    , "dropdown-menu-separator-background"
    , "dropdown-menu-separator-margin-space"
    , "dropdown-menu-group-heading-padding-space"
    , "dropdown-menu-group-heading-font-size"
    , "dropdown-menu-group-heading-font-weight"
    , "dropdown-menu-group-heading-color"
    , "dropdown-menu-checkbox-item-indicator-inset-inline-start"
    , "content-padding"
    ]
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
