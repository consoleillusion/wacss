let P = ../prelude.dhall

in  { title = "Link"
    , type = "object"
    , description = "A link to another page or place. Every plain anchor is styled as one; its underline takes the accent on hover, and the current page's link reads heavier."
    , categories = [ "Action", "Navigation" ]
    , element = [ "a:not([data-button-root])" ]
    , variants.secondary = "clear"
    , states = [ "static", "hover", "focus", "current" ]
    , themeableProperties =
      [ "color"
      , "text-decoration-color"
      , "text-decoration-thickness"
      , "font-weight"
      , "outline-color"
      , "outline-width"
      , "outline-offset"
      , "box-shadow"
      , "transition-duration"
      , "transition-timing-function"
      ]
    , structuralProperties.static =
      { `text-decoration-line` = "underline"
      , `text-underline-offset` = "0.2em"
      , `outline-style` = "solid"
      , `transition-property` = "text-decoration-color, outline-color, box-shadow"
      }
    , arguments =
          P.commonAttributes
      //  { href = P.described "Where the link goes."
          , label = P.described "The link's text."
          , current =
                  P.booleanWith False
              //  { description = "Marks the link as the current page's, with aria-current." }
          }
    , required = [ "href" ]
    , details =
      [ "It is underlined, with the underline drawn as a hairline."
      ]
    , stateEffects =
      { hover = "The underline turns to the accent."
      , focus = "An accent ring appears."
      , current = "The text reads in the heading weight."
      }
    , usage = [ "<Link href=\"/guide\" label=\"Read the guide\" />"
      ]
    }
