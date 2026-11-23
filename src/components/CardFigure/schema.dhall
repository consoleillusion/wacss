let P = ../prelude.dhall

in  { title = "CardFigure"
    , type = "object"
    , description = "The figure row of a card: full width, no padding, content centred. Part of Card."
    , variants = [ "secondary" ]
    , states = [ "static" ]
    , themeableProperties = [ "background" ]
    , structuralProperties.static =
      { display = "grid"
      , `place-items` = "center"
      , `min-block-size` = "0"
      , overflow = "hidden"
      , margin = "0"
      }
    , arguments = P.commonAttributes
    }
