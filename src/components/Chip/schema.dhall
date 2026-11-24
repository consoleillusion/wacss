let P = ../prelude.dhall

in  { title = "Chip"
    , type = "object"
    , description = "A short label that can be pressed and released, as in a set of filters. Pressed, it takes the accent. A short label that cannot be pressed is a Badge."
    , categories = [ "Input" ]
    , variants.secondary = "surface"
    , states = [ "static", "hover", "focus", "pressed", "disabled" ]
    , themeableProperties = P.controlProperties
    , structuralProperties =
      { static =
        { appearance = "none"
        , display = "inline-flex"
        , `align-items` = "center"
        , font = "inherit"
        , `line-height` = "1"
        , `white-space` = "nowrap"
        , cursor = "pointer"
        , `border-style` = "solid"
        , `outline-style` = "solid"
        , `transition-property` = "background, color, border-color, outline-color, box-shadow, opacity"
        }
      , disabled.cursor = "not-allowed"
      }
    , arguments =
          P.commonAttributes
      //  { label = P.described "The chip's text."
          , value = P.described "The value the chip stands for, given to its button."
          , pressed =
              P.booleanWith False // { description = "Whether the chip is pressed. Bound, so pressing it is read back." }
          , disabled =
              P.booleanWith False // { description = "Prevents the chip from being pressed and shows the disabled state." }
          }
    , required = [ "label" ]
    , details =
      [ "A chip is a button carrying aria-pressed, which the pressed state reads; pressing it toggles it. No native element expresses a chip, so it is selected by its class, and Button's element rules exclude buttons with the chip class, so a chip is styled by Chip alone."
      , "Pressing it needs its script: in an Astro page, hydrate it (client:load or client:visible). Rendered without it, as a server-side snapshot, it shows its state but cannot change it."
      ]
    , stateEffects =
          P.controlStateEffects
      //  { pressed = "The background and border take the accent, and the text is made from it." }
    , stateNotes =
      [ "Pressed is written after hover, so a pressed chip keeps the accent under the pointer." ]
    , related = [ "Badge", "Button" ]
    , usage =
      [ ''
        <Chip label="Input" value="input" bind:pressed={showInputs} />''
      ]
    }
