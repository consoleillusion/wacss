import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "datepicker"
, cssProperties:
    [ "border-color"
    , "outline-color"
    , "box-shadow"
    , "opacity"
    , "date-field-input-gap"
    , "date-field-input-border-width"
    , "date-field-input-box-shadow-focus-ring-span"
    , "date-field-segment-padding"
    , "date-field-segment-border-radius"
    , "date-field-segment-background"
    , "date-field-segment-color"
    , "date-field-segment-opacity"
    , "popover-trigger-color"
    , "popover-trigger-hover-color"
    , "popover-content-max-height"
    , "popover-content-border-width"
    , "calendar-gap"
    , "calendar-padding"
    , "calendar-header-gap"
    , "calendar-heading-font-size"
    , "calendar-heading-font-weight"
    , "calendar-prev-button-border-radius"
    , "calendar-prev-button-color"
    , "calendar-prev-button-hover-color"
    , "calendar-head-cell-padding-block"
    , "calendar-head-cell-font-size"
    , "calendar-head-cell-font-weight"
    , "calendar-head-cell-color"
    , "calendar-day-border-radius"
    , "calendar-day-color"
    , "calendar-day-font-size"
    , "calendar-day-transition"
    , "calendar-day-box-shadow"
    , "calendar-day-background"
    , "calendar-day-selected-color"
    , "calendar-day-color-2"
    ]
, variants: ["secondary"]
, states: ["static", "hover", "focus", "selected", "disabled", "invalid"]
, channels:
  { hover: ["box-shadow"]
  , focus: ["outline-color"]
  , selected: ["calendar-day-background", "calendar-day-color"]
  , disabled: ["opacity"]
  , invalid: ["border-color"]
  }
} as const satisfies Meta;

export const component =
{ title: "DatePicker"
, description: "A date picker composed with bits-ui DatePicker primitives."
, type: "object"
, properties:
    { ...commonAttributes
    , value: { type: "string", description: "Selected date as ISO string (YYYY-MM-DD)." }
    , label: { type: "string" }
    , description: { type: "string" }
    , placeholder: { type: "string" }
    , disabled: { type: "boolean", default: false }
    }
, additionalProperties: true
} as const;
