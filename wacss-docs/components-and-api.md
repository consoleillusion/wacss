# 12. Components, API and demo site

## 12.1 Data-driven components

Components render completely from props. Usage is one line:

```svelte
<Accordion items={…} />
<Tabs tabs={…} />
<Form {jsonschema} action={…} />
<Card component="…" data={…} />
```

Typical props: `items`, `tabs`, `jsonschema`, `media`, `component`, `data`.

- **Registries over trees:** named components and media resolve from library-controlled registries and typed schemas. No ad-hoc embedded component trees.
- **Predictable state:** value components are controlled or bindable, and may persist via a storage key and default value.
- **Native first:** use native elements and browser behaviour (e.g. `<details>`/`<summary>` for accordions). Bits UI supplies accessible behaviour where native HTML can't. JavaScript is used only where CSS and HTML can't provide the required accessibility behaviour.
- **Variants are classes:** a component's `variant` prop renders as a class on its root element (`secondary` renders none).

## 12.2 Component list

The component list, and each component's element, variants, states, properties and structure, will be decided separately. Each component's schema is the reference for it.

Notes carried over for when that happens:

- **Accordion:** native `<details>`/`<summary>`, animated with `interpolate-size: allow-keywords` and `::details-content` (pseudo-element tokens for its transition). No JavaScript.
- **Card:** a data-driven surface with a header, a figure (any WACSS component, recognised by its schema `title`) and body text. If the figure or body needs styling beyond its elements, it becomes a component in its own right. When the card links to a page:
  - text stays selectable;
  - the pointer cursor is reserved for the link;
  - figure controls stay interactive and don't follow the link.
- **Grid** A light element only for page layout
- **Theme toggle:** shows its current state (sun for light, moon for dark), persists the choice and prevents a flash on load.
- **Media components** (image, video, audio) need schemas and working links.
- **NodeLinkDiagram** is an interactive graph for examining the heirarchy and the values of the tokens. You should be able to click a dropdown to filter by component. When you select the component from the dropdown this will:
    - Limit the display of the tokens in the heirarchy to the tokens that affect that component.
    - Make that component appear on screen
    - Allow you to edit the token values and see the changes to the component live.
    - Allow you to copy paste the value of the tokens relevant to that component.
    - You should be able to copy the full set of tokens at any time, which will include whatever changes you have made by modifying the tokens.
- **Forms** are declarative and generated from JSON Schema.
- Component List: `["Accordion", "Alert", "AspectRatio", "Audio", "Avatar", "Button", "Card", "Checkbox", "ColorInput", "ColorPicker", "DataTable", "DatePicker", "Field", "Form", "Image", "Input", "Label", "Meter", "Nav", "NavigationMenu", "NodeLinkDiagram", "Pagination", "PertChart", "Popover", "Progress", "RadioGroup", "Select", "Slider", "Switch", "Table", "Tabs", "Textarea", "Toggle", "Tooltip", "Video", "Webpage", "Grid"]`



## 12.3 Demo site

### Routes: HTML as Data

It should be possible to represent the demo site, and any site, in JSON. A site object will need to have a pages property

```typescript
{ title: "DemoSite"
, description: "The data for this demo site"
, pages:
    { "/": 
        { title: "home"
        , children:
            [ <This is an array of the components on the page in order, including any writing like article, copywriting, etc>
            ]
        }
    , "/components"
    , "/philosophy"
    , "/tokens"
    , <...fill this in with all the pages of this documentation...>
    }
}
```
 ### Built-in affordances for the Demo site

- A consistent navbar.
- A light/dark toggle in the top-right corner.
- Persisted theme and palette preference.
- Flash prevention when restoring the theme (inline bootstrap script setting `data-theme`/`data-palette` before first paint).

