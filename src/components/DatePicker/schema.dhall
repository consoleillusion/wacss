let P = ../prelude.dhall

in  { title = "DatePicker"
    , type = "object"
    , description = "A calendar for choosing a date."
    , variants = [ "secondary" ]
    , states =
      [ "static", "hover", "focus", "selected", "current", "disabled" ]
    , cssProperties =
      [ "background"
      , "color"
      , "border-color"
      , "border-width"
      , "border-radius"
      , "padding"
      , "gap"
      , "font-size"
      , "box-shadow"
      , "outline-color"
      , "outline-width"
      , "outline-offset"
      , "opacity"
      , "transition-duration"
      ]
    , structure =
      { static = { display = "grid", `border-style` = "solid" }
      , disabled.cursor = "not-allowed"
      }
    , arguments =
          P.commonAttributes
      //  { value = P.described "Selected date, ISO 8601 (YYYY-MM-DD)."
          , min = P.described "Earliest selectable date, ISO 8601."
          , max = P.described "Latest selectable date, ISO 8601."
          , locale = P.stringWith "en"
          , name = P.string
          , disabled = P.booleanWith False
          , required = P.booleanWith False
          }
    }
