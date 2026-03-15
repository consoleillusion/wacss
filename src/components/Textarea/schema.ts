import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "textarea"
, element: "textarea"
, cssProperties:
    [ "background"
    , "border-color"
    , "border-width"
    , "color"
    , "border-radius"
    , "padding-block"
    , "padding-inline"
    , "min-block-size"
    , "font-size"
    , "outline-color"
    , "outline-width"
    , "outline-offset"
    , "opacity"
    ]
, variants: ["secondary"]
, states: ["static", "focus", "invalid", "disabled"]
, structure:
  { static:
    { "border-style": "solid"
    , "outline-style": "solid"
    , "inline-size": "100%"
    , resize: "vertical"
    }
  , disabled: { cursor: "not-allowed", "pointer-events": "none" }
  }
, pseudoElements:
  { "::placeholder": ["color"]
  }
, pseudoStructure:
  { "::placeholder": { static: { opacity: "1" } }
  }
} as const satisfies Meta;

export const component =
{ title: "Textarea"
, description: "A labelled multi-line text input with optional description, error, and persistence."
, type: "object"
, properties:
    { ...commonAttributes
    , value: { type: "string" }
    , placeholder: { type: "string" }
    , label: { type: "string" }
    , description: { type: "string" }
    , error: { type: "string" }
    , disabled: { type: "boolean", default: false }
    , readonly: { type: "boolean", default: false }
    , required: { type: "boolean", default: false }
    , rows: { type: "number", default: 4 }
    , name: { type: "string" }
    , storageKey: { type: "string", default: "wacss:textarea" }
    , persist: { type: "boolean", default: true }
    }
, additionalProperties: true
} as const;
