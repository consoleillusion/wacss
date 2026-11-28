let P = ../prelude.dhall

in  { title = "Section"
    , type = "object"
    , description = "A band across the page that holds one stretch of content: a heading, a line of text and actions, or anything given in its slot. It is the full-width surface behind a call to action."
    , categories = [ "Display" ]
    , variants =
      { secondary = "surface"
      , primary = "accent"
      , tertiary = "base"
      }
    , states = [ "static" ]
    , themeableProperties =
      [ "background"
      , "color"
      , "border-color"
      , "border-width"
      , "border-radius"
      , "padding-block"
      , "padding-inline"
      , "max-inline-size"
      , "gap"
      , "box-shadow"
      ]
    , structuralProperties.static =
      { display = "block"
      , `border-style` = "solid"
      , `background-image` = "var(--section-wash, none)"
      , `background-position` = "center"
      , `background-size` = "cover"
      }
    , parts.heading =
      { selector = "h2"
      , themeableProperties = [ "font-size", "font-weight", "line-height" ]
      }
    , parts.text =
      { selector = "p"
      , themeableProperties = [ "font-size", "line-height" ]
      }
    , parts.link =
      { selector = "a"
      , role = "clear"
      , themeableProperties =
        [ "color"
        , "text-decoration-color"
        , "text-decoration-thickness"
        , "outline-color"
        , "outline-width"
        , "outline-offset"
        , "box-shadow"
        , "transition-duration"
        , "transition-timing-function"
        ]
      , structuralProperties.static =
        { `text-underline-offset` = "0.2em"
        , `outline-style` = "solid"
        , `transition-property` = "color, text-decoration-color, outline-color, box-shadow"
        }
      }
    , arguments =
          P.commonAttributes
      //  { `as` =
                  P.choice [ "section", "div", "article" ] "section"
              //  { description = "The band's root element." }
          , wash = P.described "A CSS image, such as a gradient, laid over the band's colour. Passed as data, not as a styling class."
          , title = P.described "The band's heading."
          , text = P.described "A line beneath the heading."
          , actions =
            { type = "array"
            , description = "Buttons or links after the text, each given as { component, data }."
            , items = P.child
            }
          , centered =
                  P.booleanWith False
              //  { description = "Centres the heading, text and actions, and gives the text a narrower measure."
              }
          }
    , details =
      [ "The band spans the page; a center helper keeps its content to the reading measure. Its colour comes from the variant, while an optional wash, given as data, lays a gradient or picture over it. A call to action is a Section with actions and the primary variant."
      ]
    , related = [ "Hero", "Card", "Button", "Notice" ]
    , usage =
      [ ''
        <Section variant="primary" centered title="Ready to Book Your Treatment?"
          text="Contact us today to schedule your personalised spa experience."
          actions={[{ component: "Button", data: { variant: "primary", label: "Book Now", href: "/contact" } }]} />''
      ]
    }
