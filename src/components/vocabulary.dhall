-- The shared vocabulary of every component schema, read by the generator, the book and the demo.
--   variants   — every variant, in order; the default variant, secondary, first
--   roles      — every colour role a variant can have, and how a variant in it looks
--   categories — the kinds of component a schema's categories are chosen from

let filled =
      \(colour : Text) -> "filled with the ${colour}, with text in the base colour"

in  { variants =
      [ "secondary"
      , "primary"
      , "tertiary"
      , "positive"
      , "warning"
      , "danger"
      , "informational"
      ]
    , roles =
      { accent = filled "accent"
      , pop = filled "pop"
      , surface = "the surface, with text in the text colour and a hairline border"
      , base = "the page's background, with text in the text colour and a hairline border"
      , clear = "no fill or border, with text in the text colour"
      , positive = filled "positive colour"
      , warning = filled "warning colour"
      , danger = filled "danger colour"
      , informational = filled "informational colour"
      , map = "a map: a pale sea and land at rest; under the pointer, the palette's tone mixed with blue for the sea and green for the land"
      }
    , categories = [ "Action", "Content", "Input", "Navigation" ]
    }
