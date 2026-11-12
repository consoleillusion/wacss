import { commonAttributes } from "../component";

export const style = { properties: [], states: ["static"] } as const;

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
