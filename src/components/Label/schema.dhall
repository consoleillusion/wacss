let P = ../prelude.dhall

in  { title = "Label"
    , type = "object"
    , description = "A text label for a form control."
    , element = "label"
    , variants = [ "secondary" ]
    , states = [ "static", "disabled" ]
    , cssProperties =
      [ "color", "font-size", "font-weight", "gap", "opacity" ]
    , structure.static = { display = "inline-flex" }
    , arguments =
          P.commonAttributes
      //  { text = P.string
          , `for` = P.described "The id of the control this labels."
          , required = P.booleanWith False
          }
    }
