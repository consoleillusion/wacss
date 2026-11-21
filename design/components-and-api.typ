= Components, API and demo site
<components-and-api>
== Data-driven components
<components-and-api:data-driven-components>
Components render completely from props. Usage is one line:

```svelte
<Accordion items={…} />
<Tabs tabs={…} />
<Form {jsonschema} action={…} />
<Card component="…" data={…} />
```

Typical props: `items`, `tabs`, `jsonschema`, `media`, `component`,
`data`.

- #strong[Registries over trees:] named components and media resolve
  from library-controlled registries and typed schemas. No ad-hoc
  embedded component trees.
- #strong[Predictable state:] value components are controlled or
  bindable, and may persist via a storage key and default value.
- #strong[Native first:] use native elements and browser behaviour (e.g.
  `<details>`/`<summary>` for accordions). Bits UI supplies accessible
  behaviour where native HTML can\'t. JavaScript is used only where CSS
  and HTML can\'t provide the required accessibility behaviour.
- #strong[Classless where possible:] style native elements, not utility
  or component classes. Use a class only when no semantic HTML element
  exists (for example a card), and then use a simple name such as
  `.card`.
- #strong[Buttons show state, not actions:] a light theme shows a sun
  icon; a dark theme shows a moon. A button that is #emph[on] uses the
  semantic \"on\" colour and its label says it is on.
- #strong[Variants are classes:] a component\'s `variant` prop renders
  as a class on its root element (`secondary` renders none).

== Component list
<components-and-api:component-list>
The component list, and each component\'s element, variants, states,
properties and structure, will be decided separately. Each component\'s
schema is the reference for it. Start with just Accordion, Card, Button,
Checkbox

Notes carried over for when that happens:

- #strong[Accordion:] native `<details>`/`<summary>`, animated with
  `interpolate-size: allow-keywords` and `::details-content`
  (pseudo-element tokens for its transition). No JavaScript.
- #strong[Card:] see Card below.
- #strong[Grid] A light element only for page layout
- #strong[Theme toggle:] shows its current state (sun for light, moon
  for dark), persists the choice and prevents a flash on load.
- #strong[Media components] (image, video, audio) need schemas and
  working links.
- #strong[NodeLinkDiagram] is an interactive graph for examining the
  heirarchy and the values of the tokens. You should be able to click a
  dropdown to filter by component. When you select the component from
  the dropdown this will:
  - Limit the display of the tokens in the heirarchy to the tokens that
    affect that component.
  - Make that component appear on screen
  - Allow you to edit the token values and see the changes to the
    component live.
  - Allow you to copy paste the value of the tokens relevant to that
    component.
  - You should be able to copy the full set of tokens at any time, which
    will include whatever changes you have made by modifying the tokens.
- #strong[Forms] are declarative and generated from JSON Schema.

=== Card
<components-and-api:card>
A data-driven surface for presenting content. Placing a component in a
card needs no per-instance logic.

#table(
  columns: 2,
  [Prop], [Content],
  [Header],
  [The card\'s title.],
  [Text],
  [Body text below the figure. For showcase cards it comes from the
  figure component\'s schema (`schema.description`) and appears nowhere
  else in the card or page.],
  [Figure],
  [Data matching any WACSS component schema, recognised by its `title`
  property. Video, Image and Audio are the common cases. The figure
  renders that component inside the card.],
)

The figure has a portrait aspect ratio and a fixed height. It is full
width, has no padding, and is vertically and horizontally centred. The
figure takes 3/7 of the card height and the body takes 4/7, so the
schema\'s grid rows are `3fr 4fr`. The card is 3 units wide and 4 units
high (`aspect-ratio: 3 / 4`). If the figure or body needs styling beyond
its elements, it becomes a component in its own right.

When the card links to a component page:

- Text stays selectable and shows the text cursor. The pointer cursor is
  reserved for following the link.
- Figure controls still work; for example, pausing a video does not
  follow the link.

On the home page:

- Cards sit in a full-width `.grid`, intrinsically sized so the layout
  reflows on resize or drawer toggle without special logic.
- Each card has a header, a figure containing one component, and that
  component\'s schema description below.

== Card
<components-and-api:card-1>
A data-driven surface for presenting content. Placing a component in a
card needs no per-instance logic.

#strong[Props]

#table(
  columns: 2,
  [Prop], [Content],
  [Header],
  [The card\'s title.],
  [Text],
  [Body text below the figure. For showcase cards it comes from the
  component\'s schema (`schema.description`) and appears nowhere else in
  the card or page.],
  [Figure],
  [Data matching any wacss component schema, recognised by its `title`
  property. Video, Image, and Audio are the common cases. The figure
  renders that component inside the card.],
)

#strong[Geometry]

#table(
  columns: 2,
  [Property], [Value],
  [Card size],
  [3 units wide, 4 units high (`aspect-ratio: 3 / 4`)],
  [Figure height],
  [3/7 of the card height, fixed],
  [Body height],
  [4/7 of the card height],
  [Figure width],
  [Full card width, no padding],
  [Figure aspect],
  [Portrait; content centred vertically and horizontally],
)

#strong[Behaviour when linked to a component page]

- Text stays selectable and shows the text cursor. The pointer cursor is
  reserved for following the link.

- Figure controls still work (for example, pausing a video does not
  follow the link). #strong[Home-page layout]

- Cards sit in a full-width `.grid`, intrinsically sized so it reflows
  on resize or drawer toggle without special logic.

- Each card has a header, a figure containing one component, and its
  schema description below. #strong[Reference SCSS] (see editorial note
  1 about the row split)

```scss
.card {
  width: 30rem;
  display: grid;
  grid-template-rows: 1fr 1fr;
  aspect-ratio: 3 / 4;
  overflow: hidden;
}
 
.card__figure {
  min-height: 0;
  margin: 0;
}
 
.card__figure img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
 
.card__content {
  min-height: 0;
  padding: 1.5rem;
  box-sizing: border-box;
}
.card__figure  { order: 1; }
.card__content { order: 2; }
```

== Full component set (before v1)
<components-and-api:full-component-set-before-v1>
Start with Accordion, Card, Button and Checkbox; add the rest of the
full set in batches before v1.

- Component List:
  `["Accordion", "Alert", "AspectRatio", "Audio", "Avatar", "Button", "Card", "Checkbox", "ColorInput", "ColorPicker", "DataTable", "DatePicker", "Field", "Form", "Image", "Input", "Label", "Meter", "Nav", "NavigationMenu", "NodeLinkDiagram", "Pagination", "PertChart", "Popover", "Progress", "RadioGroup", "Select", "Slider", "Switch", "Table", "Tabs", "Textarea", "Toggle", "Tooltip", "Video", "Webpage", "Grid"]`
