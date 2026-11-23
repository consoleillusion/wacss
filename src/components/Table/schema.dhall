let P = ../prelude.dhall

in  { title = "Table"
    , type = "object"
    , description = "Rows of data under named columns, ruled into rows. Every table is styled as one."
    , categories = [ "Content" ]
    , element = [ "table" ]
    , variants.secondary = "clear"
    , states = [ "static" ]
    , themeableProperties = [ "color", "font-size" ]
    , structuralProperties.static =
      { `border-collapse` = "collapse", `inline-size` = "100%" }
    , arguments =
          P.commonAttributes
      //  { columns =
            { type = "array"
            , description = "The columns, in order: { key, label }."
            , items =
              { type = "object"
              , properties =
                { key = P.described "The key each row holds this column's text under."
                , label = P.described "The column's heading."
                }
              }
            }
          , rows =
            { type = "array"
            , description = "The rows, in order: each maps column keys to text."
            , items = P.object
            }
          , caption = P.described "A title for the table."
          }
    , required = [ "columns", "rows" ]
    , details =
      [ "Its cells are TableCells, each ruled beneath with the hairline, so the rows are separated by lines; the table collapses its borders so the rules meet."
      ]
    , usage =
      [ ''
        <Table columns={[{ key: "name", label: "Name" }, { key: "role", label: "Role" }]}
          rows={[{ name: "Kinari", role: "Palette" }]} />''
      ]
    , related = [ "TableCell" ]
    }
