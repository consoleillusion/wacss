let P = ../prelude.dhall

in  { title = "Progress"
    , type = "object"
    , description =
        "How far a task has got. Without a value it shows indeterminate progress."
    , element = "progress"
    , variants = [ "secondary", "primary" ]
    , states = [ "static" ]
    , cssProperties =
      [ "background"
      , "color"
      , "border-radius"
      , "animation-name"
      , "animation-duration"
      ]
    , structure.static =
      { display = "block", `inline-size` = "100%", appearance = "none" }
    , arguments =
          P.commonAttributes
      //  { variant = P.choice [ "secondary", "primary" ] "secondary"
          , value = P.number
          , max = P.numberWith 100.0
          , label = P.string
          }
    }
