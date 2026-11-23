let P = ../prelude.dhall

in  { title = "TableCell"
    , type = "object"
    , description = "A cell of a table: a heading or a value, with a hairline beneath it, so a table reads as rows."
    , categories = [ "Content" ]
    , element = [ "th", "td" ]
    , variants.secondary = "base"
    , states = [ "static" ]
    , themeableProperties =
      [ "color", "border-color", "border-block-end-width", "padding-block", "padding-inline" ]
    , structuralProperties.static.`border-block-end-style` = "solid"
    , arguments =
          P.commonAttributes
      //  { header =
              P.booleanWith False // { description = "Renders a heading cell, th, instead of a value cell, td." }
          , scope =
              P.choice [ "col", "row" ] "col" // { description = "For a heading cell, whether it heads a column or a row." }
          }
    , details =
      [ "TableCell is structure only, written in Astro, and is what Table renders its cells with. Every th and td on a wacss page is styled as one: padded like a control and ruled beneath with the hairline, so the rows of any table are separated by lines. The reset sets headings in bold, aligned to the start, and values aligned to the top."
      ]
    , related = [ "Table" ]
    , usage =
      [ ''
        <tr><TableCell header>Palette</TableCell><TableCell header>Accent</TableCell></tr>
        <tr><TableCell>Kinari</TableCell><TableCell>Undyed thread</TableCell></tr>''
      ]
    }
