= Accordion
<accordion>
Collapsible sections. Accordion wraps the bits-ui `Accordion`: it renders
one item per entry of `items`, each with a trigger and a body. It is a
class component with two parts. Each item has the class `.accordion`, its
trigger `.accordion-trigger` (the part AccordionTrigger), and its body
`.accordion-content` (the part AccordionContent). Keyboard behaviour and
ARIA attributes come from bits-ui.

== Arguments
<accordion:arguments>
#table(
  columns: 3,
  [Argument], [Type and default], [Meaning],
  [`items`], [array; required], [The sections, in order. Each is `{ value, title, content?, disabled? }`: a unique value, the trigger text, the body text, and whether the item can be opened.],
  [`type`], [`single` · `multiple`; `single`], [Whether one section or several can be open at once.],
  [`value`], [string or array of strings], [The section or sections open at first.],
  [`disabled`], [boolean; `false`], [Disables every item.],
  [`loop`], [boolean; `true`], [Whether arrow keys wrap from the last trigger to the first.],
  [`orientation`], [`vertical` · `horizontal`; `vertical`], [The direction of keyboard navigation.],
  [`id`, `class`], [string], [Passed to the root element.],
)

A body can be richer than text: give a named slot whose name is the
item's `value`, and it is rendered in place of `content`. An item's
value must therefore not be the name of an argument.

== Parts and states
<accordion:states>
#table(
  columns: 3,
  [Component], [States], [Effect],
  [Accordion (`.accordion`)], [static], [A rule beneath each item.],
  [AccordionTrigger], [hover, focus, disabled, open], [Hover tints the row; focus adds the accent ring; disabled fades it; open turns its chevron half a turn.],
  [AccordionContent], [static], [Padding and type for the body; hidden while closed.],
)

The chevron is the trigger's `::after` pseudo-element, drawn with
`clip-path` in the current text colour.

== Themable properties
<accordion:properties>
#table(
  columns: 2,
  [Component], [Properties],
  [Accordion], [`color`, `border-color`, `border-block-end-width`],
  [AccordionTrigger], [`background`, `color`, `border-radius`, `padding-block`, `padding-inline`, `gap`, `font-size`, `font-weight`, `outline-color`, `outline-width`, `outline-offset`, `opacity`, `transition-duration`, `transition-timing-function`; on `::after`: `transform`, `transition-duration`, `transition-timing-function`],
  [AccordionContent], [`color`, `padding-inline`, `padding-block-end`, `font-size`, `line-height`],
)

== Example
<accordion:example>
```astro
<Accordion client:load type="multiple" value="returns" items={[
  { value: "shipping", title: "Shipping", content: "Two to four working days." },
  { value: "returns", title: "Returns", content: "Free within thirty days." },
  { value: "gifts", title: "Gift wrap", disabled: true },
]} />
```
