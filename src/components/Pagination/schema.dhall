let P = ../prelude.dhall

in  { title = "Pagination"
    , type = "object"
    , description = "Links to move between pages of a long list."
    , variants = [ "secondary" ]
    , states = [ "static", "hover", "focus", "current", "disabled" ]
    , cssProperties =
      [ "background"
      , "color"
      , "border-color"
      , "border-width"
      , "border-radius"
      , "padding-block"
      , "padding-inline"
      , "gap"
      , "font-size"
      , "outline-color"
      , "outline-width"
      , "outline-offset"
      , "opacity"
      , "transition-duration"
      ]
    , structure =
      { static = { display = "flex", `outline-style` = "solid" }
      , disabled.cursor = "not-allowed"
      }
    , arguments =
          P.commonAttributes
      //  { page = P.integerWith 1
          , pageCount = P.integer
          , siblings = P.integerWith 1
          , hrefTemplate =
              P.described
                "Link target for each page, with {page} replaced by the page number."
          , label = P.stringWith "Pagination"
          }
    , required = [ "pageCount" ]
    }
