let P = ../prelude.dhall

in  { title = "Grid"
    , type = "object"
    , description =
        "A page-layout element: an auto-fitting grid of equal cells. It lays out a page and is not themed."
    , variants = [ "secondary" ]
    , states = [ "static" ]
    , cssProperties = [] : List Text
    , structure.static = { display = "grid" }
    , arguments =
          P.commonAttributes
      //  { min =
            { type = "string"
            , description = "Minimum cell width, set as --grid-min."
            , default = "15rem"
            }
          }
    }
