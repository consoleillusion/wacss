let P = ../prelude.dhall

in  { title = "Pagination"
    , type = "object"
    , description = "Links between the pages of a long list: the previous page, where the reader is, and the next page."
    , categories = [ "Navigation" ]
    , variants.secondary = "clear"
    , states = [ "static" ]
    , themeableProperties = [ "gap", "font-size" ]
    , structuralProperties.static =
      { display = "flex"
      , `flex-wrap` = "wrap"
      , `align-items` = "baseline"
      , `justify-content` = "space-between"
      }
    , arguments =
          P.commonAttributes
      //  { page = P.integerWith 1 // { description = "The page shown, counted from 1." }
          , pages = P.integerWith 1 // { description = "How many pages there are." }
          , href = P.described "The address of a page, with {page} where its number goes, such as /quiz?page={page}."
          , label = P.stringWith "Pages" // { description = "The name of the navigation, for assistive technology." }
          , previous = P.stringWith "Previous" // { description = "The text of the link to the previous page." }
          , next = P.stringWith "Next" // { description = "The text of the link to the next page." }
          }
    , required = [ "page", "pages", "href" ]
    , details =
      [ "It is a nav landmark holding a link to the previous page, marked rel=prev, the page shown out of how many, and a link to the next, marked rel=next. The links are Links. On the first and last page, the link that would leave the list is plain text, marked aria-disabled. It needs no JavaScript: every page is an address."
      ]
    , related = [ "Link", "Table" ]
    , usage =
      [ ''
        <Pagination page={2} pages={7} href="/quiz?page={page}" />''
      ]
    }
