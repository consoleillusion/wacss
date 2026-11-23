let P = ../prelude.dhall

in  { title = "NumberInput"
    , type = "object"
    , description = "A number, typed or stepped. A native input with its label."
    , categories = [ "Input" ]
    , element = [ "input[type=number]" ]
    , variants.secondary = "surface"
    , states = [ "static", "hover", "focus", "disabled" ]
    , themeableProperties = P.controlProperties
    , structuralProperties = P.controlStructure
    , arguments =
          P.fieldAttributes
      //  P.fieldArguments
      //  { type = P.choice [ "number" ] "number" // { description = "Always number." }
          , min = P.number // { description = "The smallest value accepted." }
          , max = P.number // { description = "The largest value accepted." } , step = P.described "The step between values, or any."
          }
    , details =
      [ "Its label is above it and any help below, arranged by the stack layout helper."
      ]
    , stateEffects = P.controlStateEffects
    , usage = [ "<NumberInput label=\"Quantity\" name=\"quantity\" value={3} min={1} max={9} />"
      ]
    }
