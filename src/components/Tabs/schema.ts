import { commonAttributes } from "../component";

export const style =
{ properties:
    [ { property: "list-background" }
    , { property: "list-color" }
    , { property: "trigger-background", states: ["active"] }
    , { property: "trigger-color", states: ["hover", "active"] }
    , { property: "height" }
    , { property: "trigger-padding-block" }
    , { property: "trigger-padding-inline" }
    ]
, states: ["static", "hover", "active"]
} as const;

export const component =
{ title: "Tabs"
, description: "Data-driven tabs with optional panel content and persistence."
, type: "object"
, properties:
    { ...commonAttributes
    , tabs:
        { type: "array"
        , description: "Tab definitions."
        , items:
            { type: "object"
            , properties:
                { value: { type: "string" }
                , label: { type: "string" }
                , content: { type: "string" }
                , disabled: { type: "boolean", default: false }
                }
            , required: ["value", "label"]
            }
        }
    , value: { type: "string" }
    , orientation: { type: "string", enum: ["horizontal", "vertical"], default: "horizontal" }
    , activationMode: { type: "string", enum: ["manual", "automatic"], default: "automatic" }
    , loop: { type: "boolean", default: true }
    , disabled: { type: "boolean", default: false }
    , storageKey: { type: "string", default: "wacss:tabs" }
    , persist: { type: "boolean", default: true }
    }
, additionalProperties: true
} as const;
