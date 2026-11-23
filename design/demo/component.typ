= The component grid
<page-component>
`/component` shows every component at a glance. Its data in `src/site.ts`
is a title, a description, and one `ComponentGrid` child listing the
components' titles.

== The bar on every page
<page-component:bar>
Every demo page opens with a NavBar: the title, wacss, linking to
`/component`; a Link for each page in `site.nav`, the current one marked;
and, at the far end, a Select choosing the palette and a tertiary Button
switching the mode, both given as data. The bar is built only from wacss
components and layout helpers.

== The grid
<page-component:grid>
Above the grid, a row of toggle Badges filters it by category, from each
component's `categories`: an All badge, then one badge for each category,
in alphabetical order. A selected badge takes the accent. Badges can be
selected together.

- At first, All is selected and every component is shown.
- Selecting a category unselects All; the grid then shows the components
  in any selected category.
- Selecting All shows every component again, unselects the categories and
  remembers which were selected. Unselecting All brings them back. With
  nothing remembered, All stays selected.
- Unselecting the last selected category selects All.


The components are laid out with the `.grid` layout helper, in
alphabetical order, each cell at least 22 rem wide. Each component is a
card. The card's figure shows one instance of the component in its
default variant, `secondary`, with the demo's sample data from
`src/demo/samples.ts`. The instance is placed through the card's `figure`
slot rather than as data, so that a reactive component, such as an
Accordion, is still made interactive in the browser. The card's header is
the component's title and its text the component's description. Its
footer is a Button, given as data, labelled "View" and the title, which
links to the component's own page (#link(<page-component-single>)[a
component's page]).

== Fitting instances to the figure
<page-component:fit>
An accordion fills the figure's width, with a little padding at each side.
A Card shown in a card's figure is drawn at 40% of the figure's width and
42% of its size, so that the whole of it fits. A Form is drawn at 80% of
the figure's width and 55% of its size.

Instances are found by title: the `Instance` part of the demo renders the
component whose folder matches the title, with the data given, so a new
component appears in the grid once its title is listed and its sample is
written.
