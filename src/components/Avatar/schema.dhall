let P = ../prelude.dhall

in  { title = "Avatar"
    , type = "object"
    , description =
        "A person or entity shown as an image, falling back to initials."
    , variants = [ "secondary" ]
    , states = [ "static" ]
    , cssProperties =
      [ "background"
      , "color"
      , "border-color"
      , "border-width"
      , "border-radius"
      , "font-size"
      , "font-weight"
      ]
    , structure.static =
      { display = "inline-grid"
      , `place-items` = "center"
      , overflow = "hidden"
      , `aspect-ratio` = "1"
      , `inline-size` = "2.5em"
      , `border-style` = "solid"
      }
    , arguments =
          P.commonAttributes
      //  { src = P.string
          , alt = P.described "Text alternative for the image."
          , name = P.described "Full name, used to derive fallback initials."
          }
    }
