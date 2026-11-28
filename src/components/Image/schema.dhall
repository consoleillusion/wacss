let P = ../prelude.dhall

in  { title = "Image"
    , type = "object"
    , description = "A picture: a native image, sized to the space it is given. It is the component a Card's figure expects when that figure holds a photograph."
    , categories = [ "Display" ]
    , variants =
      { secondary = "surface"
      , primary = "base"
      , tertiary = "clear"
      }
    , states = [ "static" ]
    , themeableProperties =
      [ "background"
      , "border-color"
      , "border-width"
      , "border-radius"
      , "box-shadow"
      , "max-inline-size"
      , "aspect-ratio"
      , "object-fit"
      , "opacity"
      , "filter"
      , "transition-duration"
      , "transition-timing-function"
      ]
    , structuralProperties.static =
      { display = "block"
      , `inline-size` = "100%"
      , `border-style` = "solid"
      , `overflow` = "hidden"
      , `transition-property` = "box-shadow, opacity, filter"
      }
    , arguments =
          P.commonAttributes
      //  { src = P.described "The picture's address."
          , alt = P.described "Alternative text describing the picture; an empty string marks it decorative."
          , width = P.integer // { description = "The picture's intrinsic width, in pixels." }
          , height = P.integer // { description = "The picture's intrinsic height, in pixels." }
          , loading =
                  P.choice [ "lazy", "eager" ] "lazy"
              //  { description = "Whether the browser waits until the picture is near the page." }
          , decoding =
                  P.choice [ "async", "sync", "auto" ] "async"
              //  { description = "How the browser decodes the picture." }
          }
    , required = [ "src", "alt" ]
    , details =
      [ "The image fills its width and keeps its aspect ratio, cropping with object-fit when its frame is a different shape. Those two properties are L2 defaults, so a consumer can change them once for every picture."
      ]
    , related = [ "Card", "Hero" ]
    , usage =
      [ ''
        <Image src="/massage.jpg" alt="A massage treatment in progress" />''
      ]
    }
