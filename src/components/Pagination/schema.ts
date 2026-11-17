import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "pagination"
, cssProperties:
    [ "background"
    , "color"
    , "gap"
    , "font-size"
    , "font-weight"
    ]
, variants: ["secondary"]
, states: ["static"]
, structure:
  { static:
    { display: "inline-flex"
    , "align-items": "center"
    }
  }
} as const satisfies Meta;

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
