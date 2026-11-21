let P = ../prelude.dhall

in  { title = "Alert"
    , type = "object"
    , description =
        "An inline message that tells the reader something needs their attention."
    , variants = [ "secondary", "informational", "positive", "warning", "danger" ]
    , states = [ "static" ]
    , cssProperties =
      [ "background"
      , "color"
      , "border-color"
      , "border-width"
      , "border-radius"
      , "padding"
      , "gap"
      , "font-size"
      , "line-height"
      ]
    , structure.static =
      { display = "grid", `border-style` = "solid", `box-sizing` = "border-box" }
    , arguments =
          P.commonAttributes
      //  { variant =
              P.choice
                [ "secondary", "informational", "positive", "warning", "danger" ]
                "secondary"
          , title = P.string
          , text = P.string
          }
    }
