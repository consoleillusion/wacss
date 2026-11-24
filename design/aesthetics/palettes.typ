#import "../style.typ": serif, mono, cjk, label-text, page-footer
#import "../data.typ": resolved, token

// This chapter is written from the color configuration, src/styles/palettes.dhall, read through
// the Dhall plugin, and from the template by which a component's text is made from its
// background, in src/components/vocabulary.dhall.
#let dhall-plugin = plugin("/design/dhall.wasm")
#let load-dhall(path) = json(dhall-plugin.decode(read(path, encoding: none), bytes(json.encode((:)))))
#let config = load-dhall("/src/styles/palettes.dhall")
#let derived = json("/dist/tokens.json").vocabulary.derived
#let palette-list = config.palettes
#let decor = config.decor
#let intent = config.intent
#let title-case(name) = upper(name.first()) + name.slice(1)
#let listed(items) = if items.len() == 1 { items.first() } else { items.slice(0, -1).join(", ") + " and " + items.last() }
#let names = palette-list.map(p => title-case(p.name))
#let num(x) = str(calc.round(x, digits: 4))

= Palettes
<palettes>
wacss ships #palette-list.len() palettes: #listed(names). They are set,
with everything every palette shares, in `src/styles/palettes.dhall`, the
top of the color hierarchy; this chapter is written from that file. It
sets out what a palette consists of and the rules every palette follows,
so that new palettes can be made to the same standard. The pages after it
show each palette's modes.

== Anatomy of a palette
<palettes:anatomy>
A palette is every color of the semantic level: the colors a page is
made of. It is named after its accent, whose hue is the prima from which
its colors are made; Kinari is both a palette and its accent. It has a
light mode and a dark mode, and each mode has
#(decor.len() + intent.colors.len()) colors in two groups:

- the #emph[decor colors], #listed(decor.map(c => c.name)), made from the
  palette's hue;
- the #emph[intent colors], #listed(intent.colors.map(c => c.name)),
  which report the intent of what they mark. Each has a hue of its own, the
  same in every palette.

They are called intent colors, not semantic colors, because "semantic"
names the token level L2 (#link(<foundations:semantic>)[foundations]).

#table(
  columns: 2,
  [Color], [Use],
  ..decor.map(c => (strong(title-case(c.name)), c.use)).flatten(),
  ..intent.colors.map(c => (strong(title-case(c.name)), c.use)).flatten(),
)

== Where a palette's colors come from
<palettes:source>
A palette is named after one thing, and its hue is the hue of the color
a person would name that thing by. Every color on its page carries that
hue: the accent at full strength, the pop turned a little further round
the wheel, and the base and surface as a trace. A palette reads as a
single idea because each color on its page has the same origin.

== Character
<palettes:character>
Every palette is elegant and restrained, in keeping with the palette of
this book. Its colors are chosen for their tone and their relationships
rather than for intensity, so saturation is spent only where it guides
the eye.

== How the colors are made
<palettes:derived>
Each decor color is the palette's hue, turned by the color's turn, at
a lightness and chroma set for each mode. The values are the same in
every palette, so the palettes differ only in hue, and each is equally
legible and equally strong:

#table(
  columns: 6,
  [Color], [Turn], [Light lightness], [Light chroma], [Dark lightness], [Dark chroma],
  ..decor.map(c => (title-case(c.name), str(c.turn) + "°", num(c.light.lightness), num(c.light.chroma), num(c.dark.lightness), num(c.dark.chroma))).flatten(),
)

#table(
  columns: 1 + decor.len(),
  [Palette], ..decor.map(c => [#title-case(c.name) hue]),
  ..palette-list.map(p => (title-case(p.name), ..decor.map(c => str(calc.rem(p.hue + c.turn, 360))))).flatten(),
)

The intent colors each have a hue, and share one lightness and chroma
for each mode: #num(intent.light.lightness) and #num(intent.light.chroma)
in light mode, #num(intent.dark.lightness) and #num(intent.dark.chroma) in dark.

#table(
  columns: 3,
  [Intent color], [Hue], [Use],
  ..intent.colors.map(c => (title-case(c.name), str(c.hue), c.use)).flatten(),
)

The generator writes each color as a token in each mode, and the token
in use, which the mode chooses (#link(<foundations:color>)[foundations]):

```css
--color-pop-dark: oklch(0.8 0.085 calc(var(--hue-accent) + 10));
--color-danger-light: oklch(0.4 0.09 var(--hue-danger));
--color-pop: var(--color-pop-dark);
```

No color of text or border is set for a palette. Text and borders belong
to components: each component makes them from its own background, by the
templates in `src/components/vocabulary.dhall`, so they are the same rule
on every background in every palette. The page itself is a component,
Page, on the base; text outside any other component is the page's text.

#table(
  columns: 3,
  [Property], [Made from the component's background as], [So that],
  [Text, `color`], [#raw(derived.color)], [The background's lightness is inverted, keeping its chroma and hue],
  [Underline, `text-decoration-color`], [#raw(derived.at("text-decoration-color"))], [An underline is the text's color],
  [Border, `border-color`], [#raw(derived.at("border-color"))], [The background is moved part of the way toward its inverse: a little darker on light backgrounds, a little lighter on dark],
)

A transparent background, the `clear` role, reads against the page, so its
text is made from the base instead, and it has no border. Other colors
derived from the palette:

#table(
  columns: 3,
  [Color], [Derived as], [Used for],
  [Ring], [The accent], [The focus outline],
  [Selection], [The pop, with text its inverse], [Selected text, everywhere],
  [Intent tint, `--color-<intent>-tint`], [The intent color washed into the base by `--tint`: #resolved("--tint-base") in light mode, and `--tint-step` more in dark], [The background of the tint roles, such as `danger-tint`: a Notice. Its text is made from it, as every component's is],
)

== Legibility and distinction
<palettes:legibility>
WCAG 2.2 AA asks for 4.5:1 between text and what it sits on. The table
gives, for each color, the contrast between a fill of it and the text a
component makes on it, the lowest across the palettes, as the
stylesheet renders them. A ratio below 4.5:1 fails AA.

#let swatches = json("../palettes.json")
// The same colors as the browser computes them, before rounding to 8 bits: the values printed.
#let exact = json("../palettes-exact.json")
#let luminance(hex) = {
  let (r, g, b, _) = rgb(hex).components().map(x => x / 100%)
  let lin(c) = if c <= 0.04045 { c / 12.92 } else { calc.pow((c + 0.055) / 1.055, 2.4) }
  0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}
#let contrast(a, b) = {
  let (x, y) = (luminance(a), luminance(b))
  (calc.max(x, y) + 0.05) / (calc.min(x, y) + 0.05)
}
#let lowest(name, mode) = calc.min(..palette-list.map(p => {
  let t = swatches.at(p.name).at(mode)
  contrast(t.at("color-" + name), t.at("text-" + name))
}))
#let ratio(x) = {
  let r = str(calc.round(x, digits: 1)) + ":1"
  if x < 4.5 { [#r, fails] } else { r }
}

#table(
  columns: 3,
  [Fill], [Light], [Dark],
  ..(decor + intent.colors).map(c => (title-case(c.name), ratio(lowest(c.name, "light")), ratio(lowest(c.name, "dark")))).flatten(),
)

Each intent color keeps a hue of its own, apart from every palette's
accent and pop, so emphasis and warning are not confused.

== Color in each state
<palettes:states>
States add no colors of their own; they transform the colors a control
already has, through the channel tokens (#link(<channels>)[channels]).
Hover moves a fill #resolved("--mix-hover") toward the interaction
color, which is white in dark mode and black in light mode, so a fill
lightens on dark pages and deepens on light ones. Focus adds a ring in the
accent. Disabled lowers a control's opacity to `--opacity-disabled`, and
loading applies #raw(token("--loading-filter")). Movement
belongs to #link(<animation>)[animation].

== The palette pages
<palettes:pages>
Each mode has its own page, drawn in that mode's colors. It opens with
the mode, the palette's name and its description, aligned left
and wrapping in a column a little over half the page wide. The
characters of the palette's Japanese name fill a column of their own on
the right, written vertically and sized to reach the depth of the text
beside them. One
row follows for each decor color. The rows leave the left part of the page empty: in the
rest, the color's name is aligned to the right with its value on
the same line, to its left, and its uses below; then comes a
square of the color at the right edge, with its tints, tones and shades
in a column on the square's left. The intent colors sit in a row at
the foot of the page, each value on its name's line, to its right. Every
value is written in CSS oklch notation. Every value shown is the one the stylesheet renders.

// A color with its variations: two tints (toward white), two tones (toward
// grey) and two shades (toward black), from lightest to darkest. The small
// squares touch the main square and each other.
#let variations(col) = (
  color.mix((col, 50%), (white, 50%), space: oklab),
  color.mix((col, 75%), (white, 25%), space: oklab),
  color.mix((col, 75%), (rgb("#808080"), 25%), space: oklab),
  color.mix((col, 50%), (rgb("#808080"), 50%), space: oklab),
  color.mix((col, 75%), (black, 25%), space: oklab),
  color.mix((col, 50%), (black, 50%), space: oklab),
)
// `outlined` draws a hairline around a whole swatch, above its fills.
#let outlined(width, height, edge, body) = box(width: width, height: height, {
  body
  place(top + left, rect(width: width, height: height, stroke: 0.5pt + edge, fill: none))
})
// The variations sit in a column on the left of the square, towards the middle of the page.
#let swatch(col, size, edge) = {
  let v = variations(col).map(x => rect(width: size / 6, height: size / 6, fill: x, stroke: none))
  outlined(size + size / 6, size, edge, grid(
    columns: (size / 6, size),
    rows: (size / 6,) * 6,
    grid.cell(x: 1, y: 0, rowspan: 6, rect(width: size, height: size, fill: col, stroke: none)),
    ..v,
  ))
}
#let swatch-small(col, size, edge) = {
  let v = variations(col).map(x => rect(width: size / 3, height: size / 3, fill: x, stroke: none))
  outlined(size + size * 2 / 3, size, edge, grid(
    columns: (size, size / 3, size / 3),
    rows: (size / 3,) * 3,
    grid.cell(rowspan: 3, rect(width: size, height: size, fill: col, stroke: none)),
    ..v,
  ))
}

// A color written in CSS oklch notation: lightness as a percentage, chroma, hue in degrees.
#let okl(value) = {
  // A color's oklch value as it is defined, from its computed CSS: oklch(…) as written, and
  // an rgb(…) color converted exactly; lightness, chroma and hue as plain numbers.
  let num(x, d) = str(calc.round(x, digits: d))
  if value.starts-with("oklch(") {
    let (l, ch, h) = value.slice(6, -1).split(" ").map(float)
    "oklch(" + num(l, 3) + " " + num(ch, 4) + " " + num(h, 1) + ")"
  } else {
    let (r, g, b) = value.slice(value.position("(") + 1, -1).split(",").map(x => int(x.trim()))
    let (l, ch, h, _) = oklch(rgb(r, g, b)).components()
    "oklch(" + num(l / 100%, 3) + " " + num(ch, 4) + " " + num(h.deg(), 1) + ")"
  }
}

// Swatch outlines are a neutral grey, partly transparent, so they take no color from the palette.
#let edge = rgb(50%, 50%, 50%, 40%)

// One page drawn in one mode of one palette. `t` holds its colors as drawn (hex), `x` the same
// colors as computed, whose oklch values are printed.
#let palette-page(t, x, name, kanji, description, mode) = {
  let c(k) = rgb(t.at(k))
  // The page's text and border, made from the base as Page makes them; muted text is the text
  // at 68%, as the demo draws captions.
  let ink = c("text-base")
  let muted = color.mix((ink, 68%), (c("color-base"), 32%), space: oklch)
  let label(body) = label-text(body, fill: muted)

  page(
    fill: c("color-base"),
    margin: (x: 28mm, top: 26mm, bottom: 24mm),
    footer: page-footer(ink, muted),
  )[
    #set text(fill: ink)
    #set par(leading: 0.85em)

    // Two columns: the mode, name and description on the left, aligned left and wrapping
    // within it; the palette's Japanese name on the right in its own column, written
    // vertically and sized so that it fills the height of the text beside it.
    #let chars = kanji.clusters()
    #let glyph = if chars.len() > 1 { 62pt } else { 118pt }
    // The heading sits on the palette's surface, which runs out to the left, right and top
    // edges of the page; the page margins remain its padding, and it is padded below.
    #block(
      width: 100%,
      fill: c("color-surface"),
      // Beneath it, a 1px rule in the pop at a tenth of its opacity, edge to edge.
      stroke: (bottom: 0.75pt + c("color-pop").transparentize(90%)),
      outset: (x: 28mm, top: 26mm),
      inset: (bottom: 9mm),
      below: 10mm,
      grid(
      columns: (58%, 1fr),
      align: (left + top, right + top),
      stack(
        spacing: 0pt,
        stack(spacing: 10pt, label[#mode], text(font: serif, size: 36pt, name)),
        v(7mm),
        text(size: 10pt, description),
      ),
      stack(
        spacing: 8pt,
        ..chars.map(k => text(font: cjk, size: glyph, weight: "light", fill: c("color-accent"), top-edge: "bounds", bottom-edge: "bounds", k)),
      ),
    ))

    #v(9mm)

    // The decor colors on the right half of the page, one row each: the title and value and
    // then the color's use on the left, wrapping within the half, and the swatch, with its
    // tints, on the right.
    #grid(
      columns: (1fr, 1fr),
      [],
      block(
        width: 100%,
        below: 6mm,
        stack(
          ..decor.map(col => ("color-" + col.name, title-case(col.name), col.use)).enumerate().map(((i, (key, title, use))) => block(
            width: 100%,
            inset: (y: 3.5mm),
            grid(
              columns: (1fr, 18mm + 18mm / 6),
              column-gutter: 5mm,
              align: (left + horizon, right + horizon),
              stack(
                spacing: 6pt,
                text(font: serif, size: 13pt, title),
                text(size: 6.4pt, font: mono, fill: muted, okl(x.at(key))),
                block(above: 0pt, inset: (top: 3pt), text(size: 8.5pt, use)),
              ),
              swatch(c(key), 18mm, edge),
            ),
          )),
        ),
      ),
    )

    #v(1mm)
    #line(length: 100%, stroke: 0.5pt + c("border-base"))
    #v(6mm)
    #grid(
      columns: (auto, 1fr, auto, 1fr, auto, 1fr, auto),
      ..intent.colors.map(col => ("color-" + col.name, title-case(col.name), col.use)).map(((key, title, use)) => stack(
        spacing: 5pt,
        swatch-small(c(key), 12mm, edge),
        v(4pt),
        text(size: 8pt, title),
        // The value on its own line, under the title.
        text(size: 5.2pt, font: mono, fill: muted, okl(x.at(key))),
        text(size: 7pt, fill: muted, use),
      )).intersperse([]),
    )
  ]
}

#for p in palette-list {
  palette-page(swatches.at(p.name).light, exact.at(p.name).light, title-case(p.name), p.kanji, p.description, "Light")
  palette-page(swatches.at(p.name).dark, exact.at(p.name).dark, title-case(p.name), p.kanji, p.description, "Dark")
}
