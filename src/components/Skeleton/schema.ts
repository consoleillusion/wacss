import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "skeleton"
, cssProperties:
    [ "background"
    , "gap"
    , "animation-duration"
    ]
, variants: ["secondary"]
, states: ["static"]
, structure:
  { static:
    { display: "grid"
    , "inline-size": "100%"
    , "animation-name": "wacss-skeleton-pulse"
    , "animation-timing-function": "cubic-bezier(0.65, 0, 0.35, 1)"
    , "animation-iteration-count": "infinite"
    }
  }
} as const satisfies Meta;

export const component =
{ title: "Skeleton"
, description: "A quiet placeholder that pulses while content loads."
, type: "object"
, properties:
    { ...commonAttributes
    , lines: { type: "number", default: 1, description: "Number of bar lines to render." }
    , circle:
        { type: "boolean"
        , default: false
        , description: "Render an avatar-sized circle instead of bars."
        }
    }
, additionalProperties: true
} as const;
