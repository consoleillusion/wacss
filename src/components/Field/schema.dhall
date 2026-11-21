let P = ../prelude.dhall

in  { title = "Field"
    , type = "object"
    , description =
        "Groups a label, a control, a description and an error message."
    , variants = [ "secondary" ]
    , states = [ "static", "invalid" ]
    , cssProperties =
      [ "color", "gap", "font-size", "line-height", "transition-duration" ]
    , structure.static = { display = "grid" }
    , arguments =
          P.commonAttributes
      //  { label = P.string
          , description = P.string
          , error = P.described "Error text, associated with the control."
          , required = P.booleanWith False
          }
    }
