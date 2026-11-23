let P = ../prelude.dhall

in  { title = "Card"
    , type = "object"
    , description = "A surface for one piece of content: a figure showing another component, then a header, text and a footer."
    , categories = [ "Content" ]
    , variants.secondary = "surface"
    , states = [ "static" ]
    , themeableProperties =
      [ "background"
      , "color"
      , "border-color"
      , "border-width"
      , "border-radius"
      , "font-size"
      , "line-height"
      ]
    , structuralProperties.static =
      { display = "grid"
      , `grid-template-rows` = "3fr 4fr"
      , `aspect-ratio` = "3 / 4"
      , `inline-size` = "100%"
      , `min-inline-size` = "0"
      , overflow = "hidden"
      , `border-style` = "solid"
      }
    , arguments =
          P.commonAttributes
      //  { `as` =
              P.choice [ "article", "section", "div" ] "article" // { description = "The root element." }
          , header = P.described "A heading at the top of the body."
          , text = P.described "Body text."
          , figure = P.child // { description = "The component shown in the figure." }
          , footer =
              P.child // { description = "The component shown at the foot of the body, typically a Button." }
          }
    , details =
      [ "Card is structure only, written in Astro. Its shape is a portrait of three by four, divided into two rows in the ratio three to four. The figure, above, has the frame layout helper: it spans the full width with no padding and centres its component. The body, below, is padded by the box layout helper and arranged by the stack layout helper, with the footer pushed to its foot by the push layout helper, so footers line up across a row of cards."
      ]
    , argumentNotes =
      [ "The default slot adds content to the body after the text; the slot named figure adds content to the figure."
      ]
    , planned =
      [ "A figure is rendered on the server, so an interactive component inside it, such as an Accordion, is static. Hydrating the figure is planned."
      ]
    , usage =
      [ ''
        <Card
          header="Button"
          text="An action, in four variants."
          figure={{ component: "Button", data: { variant: "primary", label: "Save" } }}
          footer={{ component: "Button", data: { label: "Open component", href: "/component/button" } }}
        />''
      ]
    }
