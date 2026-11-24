let P = ../prelude.dhall

in  { title = "LineChart"
    , type = "object"
    , description = "A line chart: one line for each series, across the x values of the data."
    , categories = [ "Display" ]
    , variants.secondary = "clear"
    , states = [ "static" ]
    , themeableProperties = [ "color", "font-size" ]
    , structuralProperties.static = P.chartStructure
    , arguments =
          P.commonAttributes
      //  P.chartArguments
      //  { label = P.stringWith "A line chart" // { description = "The text that names the chart to assistive technology." }
          , x = P.stringWith "x" // { description = "The key of the value along the horizontal axis." }
          , y =
            { type = [ "string", "array" ]
            , default = "y"
            , description = "The key of the value along the vertical axis, or a list of keys, one line each."
            }
          }
    , required = [ "data" ]
    , details =
      [ "LineChart is written in Svelte and drawn by LayerChart, a Svelte charting library, as SVG. It fills the width it is given at a ratio of 16 to 9, with axes, a grid, and a legend when there is more than one series, and shows each value under the pointer in a tooltip."
      , "Its colors are the palette's: each series takes --chart-1, --chart-2 and so on, the accent first and then the palette's informational, positive, warning, danger and pop colors, round again after six. Its text and rules take the page's text and hairline, through the variables LayerChart reads (--color-primary, --color-surface-content and the --color-surface tokens), which L2 sets from the palette."
      , "It is drawn on the server, so it is seen before any JavaScript runs; JavaScript sizes it to its frame and adds the tooltip, so hydrate it with client:load."
      ]
    , usage = [ "<LineChart client:load data={visits} x=\"month\" y={[\"web\", \"mobile\"]} />" ]
    }
