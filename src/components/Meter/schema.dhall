let P = ../prelude.dhall

in  { title = "Meter"
    , type = "object"
    , description = "A scalar value within a known range."
    , element = "meter"
    , variants = [ "secondary" ]
    , states = [ "static" ]
    , cssProperties =
      [ "background", "color", "border-radius", "border-color", "border-width" ]
    , structure.static =
      { display = "block", `inline-size` = "100%", `border-style` = "solid" }
    , arguments =
          P.commonAttributes
      //  { value = P.number
          , min = P.numberWith 0.0
          , max = P.numberWith 1.0
          , low = P.number
          , high = P.number
          , optimum = P.number
          , label = P.string
          }
    }
