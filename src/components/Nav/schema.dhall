let P = ../prelude.dhall

in  { title = "Nav"
    , type = "object"
    , description = "A list of links to the major destinations of a site or section."
    , element = "nav"
    , variants = [ "secondary" ]
    , states = [ "static" ]
    , cssProperties = [ "color", "gap", "font-size", "font-weight" ]
    , structure.static = { display = "flex" }
    , arguments =
          P.commonAttributes
      //  { label = P.described "Accessible name of the navigation landmark."
          , items =
            { type = "array"
            , description = "Links in order."
            , items =
              { type = "object"
              , properties =
                { label = P.string, href = P.string, current = P.boolean }
              , required = [ "label", "href" ]
              }
            }
          , orientation =
              P.choice [ "horizontal", "vertical" ] "horizontal"
          }
    }
