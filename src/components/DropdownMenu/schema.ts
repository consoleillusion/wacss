import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "menu"
, cssProperties:
    [ "background"
    , "border-color"
    , "border-width"
    , "border-radius"
    , "box-shadow"
    , "color"
    , "padding"
    , "opacity"
    , "animation-duration"
    , "animation-timing-function"
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
    , "dropdown-menu-item-opacity"
    , "dropdown-menu-separator-height"
    , "dropdown-menu-separator-background"
    , "dropdown-menu-separator-margin-space"
    , "dropdown-menu-group-heading-padding-space"
    , "dropdown-menu-group-heading-font-size"
    , "dropdown-menu-group-heading-font-weight"
    , "dropdown-menu-group-heading-color"
    , "dropdown-menu-checkbox-item-indicator-inset-inline-start"
    ]
, variants: ["secondary"]
, states: ["static", "highlighted", "open", "disabled"]
, structure:
  { static: { overflow: "hidden", "border-style": "solid" }
  , open: { "animation-name": "wacss-fade-in-fast" }
  , disabled: { "pointer-events": "none" }
  }
} as const satisfies Meta;

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
