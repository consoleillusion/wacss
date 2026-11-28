-- The shared vocabulary of every component schema, read by the generator, the book and the demo.
--   variants   — every variant, in order, with what it is for; the first, secondary, is the
--                default
--   states     — every state, in the order its rules are written (a later state wins), with
--                its selector, placed inside :where(…), whether it is a pointer state, which
--                applies only to the interactive elements, and what it means
--   interactive — the elements a person can act on
--   colorProperties — the CSS properties whose values come from a variant's color role
--   derived    — the color properties a component makes from its own background, and how:
--                {background} stands for the variant's background (its own background token
--                when it has one). Text is the background's lightness inverted; an underline
--                is the text; a border is the background moved 15% of the way to its inverse.
--   roles      — every color role a variant can have: how a variant in it looks, and the value
--                each color property takes. A property a role does not give is derived, from
--                the role's `text-on` when it has one (a transparent role reads against the
--                page), else from the background. A property given under a state (hover) is the
--                role's value of it in that state.
--   categories — the kinds of component a schema's categories are chosen from, each with what
--                makes a component one of them

let filled =
      \(color : Text) ->
        { look = "filled with the ${color}; text, underline and border made from the fill"
        , background = "var(--color-${color})"
        , `accent-color` = "var(--color-${color})"
        }

let tinted =
      \(color : Text) ->
        { look = "the ${color} tint, the ${color} washed into the base; text, underline and border made from it"
        , background = "var(--color-${color}-tint)"
        , `accent-color` = "var(--color-${color})"
        }

let page =
      \(color : Text) ->
        { look = "the ${color}; text, underline and border made from it"
        , background = "var(--color-${color})"
        , `accent-color` = "var(--color-accent)"
        }

in  { variants =
      [ { name = "secondary", meaning = "The ordinary appearance. The default; every component has it." }
      , { name = "primary", meaning = "The main action or emphasis in a region." }
      , { name = "tertiary", meaning = "The least emphasis; reads like text." }
      , { name = "positive", meaning = "Success or confirmation." }
      , { name = "warning", meaning = "Caution; a risk that can be undone." }
      , { name = "danger", meaning = "Destructive or failed." }
      , { name = "informational", meaning = "A neutral notice." }
      ]
    , states =
      [ { name = "static", selector = "", pointer = False, meaning = "No particular condition; the default." }
      , { name = "hover", selector = ":hover", pointer = True, meaning = "The pointer is over it." }
      , { name = "focus", selector = ":focus-visible", pointer = False, meaning = "It has keyboard focus." }
      , { name = "active", selector = ":active", pointer = True, meaning = "It is being pressed." }
      , { name = "open", selector = "[aria-expanded=\"true\"], [data-state=\"open\"]", pointer = False, meaning = "What it discloses is shown." }
      , { name = "current", selector = "[aria-current=\"page\"], [aria-current=\"true\"]", pointer = False, meaning = "It stands for the page or item the reader is on." }
      , { name = "pressed", selector = "[aria-pressed=\"true\"]", pointer = False, meaning = "A toggle that is on." }
      , { name = "disabled", selector = ":disabled, [aria-disabled=\"true\"], [data-disabled]", pointer = False, meaning = "It cannot be used." }
      , { name = "loading", selector = "[aria-busy=\"true\"]", pointer = False, meaning = "It is waiting for work to finish." }
      ]
    , interactive = "a[href], button, input, select, textarea, summary, [tabindex]"
    , colorProperties =
      [ "background"
      , "background-color"
      , "accent-color"
      , "fill"
      , "color"
      , "caret-color"
      , "stroke"
      , "border-color"
      , "text-decoration-color"
      , "column-rule-color"
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
      , inverse =
        { look = "dark, with text made light so it reads over a photograph or an overlay"
        , background = "var(--color-black)"
        , color = "var(--color-white)"
        }
      }
    , categories =
      [ { name = "Action"
        , description = "Does something when it is used: runs a command, or changes what the page shows."
        }
      , { name = "Display"
        , description = "A pattern for displaying or arranging information, such as a card, a table or a badge. It shows information; it does not change it."
        }
      , { name = "Input"
        , description = "Lets a person enter information or configure it: choose, type, set, order or filter. A control that configures what is shown, such as a chip, is an input, not a display."
        }
      , { name = "Navigation"
        , description = "Takes a person to another place: another page, or another part of the same one."
        }
      ]
    }
