let P = ../prelude.dhall

in  { title = "Page"
    , type = "object"
    , description = "The webpage: the body of the document, on the palette's base. Its text is made from its background, as every component's is, and every component on the page sits within it."
    , categories = [ "Display" ]
    , element = [ "body" ]
    , variants.secondary = "base"
    , states = [ "static" ]
    , themeableProperties =
      [ "background", "color", "font-family", "font-size", "line-height" ]
    , structuralProperties.static.min-block-size = "100vh"
    , arguments = P.commonAttributes
    , details =
      [ "The page is the outermost component. Text outside any other component, such as headings and paragraphs, is the page's text, the inverse of its background; a component without a text color of its own takes the text of the component it is in."
      ]
    , related = [ "Card", "NavBar" ]
    , usage =
      [ ''
        <html lang="en" data-palette="aizome">
          <head>…</head>
          <Page>…</Page>
        </html>''
      ]
    }
