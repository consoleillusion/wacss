import { commonAttributes } from "../component";

export const meta =
{ name: "tabs"
, cssProperties:
    [ "list-background"
    , "list-color"
    , "trigger-background"
    , "trigger-color"
    , "height"
    , "trigger-padding-block"
    , "trigger-padding-inline"
    , "list-padding"
    , "list-border-radius"
    , "trigger-border-radius"
    , "trigger-font-size"
    , "trigger-font-weight"
    , "trigger-border"
    , "trigger-transition"
    , "trigger-box-shadow"
    , "trigger-opacity"
    , "content-margin-block-start"
    , "content-font-size"
    , "content-color"
    , "gap"
    , "trigger-active-background"
    , "trigger-active-color"
    ]
, roles: ["standard"]
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
