let P = ../prelude.dhall

in  { title = "AccordionTrigger"
    , type = "object"
    , description = "The button that opens and closes one accordion item. Part of Accordion."
    , variants = [ "secondary" ]
    , states = [ "static", "hover", "focus", "disabled", "open" ]
    , themeableProperties =
      [ "background"
      , "color"
      , "border-radius"
      , "padding-block"
      , "padding-inline"
      , "gap"
      , "font-size"
      , "font-weight"
      , "outline-color"
      , "outline-width"
      , "outline-offset"
      , "opacity"
      , "transition-duration"
      , "transition-timing-function"
      ]
    , structuralProperties =
      { static =
        { display = "flex"
        , `align-items` = "center"
        , `justify-content` = "space-between"
        , `inline-size` = "100%"
        , `text-align` = "start"
        , `border-style` = "none"
        , `outline-style` = "solid"
        , cursor = "pointer"
        , `transition-property` = "background, outline-color, opacity"
        }
      , disabled.cursor = "not-allowed"
      }
    , pseudoElements.`::after` =
      { themeableProperties =
        [ "transform", "transition-duration", "transition-timing-function" ]
      , structuralProperties.static =
        { content = "\"\""
        , flex = "none"
        , `inline-size` = "0.75em"
        , `block-size` = "0.75em"
        , `background-color` = "currentColor"
        , `clip-path` = "polygon(0 30%, 12% 18%, 50% 56%, 88% 18%, 100% 30%, 50% 80%)"
        , `transition-property` = "transform"
        }
      }
    , arguments = P.commonAttributes // { title = P.string, disabled = P.boolean }
    }
