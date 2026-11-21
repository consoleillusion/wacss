let P = ../prelude.dhall

in  { title = "Table"
    , type = "object"
    , description = "Tabular data with a caption, column headers and rows."
    , element = "table"
    , variants = [ "secondary" ]
    , states = [ "static" ]
    , cssProperties =
      [ "background"
      , "color"
      , "border-color"
      , "border-width"
      , "padding-block"
      , "padding-inline"
      , "font-size"
      , "line-height"
      ]
    , structure.static =
      { `border-collapse` = "collapse"
      , `inline-size` = "100%"
      , `border-style` = "solid"
      }
    , arguments =
          P.commonAttributes
      //  { caption = P.string
          , columns =
            { type = "array"
            , items =
              { type = "object"
              , properties =
                { id = P.string
                , header = P.string
                , align = P.choice [ "start", "center", "end" ] "start"
                }
              , required = [ "id", "header" ]
              }
            }
          , rows = { type = "array", items = P.object }
          }
    , required = [ "columns", "rows" ]
    }
