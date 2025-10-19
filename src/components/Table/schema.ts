import { commonAttributes } from "../component";

export const style =
{ properties:
    [ { property: "head-color" }
    , { property: "head-weight" }
    , { property: "cell-padding-block" }
    , { property: "cell-padding-inline" }
    , { property: "row-border" }
    , { property: "row-background", states: ["hover"] }
    ]
, states: ["static", "hover"]
} as const;

export const component =
{ title: "Table"
, type: "object"
, properties: { ...commonAttributes }
, additionalProperties: true
} as const;
