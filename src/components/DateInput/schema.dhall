let P = ../prelude.dhall

in  { title = "DateInput"
    , type = "object"
    , description = "A date, a time, or both, chosen with the browser's own picker. A native input with its label."
    , categories = [ "Input" ]
    , element = [ "input[type=date]", "input[type=time]", "input[type=datetime-local]" ]
    , variants.secondary = "surface"
    , states = [ "static", "hover", "focus", "disabled" ]
    , themeableProperties = P.controlProperties
    , structuralProperties = P.controlStructure
    , arguments =
          P.fieldAttributes
      //  P.fieldArguments
      //  { type =
                  P.choice [ "date", "time", "datetime-local" ] "date"
              //  { description = "Whether a date, a time, or both are chosen." }
          , min = P.described "The earliest value accepted."
          , max = P.described "The latest value accepted."
          }
    , details =
      [ "Its label is above it and any help below, arranged by the stack layout helper."
      ]
    , stateEffects = P.controlStateEffects
    , usage = [ "<DateInput label=\"Arrival\" type=\"date\" name=\"arrival\" />"
      ]
    }
