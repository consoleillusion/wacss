let P = ../prelude.dhall

in  { title = "Slider"
    , type = "object"
    , description = "A value, or a range between two values, chosen by dragging along a track. Wraps the bits-ui Slider: a track on the surface, with the chosen range and its thumbs in the accent."
    , categories = [ "Input" ]
    , variants.secondary = "surface"
    , states = [ "static", "disabled" ]
    , themeableProperties =
      [ "background", "border-color", "border-width", "border-radius", "block-size", "opacity" ]
    , values = { block-size = "calc(var(--space) * 2)", border-radius = "calc(var(--space) * 2)" }
    , structuralProperties =
      { static =
        { position = "relative"
        , `inline-size` = "100%"
        , `min-inline-size` = "10rem"
        , display = "flex"
        , `align-items` = "center"
        , `border-style` = "solid"
        , `touch-action` = "none"
        , `margin-block` = "0.6rem"
        }
      , disabled.cursor = "not-allowed"
      }
    , parts =
      { range =
        { selector = "[data-slider-range]"
        , role = "accent"
        , themeableProperties = [ "background", "border-radius" ]
        , structuralProperties.static = { position = "absolute", `block-size` = "100%" }
        }
      , thumb =
        { selector = "[data-slider-thumb]"
        , role = "accent"
        , themeableProperties =
          [ "background", "border-color", "border-width", "inline-size", "block-size", "outline-color", "outline-width", "outline-offset" ]
        , structuralProperties.static =
          { display = "block"
          , `border-radius` = "50%"
          , `border-style` = "solid"
          , `outline-style` = "solid"
          , cursor = "grab"
          }
        }
      }
    , values.range-border-radius = "inherit"
    , values.thumb-inline-size = "calc(var(--space) * 5)"
    , values.thumb-block-size = "calc(var(--space) * 5)"
    , arguments =
          P.commonAttributes
      //  { label = P.described "Text naming what is chosen."
          , min = P.numberWith 0.0 // { description = "The lowest value." }
          , max = P.numberWith 100.0 // { description = "The highest value." }
          , step = P.numberWith 1.0 // { description = "The amount a value moves by." }
          , value =
            { description = "The value chosen: a number for one thumb, or two numbers, [start, end], for a range."
            , type = [ "number", "array" ]
            , items.type = "number"
            }
          , text = P.described "A line below the track, such as the range chosen as dates."
          , disabled =
              P.booleanWith False // { description = "Prevents input and shows the disabled state." }
          }
    , details =
      [ "It wraps the bits-ui Slider, which gives the thumbs their keyboard control: the arrow keys move a thumb by a step, Page Up and Page Down by ten, Home and End to either end. The track is the component, on the surface; the chosen range and the thumbs are its parts, range and thumb, in the accent. Given two numbers as its value, it has two thumbs and chooses a range."
      ]
    , stateEffects.disabled = "Half opacity; the pointer shows that it is not allowed."
    , related = [ "NumberInput" ]
    , usage =
      [ ''
        <Slider label="Volume" bind:value={volume} />''
      , ''
        <Slider label="Time range" min={first} max={last} bind:value={range} text={rangeText} />''
      ]
    }
