let P = ../prelude.dhall

in  { title = "ColorInput"
    , type = "object"
    , description = "A color, chosen with the browser's own picker. A native color input with its label."
    , categories = [ "Input" ]
    , element = [ "input[type=color]" ]
    , variants.secondary = "surface"
    , states = [ "static", "hover", "focus", "disabled" ]
    , themeableProperties = P.controlProperties
    , structuralProperties =
        P.controlStructure
      // { static =
              P.controlStructure.static
            // { `inline-size` = "3em", `block-size` = "2em", cursor = "pointer" }
         }
    , arguments = P.fieldAttributes // P.fieldArguments
    , details =
      [ "Its label is above it and any help below, arranged by the stack layout helper."
      ]
    , stateEffects = P.controlStateEffects
    , usage = [ "<ColorInput label=\"Color\" name=\"color\" value=\"#c23a22\" />"
      ]
    }
