let P = ../prelude.dhall

in  { title = "ColorInput"
    , type = "object"
    , description = "A native colour field with a label."
    , element = "input"
    , variants = [ "secondary" ]
    , states = [ "static", "hover", "focus", "disabled", "invalid" ]
    , cssProperties =
      [ "background"
      , "border-color"
      , "border-width"
      , "border-radius"
      , "padding"
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
        , cursor = "pointer"
        }
      , disabled.cursor = "not-allowed"
      }
    , arguments =
          P.commonAttributes
      //  { value = P.stringWith "#000000"
          , name = P.string
          , label = P.string
          , disabled = P.booleanWith False
          , required = P.booleanWith False
          }
    }
