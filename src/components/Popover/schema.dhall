let P = ../prelude.dhall

in  { title = "Popover"
    , type = "object"
    , description = "A panel of content shown next to the control that opens it."
    , variants = [ "secondary" ]
    , states = [ "static", "open" ]
    , cssProperties =
      [ "background"
      , "color"
      , "border-color"
      , "border-width"
      , "border-radius"
      , "padding"
      , "box-shadow"
      , "opacity"
      , "transform"
      , "transition-duration"
      ]
    , structure.static = { `border-style` = "solid" }
    , arguments =
          P.commonAttributes
      //  { trigger = P.described "Label of the control that opens the popover."
          , text = P.string
          , placement =
              P.choice [ "top", "bottom", "start", "end" ] "bottom"
          , open = P.booleanWith False
          }
    }
