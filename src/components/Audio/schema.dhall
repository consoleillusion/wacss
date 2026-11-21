let P = ../prelude.dhall

in  { title = "Audio"
    , type = "object"
    , description = "An audio player with native controls and an optional caption."
    , element = "audio"
    , variants = [ "secondary" ]
    , states = [ "static", "focus" ]
    , cssProperties =
      [ "background"
      , "border-radius"
      , "outline-color"
      , "outline-width"
      , "outline-offset"
      , "transition-duration"
      ]
    , structure =
      { static = { `inline-size` = "100%", `outline-style` = "solid" } }
    , arguments =
          P.commonAttributes
      //  { src = P.string
          , sources =
            { type = "array"
            , description = "Alternative sources, in order of preference."
            , items =
              { type = "object"
              , properties = { src = P.string, type = P.string }
              , required = [ "src" ]
              }
            }
          , controls = P.booleanWith True
          , loop = P.booleanWith False
          , muted = P.booleanWith False
          , preload = P.choice [ "none", "metadata", "auto" ] "metadata"
          , caption = P.string
          }
    }
