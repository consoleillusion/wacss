let P = ../prelude.dhall

in  { title = "ColorPicker"
    , type = "object"
    , description =
        "A colour picker with a saturation area, hue and alpha sliders and optional swatches."
    , variants = [ "secondary" ]
    , states = [ "static", "focus", "disabled" ]
    , cssProperties =
      [ "background"
      , "color"
      , "border-color"
      , "border-width"
      , "border-radius"
      , "padding"
      , "gap"
      , "box-shadow"
      , "outline-color"
      , "outline-width"
      , "outline-offset"
      , "transition-duration"
      ]
    , structure =
      { static = { display = "grid", `border-style` = "solid" }
      , disabled = { cursor = "not-allowed", `pointer-events` = "none" }
      }
    , arguments =
          P.commonAttributes
      //  { value = P.stringWith "#000000"
          , format = P.choice [ "hex", "rgb", "hsl", "oklch" ] "hex"
          , alpha = P.booleanWith False
          , swatches =
            { type = "array"
            , description = "Preset colours."
            , items = P.string
            }
          , name = P.string
          , disabled = P.booleanWith False
          }
    }
