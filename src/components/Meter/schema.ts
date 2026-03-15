import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "meter"
, element: "meter"
, cssProperties:
    [ "background"
    , "color"
    , "border-color"
    , "border-width"
    , "border-radius"
    , "block-size"
    , "inline-size"
    ]
, variants: ["secondary"]
, states: ["static"]
, structure:
    { static:
        { display: "block"
        , "border-style": "solid"
        , overflow: "hidden"
        }
    }
} as const satisfies Meta;

export const component =
{ title: "Meter"
, type: "object"
, properties:
    { ...commonAttributes
    , value: { type: "number" }
    , min: { type: "number", default: 0 }
    , max: { type: "number", default: 100 }
    , low: { type: "number" }
    , high: { type: "number" }
    , optimum: { type: "number" }
    }
, additionalProperties: true
} as const;
