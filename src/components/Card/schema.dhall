let P = ../prelude.dhall
in
{ title = "Card"
, type = "object"
, description = "A surface for grouping content: a header, body text and a figure that renders any wacss component."
, properties =
    { variants = [ "secondary", "primary" ]
    , states = [ "static", "hover" ]
    , cssProperties =
      [ "background"
      , "color"
      , "border-color"
      , "border-width"
      , "border-radius"
      , "padding"
      , "box-shadow"
      , "gap"
      , "font-size"
      , "font-weight"
      , "line-height"
      ]
    , structure.static
      =
      { display = "grid"
      , `grid-template-rows` = "3fr 4fr"
      , `aspect-ratio` = "3 / 4"
      , `inline-size` = "100%"
      , `min-inline-size` = "0"
      , overflow = "hidden"
      , `border-style` = "solid"
      , `box-sizing` = "border-box"
      }
    , channels.hover = [ "box-shadow" ]
    , arguments =
          P.commonAttributes
      //  { `as` = P.choice [ "article", "section", "div" ] "article"
          , header = P.described "Card header text."
          , text = P.described "Body text shown below the figure."
          , figure =
            { type = "object"
            , description =
                "Data matching any wacss component schema, recognised by its title (or a component name). Rendered inside the card as its figure."
            , additionalProperties = True
            }
          , component =
              P.described
                "Name of a component to render as the card body, with data."
          , data = P.object
          , footer = P.string
          , href = P.described "Adds a button to the footer that links here."
          , ctaLabel = P.stringWith "Open component"
          , orientation =
              P.choice [ "portrait", "square", "landscape" ] "portrait"
          }
    }
}
