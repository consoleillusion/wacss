let P = ../prelude.dhall

in  { title = "Testimonial"
    , type = "object"
    , description = "What one client said: their words, a rating, their name and where they are. Three or four of them side by side read as social proof for a service."
    , categories = [ "Display" ]
    , variants =
      { secondary = "surface"
      , primary = "base"
      }
    , states = [ "static" ]
    , themeableProperties =
      [ "background"
      , "color"
      , "border-color"
      , "border-width"
      , "border-radius"
      , "padding"
      , "gap"
      , "box-shadow"
      ]
    , structuralProperties.static =
      { display = "block"
      , `border-style` = "solid"
      }
    , parts.quote =
      { selector = "blockquote"
      , themeableProperties = [ "color", "font-size", "font-weight", "line-height" ]
      }
    , parts.rating =
      { selector = "[data-testimonial-rating]"
      , themeableProperties = [ "color", "font-size" ]
      }
    , parts.name =
      { selector = "cite"
      , themeableProperties = [ "color", "font-size", "font-weight" ]
      }
    , parts.location =
      { selector = "small"
      , themeableProperties = [ "color", "font-size" ]
      }
    , arguments =
          P.commonAttributes
      //  { quote = P.described "The client's words, including their quotation marks."
          , rating =
                  P.integerWith 5
              //  { description = "The number of stars, from none to five."
                 }
          , name = P.described "The client's name."
          , location = P.described "Where the client is, such as a suburb or city."
          }
    , required = [ "quote" ]
    , details =
      [ "The rating is drawn with star characters, not an image: it scales with its text and is announced as a number out of five. The quote is a blockquote and the name a citation, so the markup says what each part is."
      ]
    , related = [ "Card", "Icon", "Notice" ]
    , usage =
      [ ''
        <Testimonial quote="Christina's treatments are absolutely divine."
          rating={5} name="Sarah M." location="Auckland CBD" />''
      ]
    }
