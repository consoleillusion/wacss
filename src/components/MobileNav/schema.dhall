let P = ../prelude.dhall

in  { title = "MobileNav"
    , type = "object"
    , description = "A compact navigation for narrow screens: a toggle that discloses the page's links beneath it. The toggle says whether it is open, so the menu's state is a real condition, not a styling argument."
    , categories = [ "Navigation" ]
    , variants.secondary = "clear"
    , states = [ "static", "open" ]
    , themeableProperties =
      [ "background"
      , "color"
      , "border-color"
      , "border-width"
      , "padding-block"
      , "padding-inline"
      , "gap"
      ]
    , structuralProperties.static =
      { display = "block"
      , `border-style` = "solid"
      }
    , parts.toggle =
      { selector = "button"
      , themeableProperties =
        [ "background"
        , "color"
        , "border-color"
        , "border-width"
        , "border-radius"
        , "padding-block"
        , "padding-inline"
        , "font-size"
        ]
      , structuralProperties.static =
        { display = "inline-flex"
        , `align-items` = "center"
        , `justify-content` = "center"
        , `border-style` = "solid"
        , cursor = "pointer"
        }
      }
    , parts.menu =
      { selector = "[data-mobile-nav-menu]"
      , themeableProperties =
        [ "gap"
        , "padding-block"
        , "border-color"
        , "border-block-end-width"
        ]
      , structuralProperties =
        { static =
          { display = "none"
          , `align-items` = "center"
          , `border-block-end-style` = "solid"
          }
        , open.display = "grid"
        }
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
        , `outline-style` = "solid"
        , `transition-property` = "color, text-decoration-color, outline-color, box-shadow"
        }
      }
    , arguments =
          P.commonAttributes
      //  { label = P.described "The toggle's accessible name, such as Toggle menu."
          , links =
            { type = "array"
            , description = "The links, in order."
            , items =
              { type = "object"
              , properties =
                { href = P.described "Where the link goes."
                , label = P.described "The link's text."
                }
              , required = [ "href", "label" ]
              }
            }
          , current = P.described "The path of the page shown; its link is marked current."
          }
    , required = [ "label" ]
    , details =
      [ "It is a Svelte component, because opening a menu is behaviour. Its root carries data-state=\"open\" only while the menu is shown; the vocabulary's open selector reads that attribute. The toggle also carries aria-expanded and names the menu it controls."
      ]
    , stateEffects.open = "The menu appears beneath the toggle."
    , related = [ "NavBar", "Link", "Icon" ]
    , usage =
      [ ''
        <MobileNav client:load label="Toggle menu" current="/services"
          links={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }]} />''
      ]
    }
