let P = ../prelude.dhall

in  { title = "Webpage"
    , type = "object"
    , description = "An embedded web page with working links."
    , element = "iframe"
    , variants = [ "secondary" ]
    , states = [ "static", "focus" ]
    , cssProperties =
      [ "background"
      , "border-color"
      , "border-width"
      , "border-radius"
      , "outline-color"
      , "outline-width"
      , "outline-offset"
      ]
    , structure.static =
      { `inline-size` = "100%"
      , `border-style` = "solid"
      , `outline-style` = "solid"
      }
    , arguments =
          P.commonAttributes
      //  { src = P.string
          , title = P.described "Accessible name of the frame."
          , sandbox =
              { type = "string"
              , description =
                  "Space-separated sandbox tokens. Empty applies every restriction."
              , default = ""
              }
          , referrerpolicy = P.stringWith "no-referrer"
          , loading = P.choice [ "lazy", "eager" ] "lazy"
          }
    , required = [ "src", "title" ]
    }
