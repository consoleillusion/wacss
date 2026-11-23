let P = ../prelude.dhall

in  { title = "CardBody"
    , type = "object"
    , description = "The body row of a card: header, text and footer. Part of Card."
    , variants = [ "secondary" ]
    , states = [ "static" ]
    , themeableProperties = [ "padding", "gap" ]
    , structuralProperties.static =
      { display = "flex"
      , `flex-direction` = "column"
      , `min-block-size` = "0"
      , overflow = "auto"
      }
    , arguments = P.commonAttributes
    }
