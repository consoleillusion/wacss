let P = ../prelude.dhall

in  { title = "Footer"
    , type = "object"
    , description = "The close of a page: the site's mark, a line about it, columns of links, its contact details and the legal small print."
    , categories = [ "Navigation" ]
    , variants =
      { secondary = "base"
      , primary = "accent"
      }
    , states = [ "static" ]
    , themeableProperties =
      [ "background"
      , "color"
      , "border-color"
      , "border-width"
      , "padding-block"
      , "padding-inline"
      , "max-inline-size"
      , "gap"
      , "font-size"
      , "line-height"
      , "box-shadow"
      ]
    , structuralProperties.static =
      { display = "block"
      , `border-style` = "solid"
      }
    , parts.brand =
      { selector = ".brand"
      , themeableProperties = [ "color" ]
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
    , parts.legal =
      { selector = "small"
      , themeableProperties = [ "font-size", "color" ]
      }
    , arguments =
          P.commonAttributes
      //  { brand = P.child // { description = "The site's mark, as a component given by title." }
          , description = P.described "A sentence about the site, beside its mark."
          , columns =
            { type = "array"
            , description = "Groups of links, in order."
            , items =
              { type = "object"
              , properties =
                { heading = P.described "The group's title."
                , links =
                  { type = "array"
                  , description = "The links in the group."
                  , items =
                    { type = "object"
                    , properties =
                      { href = P.described "Where the link goes."
                      , label = P.described "The link's text."
                      }
                    , required = [ "href", "label" ]
                    }
                  }
                }
              , required = [ "heading" ]
              }
            }
          , contact =
            { type = "array"
            , description = "Ways to reach the site: each has a label, a value and an optional link."
            , items =
              { type = "object"
              , properties =
                { label = P.described "What the detail is, such as Phone."
                , value = P.described "The detail itself."
                , href = P.described "A link for the value, such as a tel: address."
                }
              , required = [ "label", "value" ]
              }
            }
          , copyright = P.described "The copyright line."
          , legal =
            { type = "array"
            , description = "Links to the legal pages, after the copyright line."
            , items =
              { type = "object"
              , properties =
                { href = P.described "Where the link goes."
                , label = P.described "The link's text."
                }
              , required = [ "href", "label" ]
              }
            }
          }
    , details =
      [ "Its mark is any component given as data and loaded by title, so a Brand can be used here and in the NavBar without the Footer importing it. Columns are arranged by the grid helper; links and small print by the cluster helper."
      ]
    , related = [ "Brand", "NavBar", "Link" ]
    , usage =
      [ ''
        <Footer
          brand={{ component: "Brand", data: { name: "Soulful Beauty", subtitle: "MOBILE SPA" } }}
          description="Beauty treatments in the comfort of your own space."
          columns={[{ heading: "Services", links: [{ href: "/services", label: "Massage" }] }]}
          copyright="© 2026 Soulful Beauty. All rights reserved." />''
      ]
    }
