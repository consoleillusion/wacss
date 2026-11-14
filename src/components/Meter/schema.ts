import { commonAttributes } from "../component";

export const style = { properties: [], states: ["static"] } as const;

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
