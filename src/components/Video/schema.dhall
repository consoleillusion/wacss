let P = ../prelude.dhall

in  { title = "Video"
    , type = "object"
    , description =
        "A video player with native controls, optional captions and an optional caption."
    , element = "video"
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
    , structure.static =
      { `inline-size` = "100%"
      , `block-size` = "auto"
      , `outline-style` = "solid"
      , `object-fit` = "cover"
      }
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
          , poster = P.string
          , tracks =
            { type = "array"
            , description = "Captions and subtitles."
            , items =
              { type = "object"
              , properties =
                { src = P.string
                , kind =
                    P.choice
                      [ "captions", "subtitles", "descriptions", "chapters" ]
                      "captions"
                , srclang = P.string
                , label = P.string
                }
              , required = [ "src" ]
              }
            }
          , controls = P.booleanWith True
          , autoplay = P.booleanWith False
          , loop = P.booleanWith False
          , muted = P.booleanWith False
          , playsinline = P.booleanWith False
          , preload = P.choice [ "none", "metadata", "auto" ] "metadata"
          , caption = P.string
          }
    }
