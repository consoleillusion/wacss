// The demo site as data: every page is a title and an ordered list of children.
// A child names a demo component (src/demo/<component>.astro) and the data it receives.
export type Child = { component: string; data?: Record<string, unknown> };
export type Page = { title: string; description: string; children: Child[] };

export const site: { title: string; description: string; pages: Record<string, Page> } =
{ title: "wacss"
, description: "A data-driven component library with one global, token-driven stylesheet."
, pages:
  { "/components":
    { title: "Components"
    , description: "Every component, in every variant, with every state."
    , children:
      [ { component: "Showcase", data: { title: "Accordion" } }
      , { component: "Showcase", data: { title: "Button" } }
      , { component: "Showcase", data: { title: "Card" } }
      ]
    }
  , "/design":
    { title: "Design"
    , description: "The token hierarchy of a component. Edit any token and see the component change."
    , children: [ { component: "Design", data: { initial: "Button" } } ]
    }
  }
};
