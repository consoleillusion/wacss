import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "color-input"
, cssProperties: ["gap"]
, variants: ["secondary"]
, states: ["static"]
, structure:
    { static:
        { display: "grid"
        }
    }
} as const satisfies Meta;

export const component =
{ title: "Color"
, description: "A color selector with swatch and hex value input."
, type: "object"
, properties:
    { ...commonAttributes
    , value: { type: "string", description: "Selected color value." }
    , label: { type: "string" }
    , description: { type: "string" }
    , disabled: { type: "boolean", default: false }
    }
, additionalProperties: true
} as const;
