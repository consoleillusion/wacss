import { commonAttributes } from "../component";

export const style = { properties: [], states: ["static"] } as const;

export const component =
{ title: "NodeLinkDiagram"
, description:
    "A pan-and-zoomable node-link diagram of the token hierarchy: primitive → semantic → component → role → state."
, type: "object"
, properties:
    { ...commonAttributes
    , layers:
        { type: "array"
        , description:
            "Token layers: [{ layer, families: [{ family, tokens: [{ name, value, refs, family }] }] }]."
        }
    }
, additionalProperties: true
} as const;
