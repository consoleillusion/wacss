let P = ../prelude.dhall

in  { title = "NodeLinkDiagram"
    , type = "object"
    , description =
        "An interactive graph for exploring the token hierarchy and editing token values live."
    , variants = [ "secondary" ]
    , states = [ "static", "selected" ]
    , types = { `--xy-edge-stroke` = "edge" }
    , cssProperties =
      [ "background"
      , "color"
      , "border-color"
      , "border-width"
      , "border-radius"
      , "font-size"
      , "--xy-edge-stroke"
      ]
    , structure.static =
      { display = "block", `border-style` = "solid" }
    , arguments =
          P.commonAttributes
      //  { nodes =
            { type = "array"
            , items =
              { type = "object"
              , properties =
                { id = P.string
                , label = P.string
                , level = P.integer
                , component = P.string
                }
              , required = [ "id", "label" ]
              }
            }
          , edges =
            { type = "array"
            , items =
              { type = "object"
              , properties = { source = P.string, target = P.string }
              , required = [ "source", "target" ]
              }
            }
          , tokens =
            { type = "object"
            , description = "Contents of tokens.json."
            , additionalProperties = True
            }
          , component =
              P.described "Show only the tokens that affect this component."
          , direction = P.choice [ "down", "right" ] "down"
          }
    }
