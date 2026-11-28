let P = ../prelude.dhall

in  { title = "NavBar"
    , type = "object"
    , description = "The bar across the top of a site: its title, links to its sections, and controls at the far end, all given as data."
    , categories = [ "Navigation" ]
    , variants.secondary = "base"
    , states = [ "static" ]
    , themeableProperties =
      [ "background", "color", "border-color", "border-block-end-width", "padding-block" ]
    , structuralProperties.static =
      { display = "block", `border-block-end-style` = "solid" }
    , arguments =
          P.commonAttributes
      //  { title = P.described "The site's name, shown first, when no brand is given."
          , href = P.stringWith "/" // { description = "Where the title links." }
          , brand = P.child // { description = "The site's mark, as a component given by title, in place of the title." }
          , mobile = P.child // { description = "A compact menu for narrow screens, such as a MobileNav, as a component given by title." }
          , links =
            { type = "array"
            , description = "The sections, in order: { href, label }."
            , items =
              { type = "object"
              , properties =
                { href = P.described "Where the link goes."
                , label = P.described "The link's text."
                }
              }
            }
          , current = P.described "The path of the page being shown; its link and the links of its sections are marked current."
          , end = { type = "array", description = "Components shown at the far end of the bar, as data.", items = P.child }
          }
    , details =
      [ "It spans the page with a rule beneath it; inside, the center and spread layout helpers keep the brand or title and links at one end and the end components at the other. Each link is a Link, marked current when current is its path or a path beneath it. A brand and a narrow-screen menu are components given by title, so the bar imports none of them."
      ]
    , related = [ "Link", "Brand", "MobileNav" ]
    , usage =
      [ ''
        <NavBar title="wacss" href="/" current="/component/button"
          links={[{ href: "/component", label: "Component" }, { href: "/design", label: "Design" }]}
          end={[{ component: "Select", data: { label: "Palette", options: ["kinari", "sakura"] } }]} />
        <NavBar current="/services"
          brand={{ component: "Brand", data: { name: "Soulful Beauty", subtitle: "MOBILE SPA" } }}
          links={[{ href: "/services", label: "Services" }]}
          mobile={{ component: "MobileNav", data: { label: "Toggle menu", links: [{ href: "/services", label: "Services" }] } }} />''
      ]
    }
