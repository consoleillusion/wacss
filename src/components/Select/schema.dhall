let P = ../prelude.dhall

let option =
      { type = "object"
      , properties = { value = P.string, label = P.string }
      , required = [ "value" ]
      }

in  { title = "Select"
    , type = "object"
    , description = "A choice of one value from a list. A native select with a label, driven by data."
    , categories = [ "Input" ]
    , element = [ "select" ]
    , variants.secondary = "surface"
    , states = [ "static", "hover", "focus", "disabled" ]
    , themeableProperties =
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
      , "opacity"
      , "transition-duration"
      , "transition-timing-function"
      ]
    , structuralProperties =
      { static =
        { font = "inherit"
        , `border-style` = "solid"
        , `outline-style` = "solid"
        , cursor = "pointer"
        , `transition-property` = "background, outline-color, box-shadow, opacity"
        }
      , disabled.cursor = "not-allowed"
      }
    , arguments =
          P.fieldAttributes
      //  { class = P.described "Added to the label around the select, for layout helpers."
          , label = P.described "Text shown before the select, naming the choice."
          , options =
            { type = "array"
            , description = "The choices, in order. Each is a value, or { value, label } when the visible text differs from the value."
            , items = { type = [ "string", "object" ] }
            }
          , value = P.described "The chosen value. In Svelte it can be bound, with bind:value."
          , onchange =
            { type = "function"
            , description = "Called with the new value when the choice changes."
            }
          , name = P.described "The form field's name."
          , disabled =
              P.booleanWith False // { description = "Prevents a choice and shows the disabled state." }
          }
    , required = [ "options" ]
    , details =
      [ "The label and the select are arranged side by side by the cluster layout helper."
      ]
    , argumentNotes = [ "Any other attribute is passed through to the select."
      ]
    , stateEffects = P.controlStateEffects
    , usage =
      [ ''
        <Select label="Palette" options={["kinari", "matcha", "aizome", "shu"]} value="kinari" />
        <Select label="Size" options={[{ value: "s", label: "Small" }, { value: "m", label: "Medium" }]} />''
      ]
    }
