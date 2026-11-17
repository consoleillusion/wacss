import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "aspect-ratio"
, cssProperties: []
, variants: ["secondary"]
, states: ["static"]
, structure:
    { static:
        { position: "relative"
        , display: "block"
        , "inline-size": "100%"
        }
    }
} as const satisfies Meta;

export const component =
{ title: "AspectRatio"
, type: "object"
, properties: { ...commonAttributes, ratio: { type: "number" } }
, additionalProperties: true
} as const;
