// Sample data for each demo component: the props one instance receives.
export const samples: Record<string, Record<string, unknown>> =
{ Button: { label: "Button" }
, Accordion:
  { items:
    [ { value: "one", title: "What is wacss?", content: "A design system whose CSS is derived from each component's schema." }
    , { value: "two", title: "Where do the styles come from?", content: "From five levels of tokens, the top two generated." }
    ]
  }
, Card:
  { header: "Card"
  , text: "A surface for one piece of content. Its figure renders any wacss component."
  , figure: { title: "Button", label: "Inside a card", variant: "primary" }
  , href: "#card"
  }
};

/** States the page can only show by forcing tokens; the rest are shown with real attributes. */
export const FORCED = ["hover", "focus", "active"];
