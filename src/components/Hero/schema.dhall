let P = ../prelude.dhall

in  { title = "Hero"
    , type = "object"
    , description = "The opening of a page: an eyebrow, a heading, a line of introduction and the two or three actions that follow it. It can stand on a colour or over a photograph, with a wash that keeps its text readable."
    , categories = [ "Display" ]
    , variants =
      { secondary = "inverse"
      , primary = "accent"
      , tertiary = "surface"
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
      , "min-block-size"
      , "max-inline-size"
      , "gap"
      , "box-shadow"
      ]
    , structuralProperties.static =
      { position = "relative"
      , display = "grid"
      , `place-items` = "center start"
      , overflow = "hidden"
      , `border-style` = "solid"
      , `background-image` = "var(--hero-image, none)"
      , `background-position` = "center"
      , `background-size` = "cover"
      }
    , pseudoElements.`::before` =
      { on = "[data-hero-image]"
      , themeableProperties = [ "opacity" ]
      , structuralProperties.static =
        { content = "\"\""
        , position = "absolute"
        , inset = "0"
        , background = "linear-gradient(180deg, var(--color-overlay), transparent)"
        }
      }
    , values.`before-opacity` = "var(--opacity)"
    , parts.content =
      { selector = "[data-hero-content]"
      , structuralProperties.static.position = "relative"
      , themeableProperties = [ "gap", "max-inline-size" ]
      }
    , parts.eyebrow =
      { selector = "[data-hero-eyebrow]"
      , themeableProperties =
        [ "background"
        , "color"
        , "border-color"
        , "border-width"
        , "border-radius"
        , "padding-block"
        , "padding-inline"
        , "font-size"
        , "font-weight"
        ]
      , structuralProperties.static =
        { display = "inline-block"
        , `border-style` = "solid"
        }
      }
    , parts.title =
      { selector = "h1"
      , themeableProperties = [ "color", "font-size", "font-weight", "line-height" ]
      }
    , parts.accent =
      { selector = "[data-hero-accent]"
      , themeableProperties = [ "color" ]
      }
    , parts.description =
      { selector = "p"
      , themeableProperties = [ "color", "font-size", "line-height" ]
      }
    , arguments =
          P.commonAttributes
      //  { `as` =
                  P.choice [ "section", "div", "header" ] "section"
              //  { description = "The hero's root element." }
          , image = P.described "The address of a background photograph."
          , eyebrow = P.described "A short label above the heading."
          , title = P.described "The main heading."
          , titleAccent = P.described "A second line of the heading, set apart in the accent's color."
          , text = P.described "The introduction beneath the heading."
          , actions =
            { type = "array"
            , description = "Buttons or links after the introduction, each given as { component, data }."
            , items = P.child
            }
          , centered =
                  P.booleanWith False
              //  { description = "Centres the content and its actions."
              }
          }
    , details =
      [ "A photograph is passed as data and laid under the content; the overlay is a pseudo-element, so it needs no extra element in the page. The content part sits above it. Actions are components loaded by title, as in a Section."
      ]
    , related = [ "Section", "Button", "Link", "Image" ]
    , usage =
      [ ''
        <Hero image="/massage.jpg" eyebrow="Mobile Beauty Spa · Auckland"
          title="Beauty & Wellness" titleAccent="At Your Doorstep"
          text="Experience personalised beauty treatments in the comfort of your home."
          actions={[{ component: "Button", data: { variant: "primary", label: "Book Now", href: "/contact" } }]} />''
      ]
    }
