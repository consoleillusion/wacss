import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "table"
, element: "table"
, cssProperties:
    [ "head-color"
    , "head-font-weight"
    , "cell-padding-block"
    , "cell-padding-inline"
    , "row-border-color"
    , "row-background"
    , "font-size"
    , "caption-margin-block-start"
    , "caption-font-size"
    , "caption-color"
    , "th-border-block-end-border-width"
    , "td-border-block-end-border-width"
    , "tr-transition"
    ]
, variants: ["secondary"]
, states: ["static", "hover"]
, channels: { hover: ["row-background"] }
, structure:
  { static:
    { width: "100%"
    , "border-collapse": "collapse"
    , "caption-side": "bottom"
    }
  }
} as const satisfies Meta;

export const component =
{ title: "Table"
, type: "object"
, properties: { ...commonAttributes }
, additionalProperties: true
} as const;
