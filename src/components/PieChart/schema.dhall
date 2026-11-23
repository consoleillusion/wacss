let P = ../prelude.dhall

in  { title = "PieChart"
    , type = "object"
    , description = "A pie chart: one slice for each row, sized by its value."
    , categories = [ "Content" ]
    , variants.secondary = "clear"
    , states = [ "static" ]
    , themeableProperties = [ "color", "font-size" ]
    , structuralProperties.static = P.chartStructure
    , arguments =
          P.commonAttributes
      //  P.chartArguments
      //  { label = P.stringWith "A pie chart" // { description = "The text that names the chart to assistive technology." }
          , key = P.stringWith "key" // { description = "The key of each slice's name." }
          , value = P.stringWith "value" // { description = "The key of each slice's value." }
          }
    , required = [ "data" ]
    , details =
      [ "PieChart is written in Svelte and drawn by LayerChart, a Svelte charting library, as SVG. It fills the width it is given at a ratio of 16 to 9, with a legend, and shows each value under the pointer in a tooltip."
      , "Its colours are the palette's: each slice takes --chart-1, --chart-2 and so on, the accent first and then the palette's informational, positive, warning, danger and pop colours, round again after six. Its text and rules take the page's text and hairline, through the variables LayerChart reads (--color-primary, --color-surface-content and the --color-surface tokens), which L2 sets from the palette."
      , "It is drawn on the server, so it is seen before any JavaScript runs; JavaScript sizes it to its frame and adds the tooltip, so hydrate it with client:load."
      ]
    , usage = [ "<PieChart client:load data={share} key=\"browser\" value=\"users\" />" ]
    }
