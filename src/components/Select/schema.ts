import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "select"
, cssProperties:
    [ "background"
    , "border-color"
    , "color"
    , "item-background"
    , "item-color"
    , "item-border-radius"
    , "border-radius"
    , "height"
    , "trigger-gap"
    , "trigger-border-width"
    , "trigger-font-weight"
    , "trigger-transition"
    , "trigger-box-shadow-focus-ring-span"
    , "icon-transition"
    , "content-max-height"
    , "content-border-width"
    , "content-animation"
    , "content-closed-animation"
    , "item-padding-space"
    , "item-opacity"
    , "item-font-weight"
    , "item-indicator-inset-inline-start"
    , "scroll-up-button-height"
    , "scroll-up-button-color"
    , "opacity"
    , "outline-color"
    , "outline-offset"
    , "box-shadow"
    ]
, variants: ["secondary"]
, states: ["static", "hover", "focus", "open", "highlighted", "disabled"]
, structure:
  { static:
    { display: "inline-flex"
    , "align-items": "center"
    , "justify-content": "space-between"
    , "text-align": "start"
    , width: "100%"
    , "border-style": "solid"
    , "outline-style": "solid"
    , cursor: "pointer"
    }
  , disabled: { cursor: "not-allowed", "pointer-events": "none" }
  }
} as const satisfies Meta;

export const component =
{ title: "Select"
, description: "A data-driven select with single or multiple selection and persistence."
, type: "object"
, properties:
    { ...commonAttributes
    , options:
        { type: "array"
        , description: "Selectable options."
        , items:
            { type: "object"
            , properties:
                { value: { type: "string" }
                , label: { type: "string" }
                , disabled: { type: "boolean", default: false }
                }
            , required: ["value", "label"]
            }
        }
    , type: { type: "string", enum: ["single", "multiple"], default: "single" }
    , value: { type: ["string", "array"], description: "Selected value(s)." }
    , placeholder: { type: "string", default: "Select an option" }
    , disabled: { type: "boolean", default: false }
    , required: { type: "boolean", default: false }
    , name: { type: "string" }
    , triggerProps:
        { type: "object"
        , description: "Extra attributes for the trigger button (id, aria-*, data-*)."
        , additionalProperties: true
        }
    , storageKey: { type: "string", default: "wacss:select" }
    , persist: { type: "boolean", default: true }
    }
, additionalProperties: true
} as const;
