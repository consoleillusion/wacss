let P = ../prelude.dhall

in  { title = "Tooltip"
    , type = "object"
    , description = "A short hint shown while its control is hovered or focused."
    , variants = [ "secondary" ]
    , states = [ "static", "open" ]
    , cssProperties =
      [ "background"
      , "color"
      , "border-radius"
      , "padding"
      , "font-size"
      , "box-shadow"
      , "opacity"
      , "transform"
      , "transition-duration"
      ]
    , structure.static = { `pointer-events` = "none" }
    , arguments =
          P.commonAttributes
      //  { text = P.string
          , trigger = P.described "Label of the control the tooltip describes."
          , placement = P.choice [ "top", "bottom", "start", "end" ] "top"
          }
    , required = [ "text" ]
    }
