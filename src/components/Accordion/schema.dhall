let P = ../prelude.dhall

in  { title = "Accordion"
    , type = "object"
    , description = "Collapsible sections. Wraps the bits-ui Accordion. Each item's trigger is a button, styled as a tertiary Button; its body is text or another component given as data, and slides open and closed."
    , categories = [ "Display" ]
    , variants.secondary = "surface"
    , states = [ "static", "open" ]
    , themeableProperties =
      [ "color"
      , "border-color"
      , "border-block-end-width"
      , "transition-duration"
      , "transition-timing-function"
      ]
    , structuralProperties =
      { static =
        { display = "grid"
        , `grid-template-rows` = "auto minmax(0, 0fr)"
        , `overflow-x` = "visible"
        , `overflow-y` = "clip"
        , `overflow-clip-margin` = "0.5em"
        , `border-block-end-style` = "solid"
        , `transition-property` = "grid-template-rows"
        }
      , open.`grid-template-rows` = "auto minmax(0, 1fr)"
      }
    , arguments =
          P.commonAttributes
      //  { items =
            { type = "array"
            , description = "The sections, in order."
            , items =
              { type = "object"
              , properties =
                { value = P.described "A value naming the section, unique among the items."
                , title = P.described "The trigger's text."
                , content =
                  { type = [ "string", "object" ]
                  , description = "The body: text, or another component given as data."
                  , properties = P.child.properties
                  }
                , disabled =
                    P.boolean // { description = "Whether the section cannot be opened." }
                }
              , required = [ "value", "title" ]
              }
            }
          , type =
                  P.choice [ "single", "multiple" ] "single"
              //  { description = "Whether one section or several can be open at once." }
          , value =
            { type = [ "string", "array" ]
            , description = "The section or sections open at first."
            }
          , disabled =
              P.booleanWith False // { description = "Disables every section." }
          , loop =
                  P.booleanWith True
              //  { description = "Whether arrow keys wrap from the last trigger to the first." }
          , orientation =
                  P.choice [ "vertical", "horizontal" ] "vertical"
              //  { description = "The direction of keyboard navigation." }
          }
    , required = [ "items" ]
    , details =
      [ "It renders one section per entry of items, each with a rule beneath it. Keyboard behaviour and ARIA attributes come from bits-ui."
      , "A section's trigger is stretched to the width of the section by the stack layout helper around it; because it carries aria-expanded, it draws Button's chevron, which turns while the section is open. A section's body is padded by the box layout helper."
      , "A section opens and closes by sliding, in CSS alone. The section is a grid of two rows, its trigger and its body. Closed, the body's row has no height, and the section clips what overflows it vertically; open, the row takes its natural height. The section transitions its grid rows between the two over its transition duration, with its timing function. So that there is something to slide, the body stays in the page while closed, and it is made inert so that it can be neither focused nor read until it opens. The clip extends half an em beyond the section so that the trigger's focus ring is not cut off."
      ]
    , argumentNotes =
      [ "A body given as data must name a Svelte component, because Accordion is itself a Svelte component."
      ]
    , stateEffects.open = "The body's row opens to its natural height."
    , stateNotes =
      [ "Hover, focus and disabled, and the turning chevron, belong to the trigger, a Button."
      ]
    , related = [ "Button" ]
    , usage =
      [ ''
        <Accordion client:load type="multiple" value="returns" items={[
          { value: "shipping", title: "Shipping", content: "Two to four working days." },
          { value: "returns", title: "Returns", content: "Free within thirty days." },
          { value: "help", title: "Need help?", content: { component: "Button", data: { label: "Contact us", href: "/contact" } } },
        ]} />''
      ]
    }
