let P = ../prelude.dhall

in  { title = "AspectRatio"
    , type = "object"
    , description = "A frame that holds its content to a fixed aspect ratio."
    , variants = [ "secondary" ]
    , states = [ "static" ]
    , cssProperties = [] : List Text
    , structure.static =
      { overflow = "hidden", `aspect-ratio` = "var(--frame-ratio)" }
    , arguments =
          P.commonAttributes
      //  { ratio =
              P.choice
                [ "1 / 1", "4 / 3", "16 / 9", "3 / 4", "9 / 16" ]
                "16 / 9"
          }
    }
