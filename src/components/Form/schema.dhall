let P = ../prelude.dhall

in  { title = "Form"
    , type = "object"
    , description = "A form generated from a JSON Schema."
    , element = "form"
    , variants = [ "secondary" ]
    , states = [ "static" ]
    , cssProperties = [ "gap", "padding", "color", "font-size" ]
    , structure.static = { display = "grid" }
    , arguments =
          P.commonAttributes
      //  { jsonschema =
            { type = "object"
            , description = "JSON Schema describing the fields."
            , additionalProperties = True
            }
          , value = P.object
          , action = P.string
          , method = P.choice [ "get", "post" ] "post"
          , submitLabel = P.stringWith "Submit"
          }
    }
