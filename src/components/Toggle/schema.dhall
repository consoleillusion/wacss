let P = ../prelude.dhall

in  { title = "Toggle"
    , type = "object"
    , description =
        "A button that is either on or off. It shows its current state, not an action."
    , element = "button"
    , variants = [ "secondary", "primary", "tertiary" ]
    , states = [ "static", "hover", "focus", "active", "pressed", "disabled" ]
    , cssProperties =
      [ "background"
      , "color"
      , "border-color"
      , "border-width"
      , "border-radius"
      , "padding-block"
      , "padding-inline"
      , "gap"
      , "font-size"
      , "outline-color"
      , "outline-width"
      , "outline-offset"
      , "transform"
      , "opacity"
      , "transition-duration"
      ]
    , structure =
      { static =
        { appearance = "none"
        , display = "inline-flex"
        , `align-items` = "center"
        , `border-style` = "solid"
        , `outline-style` = "solid"
        , cursor = "pointer"
        }
      , disabled.cursor = "not-allowed"
      }
    , arguments =
          P.commonAttributes
      //  { variant =
              P.choice [ "secondary", "primary", "tertiary" ] "secondary"
          , pressed = P.booleanWith False
          , label = P.string
          , name = P.string
          , disabled = P.booleanWith False
          }
    }
