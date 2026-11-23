let P = ../prelude.dhall

in  { title = "Card"
    , type = "object"
    , description = "A surface for one piece of content: a figure that renders any wacss component, then a header, body text and footer."
    , variants = [ "secondary", "primary" ]
    , states = [ "static", "hover" ]
    , parts = [ "CardFigure", "CardBody" ]
    , themeableProperties =
      [ "background"
      , "color"
      , "border-color"
      , "border-width"
      , "border-radius"
      , "box-shadow"
      , "font-size"
      , "line-height"
      , "transition-duration"
      , "transition-timing-function"
      ]
    , structuralProperties.static =
      { display = "grid"
      , `grid-template-rows` = "3fr 4fr"
      , `aspect-ratio` = "3 / 4"
      , `inline-size` = "100%"
      , `min-inline-size` = "0"
      , overflow = "hidden"
      , `border-style` = "solid"
      , `transition-property` = "background, box-shadow"
      }
    , arguments =
          P.commonAttributes
      //  { variant = P.choice [ "secondary", "primary" ] "secondary"
          , `as` = P.choice [ "article", "section", "div" ] "article"
          , header = P.described "Card header text."
          , text = P.described "Body text shown below the figure."
          , figure =
            { type = "object"
            , description = "Data for any wacss component, recognised by its title (the component name). Rendered as the card's figure."
            , additionalProperties = True
            }
          , footer = P.string
          , href = P.described "Adds a button to the footer that links here."
          , ctaLabel = P.stringWith "Open component"
          }
    }
