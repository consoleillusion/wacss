let P = ../prelude.dhall

in  { title = "Badge"
    , type = "object"
    , description = "A short label. Given pressed, it is a toggle that can be selected and unselected, as in a set of filters; selected, it takes the accent."
    , categories = [ "Action", "Content" ]
    , variants =
      { secondary = "surface"
      , positive = "positive-tint"
      , warning = "warning-tint"
      , danger = "danger-tint"
      , informational = "informational-tint"
      }
    , states = [ "static", "hover", "focus", "pressed", "disabled" ]
    , themeableProperties = P.controlProperties
    , structuralProperties =
      { static =
        { appearance = "none"
        , display = "inline-flex"
        , `align-items` = "center"
        , font = "inherit"
        , `line-height` = "1"
        , `white-space` = "nowrap"
        , `border-style` = "solid"
        , `outline-style` = "solid"
        , `transition-property` = "background, color, border-color, outline-color, box-shadow, opacity"
        }
      , disabled.cursor = "not-allowed"
      }
    , arguments =
          P.commonAttributes
      //  { label = P.described "The badge's text."
          , variant =
                  P.choice [ "secondary", "positive", "warning", "danger", "informational" ] "secondary"
              //  { description = "The badge's colour: the surface, or an intent colour's tint, such as positive to mark something right and danger to mark it wrong." }
          , value = P.described "The value the badge stands for, given to its button."
          , pressed =
              P.boolean // { description = "Makes the badge a toggle button, selected when true. Without it, the badge is a label." }
          , disabled =
              P.booleanWith False // { description = "Prevents a toggle from being pressed and shows the disabled state." }
          }
    , required = [ "label" ]
    , details =
      [ "A badge is a span, or a button when pressed is given. No native element expresses a badge, so it is selected by its class. A toggle carries aria-pressed, which the pressed state reads. Button's element rules exclude buttons with the badge class, so a toggle is styled by Badge alone."
      ]
    , stateEffects =
          P.controlStateEffects
      //  { pressed = "The background and border take the accent, and the text the base colour." }
    , stateNotes =
      [ "Pressed is written after hover, so a selected badge keeps the accent under the pointer." ]
    , usage =
      [ ''
        <Badge label="New" />
        <Badge label="Input" value="input" pressed={false} />''
      ]
    }
