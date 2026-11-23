let P = ../prelude.dhall

in  { title = "TextArea"
    , type = "object"
    , description = "Text entered over several lines. A native textarea with its label."
    , categories = [ "Input" ]
    , element = [ "textarea" ]
    , variants.secondary = "surface"
    , states = [ "static", "hover", "focus", "disabled" ]
    , themeableProperties = P.controlProperties # [ "line-height" ]
    , structuralProperties = P.controlStructure // { static = P.controlStructure.static // { resize = "vertical" } }
    , arguments =
          P.fieldAttributes
      //  P.fieldArguments
      //  { rows = P.integerWith 4 // { description = "The number of lines shown." }
          , placeholder = P.described "Text shown while the field is empty."
          , maxlength = P.integer // { description = "The most characters accepted." }
          }
    , details =
      [ "Its label is above it and any help below, arranged by the stack layout helper. It can be resized vertically."
      ]
    , stateEffects = P.controlStateEffects
    , usage = [ "<TextArea label=\"Message\" name=\"message\" rows={4} />"
      ]
    }
