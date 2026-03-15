import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "context-menu"
, cssProperties:
    [ "min-width"
    , "svg-transition"
    ]
, variants: ["secondary"]
, states: ["static"]
} as const satisfies Meta;

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
