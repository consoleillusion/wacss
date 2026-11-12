import { commonAttributes } from "../component";

export const style = { properties: [], states: ["static"] } as const;

export const component =
{ title: "ContextMenu"
, type: "object"
, properties:
    { ...commonAttributes
    , disabled: { type: "boolean", default: false }
    , loop: { type: "boolean", default: false }
    }
, additionalProperties: true
} as const;
