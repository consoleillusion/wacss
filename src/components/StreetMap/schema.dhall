let P = ../prelude.dhall

let marker =
      { type = "object"
      , properties =
        { lat = P.number // { description = "The marker's latitude, in degrees north." }
        , long = P.number // { description = "The marker's longitude, in degrees east." }
        , label = P.described "The marker's name, shown beside it under the pointer."
        }
      , required = [ "lat", "long" ]
      }

in  { title = "StreetMap"
    , type = "object"
    , description = "A map of streets and places from OpenStreetMap, centred where it is told, that can be dragged and zoomed, with markers."
    , categories = [ "Display" ]
    , variants.secondary = "surface"
    , states = [ "static", "focus" ]
    , themeableProperties =
      [ "background"
      , "border-color"
      , "border-width"
      , "border-radius"
      , "accent-color"
      , "outline-color"
      , "outline-width"
      , "outline-offset"
      , "transition-duration"
      , "transition-timing-function"
      ]
    , structuralProperties.static =
      { display = "block"
      , position = "relative"
      , `inline-size` = "100%"
      , `aspect-ratio` = "16 / 9"
      , overflow = "hidden"
      , `border-style` = "solid"
      , `outline-style` = "solid"
      , `transition-property` = "outline-color"
      }
    , arguments =
          P.commonAttributes
      //  { lat = P.numberWith 51.5074 // { description = "The latitude of the centre, in degrees north." }
          , long = P.numberWith -0.1278 // { description = "The longitude of the centre, in degrees east." }
          , zoom =
              P.integerWith 13 // { description = "How far in it is, from 0, the whole world, to 19, single buildings." }
          , markers =
            { type = "array"
            , description = "Places marked on the map, in order."
            , items = marker
            }
          , label =
              P.stringWith "A map" // { description = "The text that names the map to assistive technology." }
          }
    , details =
      [ "StreetMap is written in Svelte and draws its map with Leaflet, from the tiles OpenStreetMap serves, credited in its corner as OpenStreetMap asks. It can be dragged, zoomed with its buttons, a double click or the keyboard, and turned to with Tab."
      , "Each marker is a dot in the map's accent-color, by default the accent; under the pointer it shows its label. The map is drawn when its script runs; until then, and without JavaScript, the element holds a link to the same place on openstreetmap.org."
      , "The tiles are images from tile.openstreetmap.org, so the map needs the network, and a page that limits where images come from must allow that host. Where a tile cannot load, the map says so in its corner, with a link to the same place on openstreetmap.org, instead of showing an empty grey frame."
      ]
    , stateEffects.focus = "An accent ring appears."
    , usage =
      [ ''
        <StreetMap client:load lat={-41.2865} long={174.7762} zoom={13}
          markers={[{ lat: -41.2847, long: 174.7764, label: "Parliament" }]} />''
      ]
    }
