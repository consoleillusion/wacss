import { commonAttributes } from "../component";

export const style = { properties: [], states: ["static"] } as const;

export const component =
{ title: "PertChart"
, description:
    "A PERT network diagram of a dependency graph. Computes expected durations, slack and the critical path."
, type: "object"
, properties:
    { ...commonAttributes
    , tasks:
        { type: "array"
        , description:
            "Activities with id, name, PERT estimates (optimistic/likely/pessimistic in days) or a fixed days duration, and dependsOn."
        }
    }
, additionalProperties: true
} as const;
