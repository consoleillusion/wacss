let P = ../prelude.dhall

in  { title = "Textarea"
    , type = "object"
    , description = "A multi-line text field."
    , element = "textarea"
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
        { `border-style` = "solid"
        , `outline-style` = "solid"
        , `box-sizing` = "border-box"
        , resize = "vertical"
        }
      , disabled.cursor = "not-allowed"
      }
    , pseudoElements.`::placeholder` = [ "color" ]
    , arguments =
          P.commonAttributes
      //  { name = P.string
          , value = P.string
          , placeholder = P.described "An example, never a label."
          , label = P.string
          , rows = P.integerWith 4
          , maxlength = P.integer
          , required = P.booleanWith False
          , disabled = P.booleanWith False
          , readonly = P.booleanWith False
          }
    }
