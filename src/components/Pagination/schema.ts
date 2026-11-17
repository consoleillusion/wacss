import { commonAttributes } from "../component";

export const meta =
{ name: "pagination"
, cssProperties:
    [ "background"
    , "color"
    , "gap"
    , "prev-inline-size"
    , "prev-block-size"
    , "prev-min-height"
    , "prev-border"
    , "prev-border-radius"
    , "prev-font-size"
    , "prev-font-weight"
    , "prev-transition"
    , "page-font-weight"
    , "prev-opacity"
    , "ellipsis-inline-size"
    , "ellipsis-block-size"
    , "ellipsis-color"
    , "svg-inline-size"
    , "svg-block-size"
    ]
, roles: ["standard"]
, states: ["static", "hover", "selected"]
} as const;

export const component =
{ title: "Pagination"
, description: "Page controls backed by bits-ui Pagination. Binds the current page."
, type: "object"
, properties:
    { ...commonAttributes
    , total: { type: "number", description: "Total number of items to paginate." }
    , perPage: { type: "number", default: 10 }
    , page: { type: "number", default: 1, description: "Current page, 1-based." }
    , siblingCount: { type: "number", default: 1 }
    , loop: { type: "boolean", default: false }
    }
, additionalProperties: true
} as const;
