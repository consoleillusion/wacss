import { commonAttributes } from "../component";

export const meta =
{ name: "datatable"
, cssProperties:
    [ "font-family"
    , "font-size"
    , "font-weight"
    , "line-height"
    , "color"
    , "wx-color-primary"
    , "wx-color-primary-selected"
    , "wx-color-primary-font"
    , "wx-color-secondary-hover"
    , "wx-color-secondary-font"
    , "wx-color-secondary-font-hover"
    , "wx-color-secondary-border"
    , "wx-color-secondary-border-disabled"
    , "wx-color-success"
    , "wx-color-warning"
    , "wx-color-info"
    , "wx-color-danger"
    , "wx-color-disabled"
    , "wx-color-disabled-alt"
    , "wx-color-font"
    , "wx-color-font-alt"
    , "wx-color-font-disabled"
    , "wx-color-link"
    , "wx-background"
    , "wx-background-alt"
    , "wx-background-hover"
    , "wx-font-family"
    , "wx-font-size"
    , "wx-line-height"
    , "wx-font-size-md"
    , "wx-line-height-md"
    , "wx-font-size-sm"
    , "wx-line-height-sm"
    , "wx-font-weight"
    , "wx-font-weight-md"
    , "wx-font-weight-b"
    , "wx-icon-color"
    , "wx-icon-size"
    , "wx-icon-border-radius"
    , "wx-border"
    , "wx-border-color"
    , "wx-border-radius"
    , "wx-radius-major"
    , "wx-border-medium"
    , "wx-shadow-light"
    , "wx-shadow-medium"
    , "wx-box-shadow"
    , "wx-box-shadow-strong"
    , "wx-padding"
    , "wx-table-border"
    , "wx-table-header-border"
    , "wx-table-header-cell-border"
    , "wx-table-footer-cell-border"
    , "wx-table-cell-border"
    , "wx-table-header-background"
    , "wx-header-font-weight"
    , "wx-table-select-background"
    , "wx-table-select-color"
    , "wx-table-select-border"
    , "wx-table-fixed-column-border"
    , "wx-table-editor-dropdown-border"
    , "wx-table-editor-dropdown-shadow"
    , "wx-table-drag-over-background"
    , "wx-table-drag-zone-shadow"
    , "wx-popup-border"
    , "wx-checkbox-border-width"
    , "wx-checkbox-border-color"
    , "wx-checkbox-border-color-disabled"
    , "wx-checkbox-border-radius"
    , "wx-checkbox-font-color"
    , "wx-input-font-family"
    , "wx-input-font-size"
    , "wx-input-line-height"
    , "wx-input-font-weight"
    , "wx-input-font-color"
    , "wx-input-background"
    , "wx-input-placeholder-color"
    ]
, roles: ["standard"]
, states: ["static"]
} as const;

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
