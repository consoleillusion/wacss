let P = ../prelude.dhall

in  { title = "Tabs"
    , type = "object"
    , description = "Panels of content of which one is shown at a time."
    , variants = [ "secondary" ]
    , states = [ "static", "hover", "focus", "selected", "disabled" ]
    , cssProperties =
      [ "background"
      , "color"
      , "border-color"
      , "border-width"
      , "padding-block"
      , "padding-inline"
      , "gap"
      , "font-size"
      , "font-weight"
      , "outline-color"
      , "outline-width"
      , "outline-offset"
      , "opacity"
      , "transition-duration"
      ]
    , structure =
      { static = { display = "grid", `outline-style` = "solid", cursor = "pointer" }
      , disabled.cursor = "not-allowed"
      }
    , arguments =
          P.commonAttributes
      //  { tabs =
            { type = "array"
            , items =
              { type = "object"
              , properties =
                { value = P.string
                , label = P.string
                , content = P.string
                , disabled = P.boolean
                }
              , required = [ "value", "label" ]
              }
            }
          , value = P.described "The value of the selected tab."
          , orientation = P.choice [ "horizontal", "vertical" ] "horizontal"
          , label = P.described "Accessible name of the tab list."
          }
    , required = [ "tabs" ]
    }
