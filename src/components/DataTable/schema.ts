import { commonAttributes } from "../component";

export const style = { properties: [], states: ["static"] } as const;

export const component =
{ title: "DataTable"
, description: "A sortable data grid built on @svar-ui/svelte-grid, themed through wacss tokens."
, type: "object"
, properties:
    { ...commonAttributes
    , data: { type: "array", description: "Row objects rendered by the grid." }
    , columns:
        { type: "array"
        , description: "Column configuration: id, header, width or flexgrow, sort, editor, etc."
        }
    , select:
        { type: "boolean"
        , default: true
        , description: "Row selection. Set to false to disable selection."
        }
    , footer: { type: "boolean", default: false, description: "Render a footer row." }
    , tree: { type: "boolean", default: false, description: "Render hierarchical data as a tree." }
    }
, additionalProperties: true
} as const;
