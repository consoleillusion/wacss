let P = ../prelude.dhall

in  { title = "Fieldset"
    , type = "object"
    , description = "A group of related controls under one legend, such as the choices of a question. Disabled, it disables every control in it."
    , categories = [ "Input" ]
    , element = [ "fieldset" ]
    , variants.secondary = "clear"
    , states = [ "static", "disabled" ]
    , themeableProperties = [ "gap", "opacity", "transition-duration", "transition-timing-function" ]
    , structuralProperties =
      { static = { display = "grid", `transition-property` = "opacity" }
      , disabled.cursor = "not-allowed"
      }
    , parts.legend =
      { selector = "legend"
      , themeableProperties = [ "font-weight", "padding-block-end" ]
      , structuralProperties.static.padding = "0"
      }
    , values.legend-font-weight = "var(--font-weight-ui)"
    , values.legend-padding-block-end = "var(--gap)"
    , arguments =
          P.commonAttributes
      //  { legend = P.described "The group's name, read before each control in it."
          , disabled =
              P.booleanWith False // { description = "Disables every control in the group." }
          }
    , details =
      [ "It is the native fieldset element, whose frame the reset removes; its controls are laid out in a grid with the gap between them. Its legend is a part, set in the interface weight above the controls. Disabling the fieldset disables every control in it, as the browser does, and dims the group."
      ]
    , stateEffects.disabled = "Half opacity; the pointer shows that it is not allowed."
    , related = [ "Radio", "Checkbox", "Form" ]
    , usage =
      [ ''
        <Fieldset legend="Choose one" disabled={answered}>
          <Checkbox label="Send me updates" />
        </Fieldset>''
      ]
    }
