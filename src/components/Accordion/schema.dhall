let P = ../prelude.dhall

in  { title = "Accordion"
    , type = "object"
    , description = "Collapsible sections. Wraps the bits-ui Accordion; each item is one section."
    , variants = [ "secondary" ]
    , states = [ "static" ]
    , parts = [ "AccordionTrigger", "AccordionContent" ]
    , themeableProperties =
      [ "color", "border-color", "border-block-end-width" ]
    , structuralProperties.static =
      { display = "block", `border-block-end-style` = "solid" }
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
          , type = P.choice [ "single", "multiple" ] "single"
          , value =
            { type = [ "string", "array" ]
            , description = "Open item value(s)."
            }
          , disabled = P.booleanWith False
          , loop = P.booleanWith True
          , orientation = P.choice [ "vertical", "horizontal" ] "vertical"
          }
    , required = [ "items" ]
    }
