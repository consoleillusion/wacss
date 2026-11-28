let P = ../prelude.dhall

in  { title = "CheckList"
    , type = "object"
    , description = "A list of things that are included or assured: each item is marked with a tick. It is the pattern behind a service's benefits or a shop's promises."
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
      , `list-style` = "none"
      , `margin-block` = "0"
      , `padding-inline-start` = "0"
      }
    , parts.item =
      { selector = "li"
      , themeableProperties = [ "gap", "padding-block", "padding-inline" ]
      , structuralProperties.static =
        { display = "flex"
        , `align-items` = "start"
        }
      }
    , parts.icon =
      { selector = "[data-check-icon]"
      , themeableProperties = [ "color", "font-size" ]
      }
    , parts.text =
      { selector = "span"
      , themeableProperties = [ "color", "font-size", "line-height" ]
      }
    , arguments =
          P.commonAttributes
      //  { icon =
                  P.child
              //  { description = "The tick before every item, given as a component by title."
                 , default = { component = "Icon", data = { name = "check" } }
                 }
          , items =
            { type = "array"
            , description = "The points, in order."
            , items = P.string
            }
          }
    , required = [ "items" ]
    , details =
      [ "The list is a native ul: the marks are not bullets but another component, an Icon by default, loaded by title. Each item is a flex row, so its tick stays beside the first line of a wrapped point."
      ]
    , related = [ "Icon", "Feature", "Table" ]
    , usage =
      [ ''
        <CheckList items={["Relieves muscle tension", "Improves blood circulation", "Promotes better sleep"]} />''
      ]
    }
