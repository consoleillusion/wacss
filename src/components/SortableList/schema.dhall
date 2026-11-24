let P = ../prelude.dhall

in  { title = "SortableList"
    , type = "object"
    , description = "A list to put in order: drag an item to its place, or move it with its up and down buttons or with Alt and the arrow keys."
    , categories = [ "Input" ]
    , variants.secondary = "clear"
    , states = [ "static", "disabled" ]
    , themeableProperties = [ "gap", "opacity" ]
    , structuralProperties =
      { static =
        { display = "grid"
        , `list-style` = "none"
        , margin = "0"
        , padding = "0"
        }
      , disabled.cursor = "not-allowed"
      }
    , parts =
      { item =
        { selector = "li"
        , role = "surface"
        , themeableProperties =
          [ "background", "color", "border-color", "border-width", "border-radius", "padding-block", "padding-inline", "gap", "outline-color", "outline-width", "outline-offset", "transition-duration", "transition-timing-function" ]
        , structuralProperties.static =
          { position = "relative"
          , display = "flex"
          , `align-items` = "center"
          , `transition-property` = "transform"
          , `border-style` = "solid"
          , `outline-style` = "solid"
          , cursor = "grab"
          , `touch-action` = "none"
          , `user-select` = "none"
          }
        }
      , label =
        { selector = "li > span"
        , structuralProperties.static.flex = "1"
        }
      }
    , values =
      { gap = "var(--gap)"
      , item-gap = "var(--gap)"
      , item-transition-duration = "var(--duration-surface)"
      , item-transition-timing-function = "var(--easing)"
      }
    , arguments =
          P.commonAttributes
      //  { items =
            { type = "array"
            , description = "The items, in their present order: { id, label }. Bound, so the order chosen is read back."
            , items =
              { type = "object"
              , properties =
                { id = P.described "What identifies the item; it does not change as it moves."
                , label = P.described "The item's text."
                }
              }
            }
          , label = P.stringWith "Order" // { description = "The name of the list, for assistive technology." }
          , disabled =
              P.booleanWith False // { description = "Fixes the order: nothing can be moved." }
          }
    , required = [ "items" ]
    , details =
      [ "An ordered list whose items, a part named item, are on the surface. An item is dragged with the pointer, mouse, pen or touch: it follows the pointer, and the others glide aside to make room as it passes their middle; let go, it settles into its place. An item moved by its buttons or keys glides to its new place in the same way. Every glide takes the item's transition duration and timing function, its component tokens, by default the surface duration and the easing; with reduced motion they are instant. Each item also has up and down buttons, tertiary Buttons, and, while it has focus, Alt with the up or down arrow moves it. Every move is announced to assistive technology. It needs no library of its own."
      ]
    , stateEffects.disabled = "Half opacity; nothing can be moved."
    , related = [ "Button" ]
    , usage =
      [ ''
        <SortableList label="Put these in order" bind:items={steps} />''
      ]
    }
