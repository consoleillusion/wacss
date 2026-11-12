import { commonAttributes } from "../component";

export const style = { properties: [], states: ["static"] } as const;

export const component =
{ title: "Breadcrumb"
, description:
    "An aria-labelled navigation trail showing where the current page sits in the hierarchy."
, type: "object"
, properties:
    { ...commonAttributes
    , items:
        { type: "array"
        , description:
            "Crumbs in order: [{ label, href? }]. The last item renders with aria-current=\"page\"."
        }
    }
, additionalProperties: true
} as const;
