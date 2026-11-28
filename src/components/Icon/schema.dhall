let P = ../prelude.dhall

in  { title = "Icon"
    , type = "object"
    , description = "A small outline symbol drawn from the library's small set of paths. It takes the color and size of the text beside it, and stays hidden from assistive technology unless it is given a label of its own."
    , categories = [ "Display" ]
    , variants.secondary = "clear"
    , states = [ "static" ]
    , themeableProperties =
      [ "color"
      , "font-size"
      , "line-height"
      , "opacity"
      ]
    , structuralProperties.static =
      { display = "inline-block"
      , `inline-size` = "1em"
      , `block-size` = "1em"
      , `vertical-align` = "-0.125em"
      , fill = "none"
      , stroke = "currentColor"
      , `stroke-width` = "1.75"
      , `stroke-linecap` = "round"
      , `stroke-linejoin` = "round"
      }
    , arguments =
          P.commonAttributes
      //  { name =
                  P.choice
                    [ "arrow-right", "calendar", "check", "chevron-down", "clock", "heart", "map-pin", "menu", "phone", "sparkles", "star", "x" ]
                    "sparkles"
              //  { description = "The symbol to draw." }
          , label = P.described "A name for the symbol when it carries meaning; leave it empty when nearby text names it."
          }
    , details =
      [ "The paths are hand-authored constants in the component, so an Icon needs no assets and no network request. The symbols are outlines: their stroke is currentColor and their fill is none."
      ]
    , related = [ "Feature", "CheckList", "Button" ]
    , usage =
      [ ''
        <Icon name="sparkles" />
        <Icon name="phone" label="Phone" />''
      ]
    }
