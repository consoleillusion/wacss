let P = ../prelude.dhall

in  { title = "ModeToggle"
    , type = "object"
    , description = "A button that switches the page between light and dark mode and remembers the choice. It says which mode is on."
    , categories = [ "Action" ]
    , variants.secondary = "clear"
    , states = [ "static" ]
    , themeableProperties = [ "gap" ]
    , values.gap = "var(--space)"
    , structuralProperties.static =
      { display = "inline-flex", `align-items` = "center" }
    , arguments =
          P.commonAttributes
      //  { storageKey = P.stringWith "wacss:mode" // { description = "Where in the browser's storage the choice is kept." }
          , light = P.stringWith "Light mode on" // { description = "Its text while light mode is on." }
          , dark = P.stringWith "Dark mode on" // { description = "Its text while dark mode is on." }
          }
    , details =
      [ "It is a tertiary Button that sets data-mode on the html element to light or dark and keeps the choice in the browser's storage. Until a choice is made, the mode follows the system's. It follows the mode if anything else changes it, so two toggles on one page agree. It shows a sun when light mode is on and a moon when dark mode is on, with the text beside it."
      , "So that a page opens in the remembered mode, without first showing the other, the page restores the choice before it is drawn, with a short script at the top of its head: try { const m = localStorage.getItem(\"wacss:mode\"); if (m) document.documentElement.dataset.mode = m } catch {}"
      ]
    , related = [ "Button", "NavBar" ]
    , usage =
      [ ''
        <ModeToggle client:load />''
      ]
    }
