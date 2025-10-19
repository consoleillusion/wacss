import { commonAttributes } from "../component";

export const style =
{ properties:
    [ { property: "border" }
    , { property: "trigger-color" }
    , { property: "content-color" }
    , { property: "trigger-padding-block" }
    , { property: "transition" }
    ]
, states: ["static"]
} as const;

export const component =
{ title: "Accordion"
, description: "A data-driven accordion with single or multiple open items."
, type: "object"
, properties:
    { ...commonAttributes
    , items:
        { type: "array"
        , description: "Accordion items."
        , items:
            { type: "object"
            , properties:
                { value: { type: "string" }
                , title: { type: "string" }
                , content: { type: "string" }
                , disabled: { type: "boolean", default: false }
                }
            , required: ["value", "title"]
            }
        }
    , type: { type: "string", enum: ["single", "multiple"], default: "single" }
    , value: { type: ["string", "array"], description: "Open item value(s)." }
    , disabled: { type: "boolean", default: false }
    , loop: { type: "boolean", default: true }
    , orientation: { type: "string", enum: ["horizontal", "vertical"], default: "vertical" }
    , storageKey: { type: "string", default: "wacss:accordion" }
    , persist: { type: "boolean", default: true }
    }
, additionalProperties: true
} as const;
