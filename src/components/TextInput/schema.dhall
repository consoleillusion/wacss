let P = ../prelude.dhall

in  { title = "TextInput"
    , type = "object"
    , description = "Text entered on one line: text, email, url, password, tel or search. A native input with its label."
    , categories = [ "Input" ]
    , element = [ "input:not([type])", "input[type=text]", "input[type=email]", "input[type=url]", "input[type=password]", "input[type=tel]", "input[type=search]" ]
    , variants.secondary = "surface"
    , states = [ "static", "hover", "focus", "disabled" ]
    , themeableProperties = P.controlProperties
    , structuralProperties = P.controlStructure
    , arguments =
          P.fieldAttributes
      //  P.fieldArguments
      //  { type =
                  P.choice [ "text", "email", "url", "password", "tel", "search" ] "text"
              //  { description = "The kind of text, which sets the keyboard and the browser's checks." }
          , placeholder = P.described "Text shown while the field is empty."
          , minlength = P.integer // { description = "The fewest characters accepted." }
          , maxlength = P.integer // { description = "The most characters accepted." }
          , pattern = P.described "A regular expression the value must match."
          }
    , details =
      [ "Its label is above it and any help below, arranged by the stack layout helper."
      ]
    , stateEffects = P.controlStateEffects
    , usage = [ "<TextInput label=\"Email\" type=\"email\" name=\"email\" required />"
      ]
    }
