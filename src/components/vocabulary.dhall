-- The shared vocabulary of every component schema, read by the generator, the book and the demo.
--   variants   — every variant, in order; the default variant, secondary, first
--   derived    — the colour properties a component makes from its own background, and how:
--                {background} stands for the variant's background (its own background token
--                when it has one). Text is the background's lightness inverted; an underline
--                is the text; a border is the background moved 15% of the way to its inverse.
--   roles      — every colour role a variant can have: how a variant in it looks, and the value
--                each colour property takes. A property a role does not give is derived, from
--                the role's `text-on` when it has one (a transparent role reads against the
--                page), else from the background. A property given under a state (hover) is the
--                role's value of it in that state.
--   categories — the kinds of component a schema's categories are chosen from

let filled =
      \(colour : Text) ->
        { look = "filled with the ${colour}; text, underline and border made from the fill"
        , background = "var(--color-${colour})"
        , `accent-color` = "var(--color-${colour})"
        }

let tinted =
      \(colour : Text) ->
        { look = "the ${colour} tint, the ${colour} washed into the base; text, underline and border made from it"
        , background = "var(--color-${colour}-tint)"
        , `accent-color` = "var(--color-${colour})"
        }

let page =
      \(colour : Text) ->
        { look = "the ${colour}; text, underline and border made from it"
        , background = "var(--color-${colour})"
        , `accent-color` = "var(--color-accent)"
        }

in  { variants =
      [ "secondary"
      , "primary"
      , "tertiary"
      , "positive"
      , "warning"
      , "danger"
      , "informational"
      ]
    , derived =
      { color = "oklch(from {background} calc(1 - l) c h)"
      , `text-decoration-color` = "currentColor"
      , `border-color` = "oklch(from {background} calc(l + (1 - 2 * l) * 0.15) c h)"
      }
    , roles =
      { accent = filled "accent"
      , pop = filled "pop"
      , surface = page "surface"
      , base = page "base"
      , clear =
        { look = "no fill or border; text and underline made from the base"
        , background = "transparent"
        , `text-on` = "var(--color-base)"
        , `border-color` = "transparent"
        , `accent-color` = "var(--color-accent)"
        }
      , positive = filled "positive"
      , warning = filled "warning"
      , danger = filled "danger"
      , informational = filled "informational"
      , positive-tint = tinted "positive"
      , warning-tint = tinted "warning"
      , danger-tint = tinted "danger"
      , informational-tint = tinted "informational"
      , map =
        { look = "a map: a pale sea and land at rest; under the pointer, the palette's tone mixed with blue for the sea and green for the land"
        , color = "var(--color-sea)"
        , fill = "var(--color-land)"
        , hover = { color = "var(--color-sea-hover)", fill = "var(--color-land-hover)" }
        }
      }
    , categories = [ "Action", "Content", "Input", "Navigation" ]
    }
