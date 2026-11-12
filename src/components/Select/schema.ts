import { commonAttributes } from "../component";

export const style =
{ properties:
    [ { property: "background" }
    , { property: "border" }
    , { property: "color" }
    , { property: "item-background", states: ["highlighted"] }
    , { property: "item-color", states: ["highlighted"] }
    , { property: "item-radius" }
    , { property: "radius" }
    , { property: "height" }
    ]
, states: ["static", "highlighted"]
} as const;

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
