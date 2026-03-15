import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "image"
, element: "img"
, cssProperties: []
, variants: ["secondary"]
, states: ["static"]
, structure:
    { static:
        { display: "block"
        , "max-width": "100%"
        }
    }
} as const satisfies Meta;

export const component =
{ title: "Image"
, description: "Displays an image."
, type: "object"
, properties:
    { ...commonAttributes
    , src: { type: "string", description: "Image source URL." }
    , alt: { type: "string", description: "Alternative text." }
    , loading: { type: "string", enum: ["eager", "lazy"], default: "lazy" }
    , decoding: { type: "string", enum: ["sync", "async", "auto"], default: "async" }
    }
, additionalProperties: true
} as const;
