let P = ../prelude.dhall

in  { title = "Switch"
    , type = "object"
    , description = "A control that turns one setting on or off."
    , element = "input"
    , variants = [ "secondary" ]
    , states =
      [ "static", "hover", "focus", "checked", "unchecked", "disabled" ]
    , cssProperties =
      [ "background"
      , "color"
      , "border-color"
      , "border-width"
      , "border-radius"
      , "gap"
      , "font-size"
      , "outline-color"
      , "outline-width"
      , "outline-offset"
      , "opacity"
      , "transition-duration"
      ]
    , structure =
      { static =
        { appearance = "none"
        , `outline-style` = "solid"
        , `border-style` = "solid"
        , cursor = "pointer"
        }
      , disabled = { cursor = "not-allowed", `pointer-events` = "none" }
      }
    , arguments =
          P.commonAttributes
      //  { checked = P.booleanWith False
          , label = P.string
          , name = P.string
          , value = P.string
          , required = P.booleanWith False
          , disabled = P.booleanWith False
          }
    }
