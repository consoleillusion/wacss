let P = ../prelude.dhall

in  { title = "DataTable"
    , type = "object"
    , description =
        "An interactive data grid with sortable columns and optional row selection."
    , variants = [ "secondary" ]
    , states = [ "static" ]
    , types = { `--wx-background` = "fill", `--wx-color-primary` = "fill" }
    , cssProperties =
      [ "background"
      , "color"
      , "border-color"
      , "border-radius"
      , "font-size"
      , "--wx-background"
      , "--wx-color-primary"
      ]
    , structure.static =
      { display = "block", overflow = "auto", `border-style` = "solid" }
    , arguments =
          P.commonAttributes
      //  { columns =
            { type = "array"
            , description = "Column definitions."
            , items =
              { type = "object"
              , properties =
                { id = P.string
                , header = P.string
                , width = P.number
                , sortable = P.booleanWith True
                }
              , required = [ "id", "header" ]
              }
            }
          , data =
            { type = "array"
            , description = "Row objects keyed by column id."
            , items = P.object
            }
          , selectable = P.booleanWith False
          }
    }
