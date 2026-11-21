{ title = "Accordion"
, type = "object"
, description = "A data-driven accordion with single or multiple open items."
, variants = [ "secondary" ]
, states = [ "static", "open" ]
, properties =
    { themeableProperties =
      [ "border-color"
      , "border-block-end-width"
      , "color"
      , "padding-block"
      , "transition-duration"
      ]
    , structuralProperties =
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
    , pseudoElements =
      { `::details-content` = [ "transition-duration" ]
      }
    , pseudoStructure =
      { `::details-content` =
        { static =
          { height = "0"
          , `overflow-y` = "clip"
          , `transition-property` = "content-visibility, height"
          , `transition-behavior` = "allow-discrete"
          }
        , open = { height = "auto" }
        }
      }
   , arguments =  
    { items =
      { type = "array"
      , description = "Accordion items."
      , items =
        { type = "object"
        , properties =
          { value = string
          , title = string
          , content = string
          , disabled = boolean
          }
        , required = [ "value", "title" ]
        }
      }
    , cardinality =
      { type = "string"
      , enum = [ "single", "multiple" ]
      , default = "single"
      }
    , value =
      { type = [ "string", "array" ]
      , description = "Open item value(s)."
      }
    , disabled = boolean
    , loop =
      { type = "boolean"
      , default = True
      }
    , orientation =
      { type = "string"
      , enum = [ "horizontal", "vertical" ]
      , default = "vertical"
      }
    , storageKey =
      { type = "string"
      , default = "wacss:accordion"
      }
    , persist =
      { type = "boolean"
      , default = True
      }

}
