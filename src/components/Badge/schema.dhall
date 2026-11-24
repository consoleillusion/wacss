let P = ../prelude.dhall

in  { title = "Badge"
    , type = "object"
    , description = "A short label that marks something: a count, a status, a score. It cannot be pressed; a short label that can is a Chip."
    , categories = [ "Display" ]
    , variants =
      { secondary = "surface"
      , positive = "positive-tint"
      , warning = "warning-tint"
      , danger = "danger-tint"
      , informational = "informational-tint"
      }
    , states = [ "static" ]
    , themeableProperties =
      [ "background", "color", "border-color", "border-width", "border-radius", "padding-block", "padding-inline", "font-size" ]
    , structuralProperties.static =
      { display = "inline-flex"
      , `align-items` = "center"
      , `line-height` = "1"
      , `white-space` = "nowrap"
      , `border-style` = "solid"
      }
    , arguments =
          P.commonAttributes
      //  { label = P.described "The badge's text."
          , variant =
                  P.choice [ "secondary", "positive", "warning", "danger", "informational" ] "secondary"
              //  { description = "The badge's color: the surface, or an intent color's tint, such as positive to mark something right and danger to mark it wrong." }
          }
    , required = [ "label" ]
    , details =
      [ "A badge is a span. No native element expresses a badge, so it is selected by its class. It is not interactive, so it has no state but static: nothing about it suggests it can be pressed."
      ]
    , related = [ "Chip", "Notice", "Table" ]
    , usage =
      [ ''
        <Badge label="New" />
        <Badge label="4/5" variant="positive" />''
      ]
    }
