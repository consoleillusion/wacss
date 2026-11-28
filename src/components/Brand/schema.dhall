let P = ../prelude.dhall

in  { title = "Brand"
    , type = "object"
    , description = "The mark that names a site: a logo, a wordmark and a short line beneath it. It is a link, so the whole mark takes the reader home."
    , categories = [ "Navigation", "Display" ]
    , variants.secondary = "clear"
    , states = [ "static", "hover", "focus" ]
    , themeableProperties =
      [ "color"
      , "gap"
      , "font-size"
      , "font-weight"
      , "line-height"
      ]
    , structuralProperties.static =
      { display = "flex"
      , `align-items` = "center"
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
        { `text-decoration-line` = "none"
        , `text-underline-offset` = "0.2em"
        , `outline-style` = "solid"
        , `transition-property` = "color, text-decoration-color, outline-color, box-shadow"
        }
      }
    , parts.logo =
      { selector = "img"
      , themeableProperties = [ "border-radius", "max-inline-size" ]
      }
    , parts.name =
      { selector = "strong"
      , themeableProperties = [ "font-size", "font-weight", "line-height" ]
      }
    , parts.subtitle =
      { selector = "small"
      , themeableProperties = [ "font-size", "font-weight", "line-height" ]
      }
    , arguments =
          P.commonAttributes
      //  { href = P.stringWith "/" // { description = "Where the mark links." }
          , logo = P.described "The address of the logo image."
          , logoAlt = P.described "Alternative text for the logo; when it repeats the wordmark, leave it empty."
          , name = P.described "The site's name, set beside the logo."
          , subtitle = P.described "A short line under the name, such as the kind of business."
          }
    , required = [ "name" ]
    , details =
      [ "The logo, name and subtitle sit inside one anchor, laid out by the cluster layout helper. Because a Brand is not a Link, its anchor draws no underline; it keeps the focus ring and the color of everything around it."
      ]
    , stateEffects =
      { hover = "The mark's text takes the accent color."
      , focus = "An accent ring appears."
      }
    , related = [ "NavBar", "Footer", "Link" ]
    , usage =
      [ ''
        <Brand href="/" logo="/logo.svg" name="Soulful Beauty" subtitle="MOBILE SPA" />''
      ]
    }
