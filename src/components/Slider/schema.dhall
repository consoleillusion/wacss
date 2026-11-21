let P = ../prelude.dhall

in  { title = "Slider"
    , type = "object"
    , description = "A control for choosing a number within a range."
    , element = "input"
    , variants = [ "secondary" ]
    , states = [ "static", "hover", "focus", "active", "disabled" ]
    , cssProperties =
      [ "background"
      , "color"
      , "border-radius"
      , "outline-color"
      , "outline-width"
      , "outline-offset"
      , "transform"
      , "opacity"
      , "transition-duration"
      ]
    , structure =
      { static =
        { appearance = "none", `outline-style` = "solid", cursor = "pointer" }
      , disabled.cursor = "not-allowed"
      }
    , arguments =
          P.commonAttributes
      //  { value = P.number
          , min = P.numberWith 0.0
          , max = P.numberWith 100.0
          , step = P.numberWith 1.0
          , name = P.string
          , label = P.string
          , orientation = P.choice [ "horizontal", "vertical" ] "horizontal"
          , disabled = P.booleanWith False
          }
    }
