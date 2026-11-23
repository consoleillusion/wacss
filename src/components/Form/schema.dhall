let P = ../prelude.dhall

in  { title = "Form"
    , type = "object"
    , description = "A form generated from a JSON Schema: one field for each property, using the input component that fits its type, then a submit button."
    , categories = [ "Input" ]
    , element = [ "form" ]
    , variants.secondary = "clear"
    , states = [ "static" ]
    , themeableProperties = [ "max-inline-size" ]
    , structuralProperties.static.display = "grid"
    , arguments =
          P.commonAttributes
      //  { schema =
            { type = "object"
            , description = "A JSON Schema of type object. Each property becomes a field; its title is the label, its description the help, and the schema's required list marks required fields."
            }
          , values = P.object // { description = "Values to fill the fields in with, by property name." }
          , action = P.described "Where the form is sent."
          , method =
                  P.choice [ "post", "get", "dialog" ] "post"
              //  { description = "How the form is sent, or dialog to close the dialog it is in." }
          , enctype =
                  P.choice
                    [ "application/x-www-form-urlencoded", "multipart/form-data", "text/plain" ]
                    "application/x-www-form-urlencoded"
              //  { description = "How the data is encoded when it is sent by post." }
          , name = P.described "The form's name."
          , target = P.described "Where the response is shown."
          , autocomplete =
                  P.choice [ "on", "off" ] "on"
              //  { description = "Whether the browser may fill the fields in." }
          , novalidate =
                  P.booleanWith False
              //  { description = "Skips the browser's checks when the form is sent." }
          , submitLabel = P.stringWith "Submit" // { description = "The text of the submit button." }
          }
    , required = [ "schema" ]
    , details =
      [ "Fields follow the order of the properties, and the submit button is a primary Button. A property's title is its label and its description its help, and the schema's required list marks required fields; values, or a property's default, fill them in. The fields are arranged by the stack layout helper."
      ]
    , sections =
      [ { heading = "Fields"
        , text = [ "Each property becomes the field that fits its type and format, chosen in this order:"
          ]
        , columns = [ "Property", "Field" ]
        , rows =
          [ [ "enum", "Select, with an empty first choice unless the property is required" ]
          , [ "boolean", "Checkbox" ]
          , [ "number, integer", "NumberInput, with minimum and maximum; integers step by 1" ]
          , [ "string with format date, time or date-time", "DateInput of type date, time or datetime-local" ]
          , [ "string with format color", "ColorInput" ]
          , [ "string with format textarea, or maxLength above 200", "TextArea" ]
          , [ "string with format email, uri or password, or writeOnly", "TextInput of type email, url or password" ]
          , [ "any other string", "TextInput, with minLength, maxLength and pattern" ]
          ]
        , notes = [ "Properties of type object or array have no field."
          ]
        }
      ]
    , related =
      [ "Button", "Checkbox", "ColorInput", "DateInput", "NumberInput", "Select", "TextArea", "TextInput" ]
    , usage =
      [ ''
        <Form action="/subscribe" submitLabel="Subscribe" schema={{
          type: "object", required: ["email"],
          properties: {
            email: { type: "string", format: "email", title: "Email" },
            updates: { type: "boolean", title: "Send me updates" },
          },
        }} />''
      ]
    }
