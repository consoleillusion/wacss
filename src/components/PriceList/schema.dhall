let P = ../prelude.dhall

in  { title = "PriceList"
    , type = "object"
    , description = "A short list of what something costs: a label on the left and its price on the right, one row per option. It suits a treatment's durations and its optional extras."
    , categories = [ "Display" ]
    , variants =
      { secondary = "clear"
      , primary = "surface"
      }
    , states = [ "static" ]
    , themeableProperties =
      [ "background"
      , "color"
      , "border-color"
      , "border-width"
      , "border-radius"
      , "padding"
      , "gap"
      , "font-size"
      , "line-height"
      , "box-shadow"
      ]
    , structuralProperties.static =
      { display = "block"
      , `border-style` = "solid"
      }
    , parts.row =
      { selector = "[data-price-row]"
      , themeableProperties = [ "gap", "padding-block" ]
      , structuralProperties.static =
        { display = "flex"
        , `justify-content` = "space-between"
        , `align-items` = "baseline"
        }
      }
    , parts.label =
      { selector = "[data-price-label]"
      , themeableProperties = [ "color", "font-size", "font-weight" ]
      }
    , parts.value =
      { selector = "[data-price-value]"
      , themeableProperties = [ "color", "font-size", "font-weight" ]
      }
    , arguments =
          P.commonAttributes
      //  { items =
            { type = "array"
            , description = "The options, in order."
            , items =
              { type = "object"
              , properties =
                { label = P.described "The option's name, such as a duration."
                , value = P.described "Its price, with the currency symbol."
                }
              , required = [ "label", "value" ]
              }
            }
          }
    , required = [ "items" ]
    , details =
      [ "Each row is a flex pair, so a long label and a short price still sit at opposite ends. A price is text, not a number: it can include a currency and any note the business needs."
      ]
    , related = [ "Table", "Badge", "Stat" ]
    , usage =
      [ ''
        <PriceList items={[{ label: "60 min", value: "$120" }, { label: "90 min", value: "$160" }]} />''
      ]
    }
