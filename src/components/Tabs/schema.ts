import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "tabs"
, cssProperties:
    [ "background"
    , "color"
    , "gap"
    , "padding"
    , "border-radius"
    , "height"
    , "font-size"
    , "font-weight"
    , "box-shadow"
    , "opacity"
    ]
, variants: ["secondary"]
, states: ["static", "disabled"]
, structure:
  { static:
    { display: "inline-flex"
    , "align-items": "center"
    , "justify-content": "center"
    }
  }
} as const satisfies Meta;

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
