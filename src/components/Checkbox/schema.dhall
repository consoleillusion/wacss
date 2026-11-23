let P = ../prelude.dhall

in  { title = "Checkbox"
    , type = "object"
    , description = "A choice that is on or off. A native checkbox with its label beside it; its tick takes the accent."
    , categories = [ "Input" ]
    , element = [ "input[type=checkbox]" ]
    , variants.secondary = "accent"
    , states = [ "static", "hover", "focus", "disabled" ]
    , themeableProperties =
      [ "accent-color"
      , "outline-color"
      , "outline-width"
      , "outline-offset"
      , "box-shadow"
      , "opacity"
      , "transition-duration"
      , "transition-timing-function"
      ]
    , structuralProperties =
      { static =
        { margin = "0"
        , `inline-size` = "1.1em"
        , `block-size` = "1.1em"
        , cursor = "pointer"
        , `outline-style` = "solid"
        , `transition-property` = "outline-color, box-shadow, opacity"
        }
      , disabled.cursor = "not-allowed"
      }
    , arguments =
          P.fieldAttributes
      //  P.fieldArguments
      //  { checked = P.booleanWith False // { description = "Whether the box is ticked." } }
    , details =
      [ "Its label is beside it, arranged by the cluster layout helper, and any help below it. The tick takes the accent through accent-color."
      ]
    , stateEffects = { hover = "No change of its own; the browser draws its hover."
      , focus = "An accent ring appears."
      , disabled = "Half opacity; the pointer shows that it is not allowed."
      }
    , usage = [ "<Checkbox label=\"Send me updates\" name=\"updates\" checked />"
      ]
    }
