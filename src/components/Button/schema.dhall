let P = ../prelude.dhall

in  { title = "Button"
    , type = "object"
    , description = "An action. Wraps the bits-ui Button; renders a button, or an anchor when href is set. A button that discloses content (aria-expanded) draws a chevron that turns while open."
    , categories = [ "Action" ]
    , element = [ "button:not(.chip, [class^=\"lc-\"])", "a[data-button-root]" ]
    , variants =
      { secondary = "accent", primary = "pop", tertiary = "clear", danger = "danger", inverse = "inverse-clear" }
    , states = [ "static", "hover", "focus", "active", "open", "disabled", "loading" ]
    , themeableProperties =
      [ "background"
      , "color"
      , "border-color"
      , "border-width"
      , "border-radius"
      , "padding-block"
      , "padding-inline"
      , "gap"
      , "font-size"
      , "font-weight"
      , "outline-color"
      , "outline-width"
      , "outline-offset"
      , "box-shadow"
      , "transform"
      , "opacity"
      , "filter"
      , "transition-duration"
      , "transition-timing-function"
      ]
    , structuralProperties =
      { static =
        { appearance = "none"
        , display = "inline-flex"
        , `align-items` = "center"
        , `justify-content` = "center"
        , `white-space` = "nowrap"
        , `text-decoration` = "none"
        , `border-style` = "solid"
        , `outline-style` = "solid"
        , `line-height` = "1"
        , cursor = "pointer"
        , `transition-property` = "background, color, border-color, outline-color, box-shadow, transform, opacity, filter"
        }
      , disabled.cursor = "not-allowed"
      , loading.cursor = "progress"
      }
    , pseudoElements.`::after` =
      { on = "[aria-expanded]"
      , themeableProperties =
        [ "transform", "transition-duration", "transition-timing-function" ]
      , structuralProperties.static =
        { content = "\"\""
        , flex = "none"
        , `margin-inline-start` = "auto"
        , `inline-size` = "0.75em"
        , `block-size` = "0.75em"
        , `background-color` = "currentColor"
        , `clip-path` = "polygon(0 30%, 12% 18%, 50% 56%, 88% 18%, 100% 30%, 50% 80%)"
        , `transition-property` = "transform"
        }
      }
    , arguments =
          P.commonAttributes
      //  { variant =
                  P.choice [ "secondary", "primary", "tertiary", "danger", "inverse" ] "secondary"
              //  { description = "Its emphasis." }
          , type =
                  P.choice [ "button", "submit", "reset" ] "button"
              //  { description = "The button's form type. Ignored when href is given." }
          , label = P.described "The text of the button. Children, if given, replace it."
          , href = P.described "Renders an anchor that goes here, instead of a button."
          , loading =
                  P.booleanWith False
              //  { description = "Marks the button busy (aria-busy), prevents activation and shows the loading state." }
          , disabled =
                  P.booleanWith False
              //  { description = "Prevents activation and shows the disabled state." }
          }
    , details =
      [ "Because its rules select every button, the buttons inside other components, such as an accordion's triggers, are styled as Buttons too. Two kinds are left out: a Chip, which Chip styles, and the buttons LayerChart draws inside a chart, such as its legend, whose classes begin with lc- and which LayerChart styles."
      ]
    , argumentNotes = [ "Any other attribute is passed through to the element."
      ]
    , stateEffects =
          P.controlStateEffects
      //  { active = "The button scales down slightly."
          , open = "The chevron turns half a turn."
          , loading = "Half saturation; the pointer shows progress."
          }
    , usage =
      [ ''
        <Button label="Cancel" />
        <Button variant="primary" type="submit" label="Save" loading={saving} />
        <Button variant="tertiary" href="/help" label="Help" />''
      ]
    }
