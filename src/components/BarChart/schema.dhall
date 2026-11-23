let P = ../prelude.dhall

in  { title = "BarChart"
    , type = "object"
    , description = "A bar chart: one bar for each row, or a group of bars, one for each series."
    , categories = [ "Content" ]
    , variants.secondary = "clear"
    , states = [ "static" ]
    , themeableProperties = [ "color", "font-size" ]
    , structuralProperties.static = P.chartStructure
    , arguments =
          P.commonAttributes
      //  P.chartArguments
      //  { label = P.stringWith "A bar chart" // { description = "The text that names the chart to assistive technology." }
          , x = P.stringWith "x" // { description = "The key of the category along the horizontal axis." }
          , y =
            { type = [ "string", "array" ]
            , default = "y"
            , description = "The key of the bar's value, or a list of keys, one bar each, grouped."
            }
          }
    , required = [ "data" ]
    , details =
      [ "BarChart is written in Svelte and drawn by LayerChart, a Svelte charting library, as SVG. It fills the width it is given at a ratio of 16 to 9, with axes, a grid, and a legend when there is more than one series, and shows each value under the pointer in a tooltip."
      , "Its colours are the palette's: each series takes --chart-1, --chart-2 and so on, the accent first and then the palette's informational, positive, warning, danger and pop colours, round again after six. Its text and rules take the page's text and hairline, through the variables LayerChart reads (--color-primary, --color-surface-content and the --color-surface tokens), which L2 sets from the palette."
      , "It is drawn on the server, so it is seen before any JavaScript runs; JavaScript sizes it to its frame and adds the tooltip, so hydrate it with client:load."
      ]
    , usage = [ "<BarChart client:load data={sales} x=\"quarter\" y={[\"north\", \"south\"]} />" ]
    }
