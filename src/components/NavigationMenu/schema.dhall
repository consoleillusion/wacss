let P = ../prelude.dhall

in  { title = "NavigationMenu"
    , type = "object"
    , description = "A navigation menu whose entries can open panels of links."
    , variants = [ "secondary" ]
    , states = [ "static", "hover", "highlighted", "focus", "open", "current" ]
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
      , "font-weight"
      , "box-shadow"
      , "outline-color"
      , "outline-width"
      , "outline-offset"
      , "transition-duration"
      ]
    , structure.static = { display = "flex", `outline-style` = "solid" }
    , arguments =
          P.commonAttributes
      //  { label = P.described "Accessible name of the navigation landmark."
          , items =
            { type = "array"
            , description = "Top-level entries. An entry with links opens a panel."
            , items =
              { type = "object"
              , properties =
                { label = P.string
                , href = P.string
                , current = P.boolean
                , links =
                  { type = "array"
                  , items =
                    { type = "object"
                    , properties =
                      { label = P.string
                      , href = P.string
                      , description = P.string
                      }
                    , required = [ "label", "href" ]
                    }
                  }
                }
              , required = [ "label" ]
              }
            }
          , orientation =
              P.choice [ "horizontal", "vertical" ] "horizontal"
          }
    }
