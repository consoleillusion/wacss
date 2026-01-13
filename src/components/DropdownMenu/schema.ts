import { commonAttributes } from "../component";

export const meta =
{ name: "menu"
, cssProperties:
    [ "background"
    , "border-color"
    , "color"
    , "border-radius"
    , "box-shadow"
    , "padding"
    , "item-border-radius"
    , "item-padding-block"
    , "item-padding-inline"
    , "item-font-size"
    , "item-gap"
    , "item-indicator-size"
    , "item-background"
    , "item-color"
    , "dropdown-menu-trigger-box-shadow"
    , "svg-transition"
    , "shortcut-font-size"
    , "shortcut-color"
    ]
, roles: ["standard"]
, states: ["static", "highlighted"]
} as const;

export const component =
{ title: "DropdownMenu"
, type: "object"
, properties:
    { ...commonAttributes
    , disabled: { type: "boolean", default: false }
    , loop: { type: "boolean", default: false }
    }
, additionalProperties: true
} as const;
