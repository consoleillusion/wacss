let P = ../prelude.dhall

in  { title = "RadioGroup"
    , type = "object"
    , description = "A set of options of which exactly one can be chosen."
    , variants = [ "secondary" ]
    , states =
      [ "static", "hover", "focus", "checked", "unchecked", "disabled" ]
    , cssProperties =
      [ "background"
      , "color"
      , "border-color"
      , "border-width"
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
      { static = { display = "grid", `outline-style` = "solid", cursor = "pointer" }
      , disabled = { cursor = "not-allowed", `pointer-events` = "none" }
      }
    , arguments =
          P.commonAttributes
      //  { name = P.string
          , legend = P.string
          , value = P.string
          , options =
            { type = "array"
            , items =
              { type = "object"
              , properties =
                { value = P.string
                , label = P.string
                , description = P.string
                , disabled = P.boolean
                }
              , required = [ "value", "label" ]
              }
            }
          , orientation = P.choice [ "horizontal", "vertical" ] "vertical"
          , required = P.booleanWith False
          , disabled = P.booleanWith False
          }
    , required = [ "name", "options" ]
    }
