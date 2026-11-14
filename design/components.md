# Components
 
*Folder: `docs/components/`. Depends on Parts 2 and 3.*
 
## Catalogue
 
| Group | Components |
|---|---|
| Blocks | Navbar, Gallery |
| Input | Form (declarative, from a JSON Schema), Checkbox, Input, Number Input, Password Input, Date Picker, Button, Close Button, Icon Button, Switch |
| Display | Avatar, Badge, Card, Image, Data List, Icon, Table, Tag, Accordion, Breadcrumb, Carousel, Tabs, Blockquote, Code Block, Link |
| Media (required, with schemas) | Video, Image, Audio, using links that actually work |
 
## Per-component file template
 
Copy this for each component in the catalogue:
 
```md
 <Component>
# Purpose
# Props            (table: prop, type, content)
# Semantic markup  (which native element; classes only if none exists)
# Tokens           (layer 3-5 names it exposes)
# States           (static, hover, focus, active, selected, open, disabled)
# Accessibility    (keyboard, roles, reduced motion)
# Example          (one-line data-driven usage)
```
 
## Card (`docs/component/card.md`)
 
A data-driven surface for presenting content. Placing a component in a card needs no per-instance logic.
 
**Props**
 
| Prop | Content |
|---|---|
| Header | The card's title. |
| Text | Body text below the figure. For showcase cards it comes from the component's schema (`schema.description`) and appears nowhere else in the card or page. |
| Figure | Data matching any wacss component schema, recognised by its `title` property. Video, Image, and Audio are the common cases. The figure renders that component inside the card. |
 
**Geometry**
 
| Property | Value |
|---|---|
| Card size | 3 units wide, 4 units high (`aspect-ratio: 3 / 4`) |
| Figure height | 3/7 of the card height, fixed |
| Body height | 4/7 of the card height |
| Figure width | Full card width, no padding |
| Figure aspect | Portrait; content centred vertically and horizontally |
 
**Behaviour when linked to a component page**
 
- Text stays selectable and shows the text cursor. The pointer cursor is reserved for following the link.
- Figure controls still work (for example, pausing a video does not follow the link).
**Home-page layout**
 
- Cards sit in a full-width `.grid`, intrinsically sized so it reflows on resize or drawer toggle without special logic.
- Each card has a header, a figure containing one component, and its schema description below.
**Reference SCSS** (see editorial note 1 about the row split)
 
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
 
## 5.4 Accordion (`docs/components/accordion.md`)
 
Pure CSS accordions with smooth CSS animation, built on native `<details>/<summary>`.
 
```scss
details {
  interpolate-size: allow-keywords;
  overflow: clip;
}
 
details summary {
  display: block;
  cursor: pointer;
  position: relative;
}
 
details[open]::details-content {
  height: auto;
}
 
details::details-content {
  height: 0;
  overflow-y: clip;
  transition: content-visibility 475ms allow-discrete, height 475ms;
}
```
