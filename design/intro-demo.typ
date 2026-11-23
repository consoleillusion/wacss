= The demo site
<demo>
The demo site shows every component in every variant and state, and draws
the token hierarchy so that it can be inspected and edited. It is not part
of the library; `bun run dev` serves it. It is built the way wacss expects
any site to be built: as data.

== The site as data
<demo:data>
The whole site is one object in `src/site.ts`. It has a title, a
description and a set of pages, keyed by path. Each page has a title, a
description and an ordered list of children; each child names a component
and the data it receives. A single Astro route renders every page from
this object, and the root path redirects to `/components`.

```ts
{ title: "wacss"
, pages:
  { "/components": { title: "Components", children: [ { component: "Showcase", data: { title: "Button" } }, … ] }
  , "/design":     { title: "Design",     children: [ { component: "Design",   data: { initial: "Button" } } ] }
  }
}
```

== Components page
<demo:components>
Each component has a section containing its description, one instance of
each variant side by side, and an accordion with one item per state of
the component and its parts. Opening an item shows every variant in that
state. Disabled, loading and open are shown with real attributes. A page
cannot make an element hovered, focused or pressed, so for those states
the demo points the element's properties at the state's tokens directly.

== Design page
<demo:design>
A selector chooses Accordion, Button or Card. The page shows that
component in every variant above a graph of its tokens: one column per
level, every token the component and its parts depend on, and one edge
for each reference. Selecting a token highlights everything it depends on
and everything that depends on it, and opens an editor. An edit is applied
to the `html` element immediately, so the component above changes as it
is typed. The component's tokens, or every token, can be copied with any
edits as a `:root` block, and all edits can be reset.

== Every page
<demo:chrome>
Each page shares a navigation bar, a theme selector and a light/dark
toggle in the top-right corner. The toggle shows the mode in effect, ☀ for
light and ☾ for dark. Both choices are remembered between visits, and a
short script in the document head restores them before the first paint,
so the page never appears in the wrong theme first.
