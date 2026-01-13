import { commonAttributes } from "../component";

export const meta =
{ name: "table"
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
, roles: ["standard"]
, states: ["static", "hover"]
} as const;

export const component =
{ title: "Table"
, type: "object"
, properties: { ...commonAttributes }
, additionalProperties: true
} as const;
