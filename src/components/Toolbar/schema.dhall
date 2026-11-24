let P = ../prelude.dhall

in  { title = "Toolbar"
    , type = "object"
    , description = "A row of controls that act on the same thing, such as moving between questions. Tab enters and leaves it once; the arrow keys move between its controls."
    , categories = [ "Action", "Navigation" ]
    , variants.secondary = "clear"
    , states = [ "static" ]
    , themeableProperties = [ "gap" ]
    , values.gap = "var(--gap)"
    , structuralProperties.static =
      { display = "flex", `flex-wrap` = "wrap", `align-items` = "center" }
    , arguments =
          P.commonAttributes
      //  { label = P.described "The name of the toolbar, for assistive technology, such as Question navigation." }
    , required = [ "label" ]
    , details =
      [ "Its controls are its children: Buttons, Links, Selects or other controls. It has the toolbar role and keeps one of its controls in the tab order at a time: the left and right arrow keys move between them, Home and End to the first and last, and Tab leaves the toolbar. A control that uses the arrow keys itself, such as a Select or a TextInput, keeps them."
      ]
    , related = [ "Button", "Select" ]
    , usage =
      [ ''
        <Toolbar label="Question navigation">
          <Button variant="tertiary">Previous</Button>
          <Button variant="tertiary">Next</Button>
        </Toolbar>''
      ]
    }
