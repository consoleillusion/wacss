let P = ../prelude.dhall

in  { title = "Checkbox"
    , type = "object"
    , description =
        "A styled checkbox with label, description, indeterminate state and persistence."
    , element = "input"
    , variants = [ "secondary" ]
    , states = [ "static", "hover", "focus", "checked", "unchecked", "disabled" ]
    , cssProperties =
      [ "background"
      , "color"
      , "border-color"
      , "border-width"
      , "border-radius"
      , "gap"
      , "font-size"
      , "font-weight"
      , "box-shadow"
      , "outline-color"
      , "outline-width"
      , "outline-offset"
      , "opacity"
      , "transition-duration"
      ]
    , structure =
      { static =
        { display = "inline-flex"
        , `align-items` = "center"
        , `outline-style` = "solid"
        , cursor = "pointer"
        }
      , disabled =
        { cursor = "not-allowed", `pointer-events` = "none" }
      }
    , arguments =
          P.commonAttributes
      //  { checked = P.booleanWith False
          , indeterminate = P.booleanWith False
          , label = P.string
          , description = P.string
          , disabled = P.booleanWith False
          , required = P.booleanWith False
          , readonly = P.booleanWith False
          , name = P.string
          , value = P.string
          , storageKey = P.stringWith "wacss:checkbox"
          , persist = P.booleanWith True
          }
    }
