= The demo site
<demo>
The demo site shows every component in every variant and state, and draws
the token hierarchy so that it can be inspected and edited. It is not part
of the library; `bun run dev` serves it. It is built the way wacss expects
any site to be built: as data.

== The site as data
<demo:data>
The whole site is one object in `src/site.ts`. It has a title, a
description, the paths shown in the navigation bar, and a set of pages,
keyed by path. Each page has a title, a description and an ordered list
of children; each child names a demo component and the data it receives.
A single Astro route renders every page from this object, and the root
path redirects to `/component`.

```ts
{ title: "wacss"
, nav: [ "/component", "/design" ]
, pages:
  { "/component":        { title: "Component",  children: [ { component: "ComponentGrid", data: { titles: [ … ] } } ] }
  , "/component/button": { title: "Button",     children: [ { component: "Showcase", data: { title: "Button" } }, { component: "ComponentApi", data: { title: "Button" } } ] }
  , "/design":           { title: "Design",     children: [ { component: "Design", data: { initial: "Button" } } ] }
  }
}
```

One page is made for each component, at `/component/` and the
component's name: `/component/accordion`, `/component/button`,
`/component/card`, `/component/select`.

== Pages
<demo:pages>
Each kind of page has its own chapter: the
#link(<page-component>)[component grid] at `/component`, a
#link(<page-component-single>)[component's own page] at
`/component/<name>`, and #link(<page-design>)[Design] at `/design`. The
navigation bar links to the grid, labelled "Component" after its path,
and to Design, and marks the grid's link as current on a component's own
page too.

== Every page
<demo:chrome>
Each page shares a navigation bar, a palette selector (a Select) and a light/dark
toggle in the top-right corner. The toggle shows the mode in effect, ☀ for
light and ☾ for dark. Both choices are remembered between visits, and a
short script in the document head restores them before the first paint,
so the page never appears in the wrong palette or mode first.
