let P = ../prelude.dhall

in  { title = "Progress"
    , type = "object"
    , description = "How far a task has come: a native progress bar, with a label above it and a line of text below. Its bar takes the accent, or an intent colour."
    , categories = [ "Content" ]
    , element = [ "progress" ]
    , variants =
      { secondary = "accent"
      , positive = "positive"
      , warning = "warning"
      , danger = "danger"
      , informational = "informational"
      }
    , states = [ "static" ]
    , themeableProperties = [ "accent-color", "block-size" ]
    , values.block-size = "calc(var(--space) * 2)"
    , structuralProperties.static = { `inline-size` = "100%", margin = "0" }
    , arguments =
          P.commonAttributes
      //  { label = P.described "Text naming what is measured, above the bar."
          , value = P.number // { description = "How much is done. Leave it out for a bar that shows only that work is going on." }
          , max = P.numberWith 1.0 // { description = "How much there is to do." }
          , text = P.described "A line below the bar, such as 7 correct of 9 answered."
          , variant =
                  P.choice [ "secondary", "positive", "warning", "danger", "informational" ] "secondary"
              //  { description = "The bar's colour: the accent, or an intent colour." }
          }
    , details =
      [ "It is the native progress element, coloured through accent-color, so it is drawn by the browser and announced as a progress bar. Its height is a component token, at twice the space step."
      ]
    , related = [ "Stat" ]
    , usage =
      [ ''
        <Progress label="Quiz" value={9} max={20} text="7 correct of 9 answered" />''
      ]
    }
