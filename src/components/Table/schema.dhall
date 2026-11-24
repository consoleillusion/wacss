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
    , parts.cell =
      { selector = "th, td"
      , role = "base"
      , themeableProperties =
        [ "border-color", "border-block-end-width", "padding-block", "padding-inline" ]
      , structuralProperties.static.`border-block-end-style` = "solid"
      }
    , arguments =
          P.commonAttributes
      //  { columns =
            { type = "array"
            , description = "The columns, in order: { key, label }."
            , items =
              { type = "object"
              , properties =
                { key = P.described "The key each row holds this column's value under."
                , label = P.described "The column's heading."
                }
              }
            }
          , rows =
            { type = "array"
            , description = "The rows, in order: each maps column keys to a value, which is text or another component given as data ({ component, data })."
            , items = P.object
            }
          , caption = P.described "A title for the table."
          }
    , required = [ "columns", "rows" ]
    , details =
      [ "Its cells are a part of it, cell: every th and td in a table is padded like a control and ruled beneath with a border made from the base, so the rows are separated by lines; the table collapses its borders so the rules meet. The reset sets headings in bold, aligned to the start, and values aligned to the top."
      , "A value may be another component, given as data ({ component, data }) and loaded by title, such as a Badge that marks a row right or wrong; the table imports none of them."
      ]
    , usage =
      [ ''
        <Table columns={[{ key: "domain", label: "Domain" }, { key: "score", label: "Score" }]}
          rows={[{ domain: "Network programmability", score: { component: "Badge", data: { label: "4/5", variant: "positive" } } }]} />''
      ]
    , related = [ "Badge" ]
    }
