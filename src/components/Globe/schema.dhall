let P = ../prelude.dhall

in  { title = "Globe"
    , type = "object"
    , description = "A globe of the world that can be grabbed and spun. Pale at rest; under the pointer its sea and land take their colors and it turns slowly."
    , categories = [ "Display" ]
    , element = [ "svg[data-globe]" ]
    , variants.secondary = "map"
    , states = [ "static", "hover", "focus", "active" ]
    , themeableProperties =
      [ "color"
      , "fill"
      , "outline-color"
      , "outline-width"
      , "outline-offset"
      , "filter"
      , "animation-duration"
      , "animation-play-state"
      , "transition-duration"
      , "transition-timing-function"
      ]
    , structuralProperties =
      { static =
        { display = "block"
        , `inline-size` = "100%"
        , `aspect-ratio` = "1"
        , `border-radius` = "50%"
        , `outline-style` = "solid"
        , cursor = "grab"
        , `touch-action` = "none"
        , `user-select` = "none"
        , `transition-property` = "color, fill, outline-color, filter"
        }
      , active.cursor = "grabbing"
      }
    , stateValues.hover.filter = "drop-shadow(0 0 var(--atmosphere-size) var(--atmosphere))"
    , arguments =
          P.commonAttributes
      //  { label =
              P.stringWith "A globe of the world" // { description = "The text that names the globe to assistive technology." }
          , longitude =
              P.numberWith 20.0 // { description = "The longitude facing the viewer at first, in degrees east." }
          , latitude =
              P.numberWith 0.0 // { description = "The latitude facing the viewer at first, in degrees north." }
          , tilt =
              P.numberWith 23.44 // { description = "How far its axis leans to the right of upright, in degrees; the Earth's leans 23.44 degrees." }
          }
    , details =
      [ "Globe is an svg element drawn in an orthographic projection, the view of a sphere from far away, with the land of the world at a scale of 1:110 million from the Natural Earth data in world-atlas. It is drawn on the server, so it is seen, and takes its colors under the pointer, before any JavaScript runs; JavaScript turns it and lays its texture over it."
      , "Its sea is drawn in its color and its land in its fill, which the shapes inside inherit. Over them lies a texture of the land's relief and the depth of the sea, from NASA's Blue Marble shaded relief and bathymetry: semi-transparent, it lightens the shelves and the high ground and darkens the deep ocean, over the colors of either state. A highlight and a shadow at the rim, drawn above all, give it the light and the curve of a sphere. Its axis leans to the right as the Earth's does, so it turns about a tilted axis."
      , "The texture is src/components/Globe/relief.webp, a greyscale map of the world twice as wide as it is high, written by bun run globe-relief from the Blue Marble image in the npm package @freetiler/nasa-bluemarble. It is drawn on a canvas inside the globe, so the texture turns with the land. It is requested as soon as the component's script loads, before any globe is drawn, and decoded once for every globe on the page; hydrating the globe with client:load rather than client:visible lets it arrive before the globe is seen."
      , "Dragging turns it under the pointer, about its axis and toward or away from the viewer as far as sixty degrees, and it carries on turning briefly when let go. While its animation-play-state is running, which the hover state sets, it turns eastward on its own, a full turn in its animation-duration, by default --duration-turn, a hundred base durations. The turn speeds up and slows down over its transition duration, the base duration, and along its transition timing function, as its colors do. All three are read from its computed style, so they follow its tokens. With focus, the arrow keys turn it."
      ]
    , stateEffects =
      { hover = "The sea and the land take the map role's hover colors, and its animation-play-state becomes running, so it turns. A soft glow of its lit sea, its atmosphere, gathers around it. It draws no hover ring: its coloring, glow and turning are its hover effect."
      , focus = "An accent ring appears."
      , active = "The pointer closes to show that the globe is held."
      }
    , stateNotes =
      [ "When reduced motion is preferred, the globe does not turn on its own or carry on turning; it can still be dragged." ]
    , usage =
      [ ''
        <Globe client:load label="Where we work" longitude={150} latitude={-20} />''
      ]
    }
