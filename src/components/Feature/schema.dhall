let P = ../prelude.dhall

in  { title = "Feature"
    , type = "object"
    , description = "One of a set of short selling points: a symbol, a heading and a sentence. On its own it reads as a note; in a grid it explains what a service offers."
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
      , "box-shadow"
      ]
    , structuralProperties.static =
      { display = "block"
      , `border-style` = "solid"
      }
    , parts.figure =
      { selector = "[data-feature-figure]"
      , themeableProperties =
        [ "background"
        , "color"
        , "border-color"
        , "border-width"
        , "border-radius"
        , "padding-block"
        , "padding-inline"
        , "box-shadow"
        ]
      , structuralProperties.static =
        { display = "grid"
        , `place-items` = "center"
        , `inline-size` = "3.5em"
        , `block-size` = "3.5em"
        , `border-style` = "solid"
        }
      }
    , parts.heading =
      { selector = "h3"
      , themeableProperties = [ "color", "font-size", "font-weight", "line-height" ]
      }
    , parts.text =
      { selector = "p"
      , themeableProperties = [ "color", "font-size", "line-height" ]
      }
    , arguments =
          P.commonAttributes
      //  { figure = P.child // { description = "The symbol, as a component given by title, usually an Icon." }
          , title = P.described "The point's short heading."
          , text = P.described "The sentence explaining it."
          }
    , required = [ "title" ]
    , details =
      [ "Its figure is any component given as data, so a Feature holds an Icon without importing it. The heading, sentence and figure are arranged by the stack helper."
      ]
    , related = [ "Icon", "Card", "CheckList" ]
    , usage =
      [ ''
        <Feature figure={{ component: "Icon", data: { name: "sparkles" } }}
          title="Premium Products" text="We use only the finest natural and professional-grade beauty products." />''
      ]
    }
