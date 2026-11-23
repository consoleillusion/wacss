-- Shared building blocks for every component schema.dhall.
-- A schema starts with:  let P = ../prelude.dhall in { ... }

let string = { type = "string" }

let boolean = { type = "boolean" }

let number = { type = "number" }

let integer = { type = "integer" }

let object = { type = "object", additionalProperties = True }

let stringWith = \(default : Text) -> { type = "string", default }

let booleanWith = \(default : Bool) -> { type = "boolean", default }

let numberWith = \(default : Double) -> { type = "number", default }

let integerWith = \(default : Natural) -> { type = "integer", default }

let choice =
      \(enum : List Text) ->
      \(default : Text) ->
        { type = "string", enum, default }

let described = \(description : Text) -> { type = "string", description }

let child =
      { type = "object"
      , description = "Another component, given as data: its title and the data it receives."
      , properties = { component = string, data = object }
      , required = [ "component" ]
      }

let commonAttributes =
      { id = described "Passed to the root element."
      , class = described "Added to the root element, for layout helpers."
      }

let fieldAttributes =
      commonAttributes // { id = described "Passed to the control, which the label names." }

let chartArguments =
      { data =
        { type = "array"
        , description = "The rows of data, each an object."
        , items = { type = "object" }
        }
      , label = described "The text that names the chart to assistive technology."
      }

let chartStructure =
      { display = "block"
      , position = "relative"
      , `inline-size` = "100%"
      , `aspect-ratio` = "16 / 9"
      }

let controlStateEffects =
      { hover = "The background moves toward the interaction colour."
      , focus = "An accent ring appears."
      , disabled = "Half opacity; the pointer shows that it is not allowed."
      }

let controlProperties =
      [ "background"
      , "color"
      , "border-color"
      , "border-width"
      , "border-radius"
      , "padding-block"
      , "padding-inline"
      , "font-size"
      , "outline-color"
      , "outline-width"
      , "outline-offset"
      , "box-shadow"
      , "opacity"
      , "transition-duration"
      , "transition-timing-function"
      ]

let controlStructure =
      { static =
        { font = "inherit"
        , `border-style` = "solid"
        , `outline-style` = "solid"
        , `transition-property` = "background, outline-color, box-shadow, opacity"
        }
      , disabled.cursor = "not-allowed"
      }

let fieldArguments =
      { label = described "Text naming the field."
      , help = described "A sentence of guidance shown below the field."
      , name = described "The form field's name."
      , value = described "The field's value."
      , required =
              booleanWith False
          //  { description = "Marks the field as one that must be filled in." }
      , disabled =
          booleanWith False // { description = "Prevents input and shows the disabled state." }
      }

in  { string
    , boolean
    , number
    , integer
    , object
    , stringWith
    , booleanWith
    , numberWith
    , integerWith
    , choice
    , described
    , child
    , commonAttributes
    , fieldAttributes
    , controlStateEffects
    , chartArguments
    , chartStructure
    , controlProperties
    , controlStructure
    , fieldArguments
    }
