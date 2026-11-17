import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "input"
, element: "input"
, cssProperties:
    [ "background"
    , "border-color"
    , "border-width"
    , "color"
    , "border-radius"
    , "padding-block"
    , "padding-inline"
    , "height"
    , "font-size"
    , "gap"
    , "field-description-font-size"
    , "field-error-font-size"
    , "field-error-color"
    , "outline-color"
    , "outline-width"
    , "outline-offset"
    , "opacity"
    ]
, variants: ["secondary"]
, states: ["static", "focus", "invalid", "disabled"]
, structure:
  { static:
    { display: "flex"
    , width: "100%"
    , "border-style": "solid"
    , "outline-style": "solid"
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
{ title: "Input"
, description: "A labelled text input with optional description, error, and persistence."
, type: "object"
, properties:
    { ...commonAttributes
    , value: { type: "string" }
    , type: { type: "string", default: "text" }
    , placeholder: { type: "string" }
    , label: { type: "string" }
    , description: { type: "string" }
    , error: { type: "string" }
    , disabled: { type: "boolean", default: false }
    , readonly: { type: "boolean", default: false }
    , required: { type: "boolean", default: false }
    , name: { type: "string" }
    , storageKey: { type: "string", default: "wacss:input" }
    , persist: { type: "boolean", default: true }
    }
, additionalProperties: true
} as const;
