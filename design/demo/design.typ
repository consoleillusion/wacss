= The Design page
<page-design>
`/design` shows one component's token hierarchy and lets any token be
edited live. Its data in `src/site.ts` is a title, a description and one
`Design` child, with the component it opens on.

== Layout and editing
<page-design:graph>
A Select chooses the component, from every component in the library. The page shows that
component in every variant, side by side on one line, each under a small
label naming the variant and without a card, above a graph of every token the component
depends on, laid out by inheritance from top to bottom. Each token sits
one layer below the deepest token it references, so primitives form the
top layer and state tokens the bottom; a long layer wraps onto further
rows, and each layer is ordered to keep lines short. Each token shows its
level, name and value. Each reference is drawn as a line from the
referenced token down to the token that refers to it, so the hierarchy
can be followed at any zoom. The graph is drawn in the colors of the palette and mode in effect:
its background is the base and its tokens are surfaces. Selecting a
token opens an editor and highlights its relations: every token it
affects, and the lines between them, in the accent; every token it is
affected by, and the lines between them, in the pop; and every token
related to it indirectly, and the lines between them, in the muted text
color. A token is related indirectly when it shares a dependent with the
selected token (an ancestor of one of its descendants, such as
`--space-step` when `--space-base` is selected) or shares an ancestor
with it (a descendant of one of its ancestors). Everything else fades. An edit is applied
to the `html` element immediately, so the component above changes as it
is typed. The component's tokens, or every token, can be copied with any
edits as a `:root` block, and all edits can be reset.

