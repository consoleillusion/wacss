import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "accordion"
, element: "details"
, cssProperties:
    [ "border-color"
    , "border-block-end-width"
    , "color"
    , "padding-block"
    , "transition-duration"
    ]
, variants: ["secondary"]
, states: ["static", "open"]
, structure:
  { static:
    { "interpolate-size": "allow-keywords"
    , overflow: "clip"
    , "inline-size": "100%"
    , "border-block-end-style": "solid"
    , cursor: "pointer"
    , position: "relative"
    , "list-style": "none"
    , "text-align": "start"
    }
  }
, pseudoElements:
  { "::details-content": ["transition-duration"]
  }
, pseudoStructure:
  { "::details-content":
    { static:
      { height: "0"
      , "overflow-y": "clip"
      , "transition-property": "content-visibility, height"
      , "transition-behavior": "allow-discrete"
      }
    , open: { height: "auto" }
    }
  }
} as const satisfies Meta;

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
