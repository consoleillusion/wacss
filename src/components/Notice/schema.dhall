let P = ../prelude.dhall

in  { title = "Notice"
    , type = "object"
    , description = "A message set apart from the page: a result, a warning, an error or a note. In an intent, its background is that intent colour's tint."
    , categories = [ "Content" ]
    , variants =
      { secondary = "surface"
      , positive = "positive-tint"
      , warning = "warning-tint"
      , danger = "danger-tint"
      , informational = "informational-tint"
      }
    , states = [ "static" ]
    , themeableProperties =
      [ "background", "color", "border-color", "border-width", "border-radius", "padding", "gap" ]
    , structuralProperties.static =
      { display = "grid", `border-style` = "solid" }
    , arguments =
          P.commonAttributes
      //  { heading = P.described "A short first line, in bold."
          , text = P.described "The message. Other content can be given as children instead."
          , variant =
                  P.choice [ "secondary", "positive", "warning", "danger", "informational" ] "secondary"
              //  { description = "The notice's intent: none, on the surface, or positive, warning, danger or informational, on that colour's tint." }
          , role =
                  P.choice [ "status", "alert", "note" ] "status"
              //  { description = "How assistive technology announces it: status when it appears, alert at once, note not at all." }
          }
    , details =
      [ "A notice in an intent is drawn on that intent colour's tint, the intent colour washed into the base, so its text, made from its background as every component's is, stays readable in both modes. Its border is made from its background too."
      ]
    , related = [ "Badge" ]
    , usage =
      [ ''
        <Notice variant="positive" heading="Correct." text="NETCONF uses port 830 by default." />''
      , ''
        <Notice variant="danger" role="alert" heading="Couldn't log in" text="Check your username and password." />''
      ]
    }
