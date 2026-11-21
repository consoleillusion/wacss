let P = ../prelude.dhall

in  { title = "Accordion"
    , type = "object"
    , description = "A data-driven accordion with single or multiple open items."
    , element = "details"
    , variants = [ "secondary" ]
    , states = [ "static", "open" ]
    , cssProperties =
      [ "border-color"
      , "border-block-end-width"
      , "color"
      , "padding-block"
      , "transition-duration"
      ]
    , structure =
      { static =
        { `interpolate-size` = "allow-keywords"
        , overflow = "clip"
        , `inline-size` = "100%"
        , `border-block-end-style` = "solid"
        , cursor = "pointer"
        , position = "relative"
        , `list-style` = "none"
        , `text-align` = "start"
        }
      }
    , pseudoElements.`::details-content` = [ "transition-duration" ]
    , pseudoStructure.`::details-content` =
      { static =
        { height = "0"
        , `overflow-y` = "clip"
        , `transition-property` = "content-visibility, height"
        , `transition-behavior` = "allow-discrete"
        }
      , open.height = "auto"
      }
    , arguments =
          P.commonAttributes
      //  { items =
            { type = "array"
            , description = "Accordion items."
            , items =
              { type = "object"
              , properties =
                { value = P.string
                , title = P.string
                , content = P.string
                , disabled = P.boolean
                }
              , required = [ "value", "title" ]
              }
            }
          , cardinality = P.choice [ "single", "multiple" ] "single"
          , value =
            { type = [ "string", "array" ]
            , description = "Open item value(s)."
            }
          , disabled = P.boolean
          , loop = P.booleanWith True
          , orientation = P.choice [ "horizontal", "vertical" ] "vertical"
          , storageKey = P.stringWith "wacss:accordion"
          , persist = P.booleanWith True
          }
    }
