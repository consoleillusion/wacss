// The demo site as data: every page is a title and an ordered list of children.
// A child names a demo component (src/demo/<component>.astro) and the data it receives.
export type Child = { component: string; data?: Record<string, unknown> };
export type Page = { title: string; description: string; children: Child[] };

/** The components the site shows, by title. */
const components = ["Accordion", "Badge", "BarChart", "Button", "Card", "Checkbox", "CodeBlock", "ColorInput", "DateInput", "Form", "Globe", "LineChart", "Link", "NavBar", "NumberInput", "Page", "PieChart", "Select", "StreetMap", "Table", "TableCell", "TextArea", "TextInput"];

/** A component's path: /component/ and its name in kebab case. */
export const componentPath = (title: string) =>
  // Purpose: the URL of a component's own page
  `/component/${title.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()}`;

export const site: { title: string; description: string; nav: string[]; pages: Record<string, Page> } =
{ title: "wacss"
, description: "A data-driven component library with one global, token-driven stylesheet."
, nav: [ "/component", "/design" ]
, pages:
  { "/component":
    { title: "Component"
    , description: "Every component, in its default variant. Open one to see all its variants, states and arguments."
    , children: [ { component: "ComponentGrid", data: { titles: components } } ]
    }
  , ...Object.fromEntries(components.map((title) => [componentPath(title),
    { title
    , description: ""
    , children:
      [ { component: "ComponentPage", data: { title } } ]
    }]))
  , "/design":
    { title: "Design"
    , description: "The token hierarchy of a component. Edit any token and see the component change."
    , children: [ { component: "Design", data: { initial: "Button" } } ]
    }
  }
};
