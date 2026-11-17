import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "card"
, cssProperties:
    [ "background"
    , "color"
    , "border-color"
    , "border-width"
    , "border-radius"
    , "padding"
    , "box-shadow"
    , "gap"
    , "font-size"
    , "font-weight"
    , "line-height"
    ]
, variants: ["secondary", "primary"]
, states: ["static", "hover"]
// Hover lifts the surface instead of tinting its fill.
, channels: { hover: ["box-shadow"] }
, structure:
  { static:
    { display: "grid"
    , "grid-template-rows": "auto"
    , "inline-size": "100%"
    , "min-inline-size": "0"
    , overflow: "hidden"
    , "border-style": "solid"
    , "box-sizing": "border-box"
    }
  }
} as const satisfies Meta;

export const component =
{ title: "Card"
, description:
    "A surface for grouping content with optional header, text, and a figure (media or any wacss component)."
, type: "object"
, properties:
    { ...commonAttributes
    , as: { type: "string", enum: ["article", "section", "div"], default: "article" }
    , header: { type: "string", description: "Card header text." }
    , text: { type: "string", description: "Body text shown below the figure." }
    , figure:
        { type: "object"
        , description: "Figure data: media or a component schema instance identified by title."
        , additionalProperties: true
        }
    , footer: { type: "string" }
    }
, additionalProperties: true
} as const;
