let P = ../prelude.dhall

in  { title = "Input"
    , type = "object"
    , description = "A single-line text field."
    , element = "input"
    , variants = [ "secondary" ]
    , states = [ "static", "hover", "focus", "disabled", "invalid" ]
    , cssProperties =
      [ "background"
      , "color"
      , "border-color"
      , "border-width"
      , "border-radius"
      , "padding-block"
      , "padding-inline"
      , "font-family"
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
        { appearance = "none"
        , `border-style` = "solid"
        , `outline-style` = "solid"
        , `box-sizing` = "border-box"
        }
      , disabled.cursor = "not-allowed"
      }
    , pseudoElements.`::placeholder` = [ "color" ]
    , arguments =
          P.commonAttributes
      //  { type =
              P.choice
                [ "text"
                , "email"
                , "password"
                , "search"
                , "tel"
                , "url"
                , "number"
                ]
                "text"
          , name = P.string
          , value = P.string
          , placeholder = P.described "An example, never a label."
          , label = P.string
          , required = P.booleanWith False
          , disabled = P.booleanWith False
          , readonly = P.booleanWith False
          }
    }
