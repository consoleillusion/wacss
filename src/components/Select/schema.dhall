let P = ../prelude.dhall

in  { title = "Select"
    , type = "object"
    , description = "A control for choosing one or more values from a list."
    , element = "select"
    , variants = [ "secondary" ]
    , states = [ "static", "hover", "focus", "open", "disabled", "invalid" ]
    , cssProperties =
      [ "background"
      , "color"
      , "border-color"
      , "border-width"
      , "border-radius"
      , "padding-block"
      , "padding-inline"
      , "font-size"
      , "line-height"
      , "box-shadow"
      , "outline-color"
      , "outline-width"
      , "outline-offset"
      , "opacity"
      , "transition-duration"
      ]
    , structure =
      { static =
        { `border-style` = "solid"
        , `outline-style` = "solid"
        , `box-sizing` = "border-box"
        , cursor = "pointer"
        }
      , disabled.cursor = "not-allowed"
      }
    , arguments =
          P.commonAttributes
      //  { name = P.string
          , label = P.string
          , value = P.string
          , options =
            { type = "array"
            , items =
              { type = "object"
              , properties =
                { value = P.string, label = P.string, disabled = P.boolean }
              , required = [ "value", "label" ]
              }
            }
          , placeholder = P.string
          , multiple = P.booleanWith False
          , required = P.booleanWith False
          , disabled = P.booleanWith False
          }
    , required = [ "options" ]
    }
