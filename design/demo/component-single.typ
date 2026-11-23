= A component's page
<page-component-single>
`/component/<name>` presents one component exactly as its chapter in the
Components part of this book does, with the component itself, live, in
place of a description of how it looks. Its data in `src/site.ts` is the
component's title as the page title and one `ComponentPage` child, given
the title. The page reads the component's schema, through
`dist/tokens.json`, and the shared vocabulary of variants and colour
roles, so it says what the chapter says, in the same order; neither can
fall behind the schema (#link(<schema:chapters>)[component chapters]).
No card frames the component or any part of the page.

== Order
<page-component-single:order>
The page gives, in turn: the description and details; whether it is an
element or a class component, and what its rules select; its
categories; its variants and states; its arguments, with the notes that
follow them and any further sections; its themable properties, with a
Link to the Design page, where every token can be explored; its examples
of use, each a CodeBlock, highlighted and with a button that copies it; what is planned; and Links to the related components.

== Variants and states
<page-component-single:variants>
Under the heading _Variants and states_, one line shows a state
selector, a Select, then the component live in each of its variants, in
vocabulary order, each under a small label naming the variant. The
tables of variants with their colour roles and looks, and of states with
their effects, follow, as in the chapter.

The selector lists the component's states in schema order and starts at
`static`. A component with no state other than `static` shows the
selector disabled. Choosing a state applies it to the live instances on
the line, and only to those. Choosing `static` undoes it.

#table(
  columns: 2,
  [State], [How the page applies it],
  [disabled], [Sets `aria-disabled="true"`],
  [loading], [Sets `aria-busy="true"`],
  [open], [Sets `aria-expanded="true"`],
  [pressed], [Sets `aria-pressed="true"`],
  [hover, focus, active], [A page cannot make an element hovered, focused or pressed, so the instance's channel properties for the state are pointed at its state tokens directly],
)

Instances are sized to show the component whole: a Card at 18 rem, an
Accordion and a Form at up to 32 and 28 rem, a Globe at 14 rem, a
chart at up to 36 rem, and a NavBar across the full width.
