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
  [Data matching any wacss component schema, recognised by its `title`
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
