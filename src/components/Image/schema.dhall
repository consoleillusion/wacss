let P = ../prelude.dhall

in  { title = "Image"
    , type = "object"
    , description = "An image with a text alternative and an optional caption."
    , element = "img"
    , variants = [ "secondary" ]
    , states = [ "static" ]
    , cssProperties = [ "border-radius", "filter", "opacity" ]
    , structure.static =
      { `max-inline-size` = "100%"
      , `block-size` = "auto"
      , `object-fit` = "cover"
      }
    , arguments =
          P.commonAttributes
      //  { src = P.string
          , alt =
              P.described
                "Text alternative. Use an empty string only for decorative images."
          , width = P.integer
          , height = P.integer
          , loading = P.choice [ "lazy", "eager" ] "lazy"
          , caption = P.string
          }
    , required = [ "src", "alt" ]
    }
