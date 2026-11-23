let P = ../prelude.dhall

in  { title = "AccordionContent"
    , type = "object"
    , description = "The body of one accordion item, shown while it is open. Part of Accordion."
    , variants = [ "secondary" ]
    , states = [ "static" ]
    , themeableProperties =
      [ "color", "padding-inline", "padding-block-end", "font-size", "line-height" ]
    , structuralProperties.static.overflow = "hidden"
    , arguments = P.commonAttributes // { content = P.string }
    }
