import { commonAttributes } from "../component";

export const meta =
{ name: "menu"
, cssProperties: ["background", "border", "color", "radius", "shadow", "padding", "item-radius", "item-padding-block", "item-padding-inline", "item-font-size", "item-gap", "item-indicator-size", "item-background", "item-color"]
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
