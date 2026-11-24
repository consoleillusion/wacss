let P = ../prelude.dhall

in  { title = "Stat"
    , type = "object"
    , description = "A number that matters, large, with a label beneath saying what it counts."
    , categories = [ "Content" ]
    , variants.secondary = "clear"
    , states = [ "static" ]
    , themeableProperties = [ "gap", "font-size" ]
    , structuralProperties.static = { display = "grid", `justify-items` = "start" }
    , parts.value =
      { selector = "data"
      , themeableProperties = [ "font-size", "font-weight", "line-height" ]
      }
    , values =
      { value-font-size = "var(--font-size-heading)"
      , value-font-weight = "var(--font-weight-heading)"
      , value-line-height = "var(--line-height-heading)"
      , gap = "0"
      }
    , arguments =
          P.commonAttributes
      //  { value = { description = "The number, or a short value such as 80%.", type = [ "number", "string" ] }
          , label = P.described "What the number counts, such as answers or correct."
          }
    , required = [ "value", "label" ]
    , details =
      [ "The number is a data element, its part value, at the heading size and weight; the label is beneath it in the body size. A row of Stats is arranged by the cluster layout helper."
      ]
    , related = [ "Progress", "Table" ]
    , usage =
      [ ''
        <div class="cluster">
          <Stat value={123} label="answers" />
          <Stat value="80%" label="correct" />
        </div>''
      ]
    }
