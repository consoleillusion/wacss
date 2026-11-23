= Card
<card>
A surface for one piece of content. Card is structure only, written in
Astro. It is a class component, `.card`, in a portrait 3∶4 shape divided
into two rows in the ratio 3∶4. The upper row is the figure, the part
CardFigure (`.card-figure`). It spans the full width with no padding and
renders any wacss component. The lower row is the body, the part CardBody
(`.card-body`), with a header, text and a footer.

== Arguments
<card:arguments>
#table(
  columns: 3,
  [Argument], [Type and default], [Meaning],
  [`variant`], [`secondary` · `primary`; `secondary`], [Secondary is a surface; primary is filled with the pop and carries text in the base colour.],
  [`as`], [`article` · `section` · `div`; `article`], [The root element.],
  [`header`], [string], [A heading at the top of the body.],
  [`text`], [string], [Body text.],
  [`figure`], [object], [Data for any wacss component. Its `title` names the component; every other member is passed to it as an argument.],
  [`footer`], [string], [Text at the foot of the body.],
  [`href`], [string], [Adds a secondary button to the footer that links here.],
  [`ctaLabel`], [string; `Open component`], [The label of that button.],
  [`id`, `class`], [string], [Passed to the root element.],
)

The default slot adds content to the body after the text; the slot
`figure` adds content to the figure.

== States
<card:states>
#table(
  columns: 2,
  [State], [Effect],
  [hover], [The background moves toward the interaction colour and the card rises on a soft shadow.],
)

== Themable properties
<card:properties>
#table(
  columns: 2,
  [Component], [Properties],
  [Card], [`background`, `color`, `border-color`, `border-width`, `border-radius`, `box-shadow`, `font-size`, `line-height`, `transition-duration`, `transition-timing-function`],
  [CardFigure], [`background`],
  [CardBody], [`padding`, `gap`],
)

== Example
<card:example>
```astro
<Card
  header="Button"
  text="An action, in four variants."
  figure={{ title: "Button", variant: "primary", label: "Save" }}
  href="/components/button"
/>
```

#emph[Planned:] a figure is rendered on the server, so an interactive
component inside it, such as an Accordion, is static. Hydrating the
figure is planned.
