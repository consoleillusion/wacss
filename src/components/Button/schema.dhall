let P = ../prelude.dhall
in
{ title = "Button"
, type = "object"
, description = "A styled action element. Renders a button, or an anchor when href is set."
, element = "button"
, variants = [ "secondary", "primary", "tertiary", "danger" ]
, states = [ "static", "hover", "focus", "active", "disabled", "loading" ]
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
  , "transform"
  , "opacity"
  , "transition-duration"
  ]
, structuralProperties =
  { static =
    { appearance = "none"
    , display = "inline-flex"
    , `align-items` = "center"
    , `justify-content` = "center"
    , `white-space` = "nowrap"
    , `border-style` = "solid"
    , `outline-style` = "solid"
    , `line-height` = "1"
    , cursor = "pointer"
    , `transition-property` = "background, color, border-color, transform"
    }
  , disabled.cursor = "not-allowed"
  , loading.position = "relative"
  }
, arguments =
  { variant = P.choice [ "secondary", "primary", "tertiary", "danger" ] "secondary"
  , type = P.choice [ "button", "submit", "reset" ] "button"
  , label = P.string
  , href = P.described "Renders an anchor instead of a button."
  , loading = P.booleanWith False
  , disabled = P.booleanWith False
  }
}
