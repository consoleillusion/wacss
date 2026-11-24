let P = ../prelude.dhall

in  { title = "Radio"
    , type = "object"
    , description = "One choice from several. Native radio buttons, each with its label beside it, in a Fieldset under a legend; the chosen one takes the accent."
    , categories = [ "Input" ]
    , element = [ "input[type=radio]" ]
    , variants.secondary = "accent"
    , states = [ "static", "hover", "focus", "disabled" ]
    , themeableProperties =
      [ "accent-color"
      , "outline-color"
      , "outline-width"
      , "outline-offset"
      , "box-shadow"
      , "opacity"
      , "transition-duration"
      , "transition-timing-function"
      ]
    , structuralProperties =
      { static =
        { margin = "0"
        , `inline-size` = "1.1em"
        , `block-size` = "1.1em"
        , cursor = "pointer"
        , `outline-style` = "solid"
        , `transition-property` = "outline-color, box-shadow, opacity"
        }
      , disabled.cursor = "not-allowed"
      }
    , arguments =
          P.commonAttributes
      //  { legend = P.described "The question the choices answer, as the group's legend."
          , name = P.described "The form field's name, shared by every choice."
          , options =
            { type = "array"
            , description = "The choices, in order: { value, label }."
            , items =
              { type = "object"
              , properties =
                { value = P.described "What the field holds when this choice is made."
                , label = P.described "The choice's text."
                }
              }
            }
          , value = P.described "The value of the choice made."
          , required =
              P.booleanWith False // { description = "Marks the group as one that must be answered." }
          , disabled =
              P.booleanWith False // { description = "Disables every choice." }
          }
    , required = [ "name", "options" ]
    , details =
      [ "The choices are a Fieldset, each a radio button with its label beside it, arranged by the cluster layout helper. The chosen one takes the accent through accent-color. Arrow keys move between the choices, as the browser provides."
      ]
    , stateEffects = { hover = "No change of its own; the browser draws its hover."
      , focus = "An accent ring appears."
      , disabled = "Half opacity; the pointer shows that it is not allowed."
      }
    , related = [ "Fieldset", "Checkbox" ]
    , usage =
      [ ''
        <Radio legend="Choose one" name="answer"
          options={[{ value: "a", label: "NETCONF" }, { value: "b", label: "RESTCONF" }]} />''
      ]
    }
