= Palettes
<palettes>
wacss ships four palettes: Kinari, Matcha, Aizome and Shu. This chapter sets out
what a palette consists of and the rules every palette follows, so that new
palettes can be made to the same standard. The pages after it show each
palette's modes.

== Anatomy of a palette
<palettes:anatomy>
A palette has a light mode and a dark mode. Each mode has eight colours.
Four of them shape the page: base, surface, accent and pop. The other
four report status: positive, warning, danger and informational. Every
mode chooses its own status colours to suit its other four.

The accent is the prima of a mode's colours: the one colour the others
are defined from. A mode chooses six colours, its accent, its pop and its
four status colours; its base and surface are derived from its accent.
Every other colour on the page is derived from these through the token
hierarchy, as tints, shades and mixtures.

== The four colours
<palettes:colours>
#table(
  columns: 2,
  [Colour], [Character and use],
  [#strong[Base]], [The background of the page. Close to neutral, with a trace of the accent's hue, and always a step away from pure white or pure black.],
  [#strong[Surface]], [Raised surfaces such as cards and panels. A small step from the base, so a raised surface reads as part of the same page.],
  [#strong[Accent]], [The colour the palette is named for, at its full strength. It is the most characteristic colour on the page. Components whose default variant, `secondary`, takes the `accent` role, such as Button, are filled with it.],
  [#strong[Pop]], [A second accent, for critical emphasis such as a call to action, or wherever a second accent is needed. It may be a different hue, or another expression of the accent's own colour, such as a deeper or paler shade. The `primary` variant, which is stronger and used less often, takes the `pop` role and is filled with it.],
)

== Where a palette's colours come from
<palettes:source>
A palette is named after one thing, and every one of its colours is drawn
from that thing: its material, its stages, its preparations, the
traditions it belongs to. Its accent is the colour a person would name
it by. Its pop is a further colour found in the same source, and its
base and surface carry the accent's own hue. A palette reads as a single idea because each colour on its page
has the same origin.

== Character
<palettes:character>
Every palette is elegant and restrained, in keeping with the palette of
this book. Its colours are chosen for their tone and their relationships
rather than for intensity, so saturation is spent only where it guides
the eye.

== Derived colours
<palettes:derived>
Every palette's accent and pop share one lightness and one chroma for
each mode, so the palettes differ only in hue, and each is equally legible
and equally strong:

#table(
  columns: 3,
  [], [Light], [Dark],
  [Accent lightness, chroma], [0.5, 0.095], [0.75, 0.085],
  [Pop lightness, chroma], [0.38, 0.085], [0.88, 0.055],
)

#table(
  columns: 3,
  [Palette], [Accent hue, light and dark], [Pop hue, light and dark],
  [Kinari], [78.4, 85.2], [77, 86.6],
  [Matcha], [127.7, 125.9], [132.3, 122],
  [Aizome], [253.2, 251.5], [263.8, 256],
  [Shu], [22, 22], [20, 20],
)

The base and surface keep only the accent's hue. Their lightness and
chroma are fixed for each mode, set with CSS relative colour: nearly
neutral in light mode, a deep grey tinted with the accent in dark.

```css
--kinari-light-base: oklch(from var(--kinari-light-accent)
  var(--base-lightness-light) var(--base-chroma-light) h);
```

#table(
  columns: 3,
  [], [Light], [Dark],
  [Base lightness], [0.985], [0.19],
  [Surface lightness], [0.995], [0.21],
  [Base chroma], [0.0015], [0.003],
  [Surface chroma], [0.002], [0.004],
)

The surface is lighter than the base in both modes, so a raised panel
reads as lifted toward the light, and the dark mode mirrors the light.
Every palette shares these values, so its accent alone decides the faint
tint of its page.

Text is derived from the base rather than chosen. It is a near-black or
near-white that keeps the base's hue, and it reads clearly on both the
base and the surface.

#table(
  columns: 3,
  [Colour], [Derived as], [Used for],
  [Text], [The base, moved to 23% lightness in light mode or 90% in dark], [All body text and headings],
  [Muted text], [68% text mixed into the base], [Secondary text, labels and captions],
  [Border], [A translucent neutral grey, `--hairline`, the same in every palette], [Hairlines around surfaces and controls, and the rules of tables],
  [Ring], [The accent], [The focus outline],
  [Selection], [The pop, with text in the base], [Selected text, everywhere],
  [Text on a fill], [The base], [Primary buttons and status fills],
  [Status surface], [10% of the status colour in the base in light mode, 16% in dark], [Tinted notes],
  [Status surface text], [45% of the status colour in the text], [Text on a tinted note],
)

== Legibility and distinction
<palettes:legibility>
Every pairing that carries text or meaning meets WCAG 2.2 AA: text and
muted text on the base and the surface, and the text on every fill.
Each status colour stays clearly apart from the accent and the pop, so
emphasis and warning are never confused.

== Colour in each state
<palettes:states>
States add no colours of their own; they transform the colours a control
already has, through the channel tokens (#link(<channels>)[channels]).
Hover moves a fill 8% toward the interaction colour, which is white in
dark mode and black in light mode, so a fill lightens on dark pages and
deepens on light ones. Focus adds a ring in the accent. Disabled reduces
a control to half opacity, and loading halves its saturation. Movement
belongs to #link(<animation>)[animation].

== The palette pages
<palettes:pages>
Each mode has its own page, drawn in that mode's colours. It opens with
the mode, the palette's name and a description of the mode, aligned left
and wrapping in a column a little over half the page wide. The
characters of the palette's Japanese name fill a column of their own on
the right, written vertically and sized to reach the depth of the text
beside them. One
row follows for each of the four colours. The rows leave the left part of the page empty: in the
rest, the colour's name is aligned to the right with its value on
the same line, to its left, and its uses below; then comes a
square of the colour at the right edge, with its tints, tones and shades
in a column on the square's left. The four status colours sit in a row at
the foot of the page, each value on its name's line, to its right. Every
value is written in CSS oklch notation. Every value shown is the one the stylesheet renders.

#let swatches = json("../palettes.json")
// The same colours as the browser computes them, before rounding to 8 bits: the values printed.
#let exact = json("../palettes-exact.json")
#import "../style.typ": serif, mono, cjk, label-text, page-footer

#let palettes = (
  ("kinari", "Kinari", "生成",
    "Unbleached cloth. The page is kinari itself, the natural white of raw silk and cotton; the tan of the undyed thread defines it, and the deep brown of the raw fibre marks the call to action.",
    "Raw silk by lamplight. The ecru of undyed thread on a dark page, and the pale lustre of the silk for emphasis."),
  ("matcha", "Matcha", "抹茶",
    "Whisked tea. Matcha green defines the page; koicha, the deep green of thick tea, marks what matters most.",
    "Tea at dusk. Matcha green on a dark page, and the pale green of the froth for emphasis."),
  ("aizome", "Aizome", "藍染",
    "Indigo dyeing. Aizome, cloth dyed true indigo, defines the page; kon, the deepest indigo from the same vat, marks the call to action.",
    "Indigo at night. Faded indigo on a blue-black page, and the palest indigo for emphasis."),
  ("shu", "Shu", "朱",
    "Japanese red. A deep crimson, the red of the rising sun on the flag, of lacquerware and of seals, defines the page; a darker red, lacquer laid on in many coats, marks the call to action.",
    "Lacquer by lamplight. Crimson glowing on a dark page tinted with it, and a pale rose red for emphasis."),
)

#let uses = (
  ("palette-base", "Base",
    "Page backgrounds, and the text on any filled control."),
  ("palette-surface", "Surface",
    "Cards, panels and inputs."),
  ("palette-accent", "Accent",
    "The fill of secondary buttons and the focus ring."),
  ("palette-pop", "Pop",
    "The accent of the primary variant: the fill of primary buttons, for calls to action, and of selected text."),
)


// A colour with its variations: two tints (toward white), two tones (toward
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

// A colour written in CSS oklch notation: lightness as a percentage, chroma, hue in degrees.
#let okl(value) = {
  // A colour's oklch value as it is defined, from its computed CSS: oklch(…) as written, and
  // an rgb(…) status colour converted exactly; lightness, chroma and hue as plain numbers.
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

// Swatch outlines are a neutral grey, partly transparent, so they take no colour from the palette.
#let edge = rgb(50%, 50%, 50%, 40%)

// One page drawn in one mode of one palette. `t` holds its colours as drawn (hex), `x` the same
// colours as computed, whose oklch values are printed.
#let palette-page(t, x, name, kanji, description, mode) = {
  let c(k) = rgb(t.at(k))
  let label(body) = label-text(body, fill: c("color-text-muted"))

  page(
    fill: c("palette-base"),
    margin: (x: 28mm, top: 26mm, bottom: 24mm),
    footer: page-footer(c("color-text"), c("color-text-muted")),
  )[
    #set text(fill: c("color-text"))
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
      fill: c("palette-surface"),
      // Beneath it, a 1px rule in the pop at a tenth of its opacity, edge to edge.
      stroke: (bottom: 0.75pt + c("palette-pop").transparentize(90%)),
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
        ..chars.map(k => text(font: cjk, size: glyph, weight: "light", fill: c("palette-accent"), top-edge: "bounds", bottom-edge: "bounds", k)),
      ),
    ))

    #v(9mm)

    // The four colours on the right half of the page, one row each: the title and value and
    // then the colour's use on the left, wrapping within the half, and the swatch, with its
    // tints, on the right.
    #grid(
      columns: (1fr, 1fr),
      [],
      block(
        width: 100%,
        below: 6mm,
        stack(
          ..uses.enumerate().map(((i, (key, title, use))) => block(
            width: 100%,
            inset: (y: 3.5mm),
            grid(
              columns: (1fr, 18mm + 18mm / 6),
              column-gutter: 5mm,
              align: (left + horizon, right + horizon),
              stack(
                spacing: 6pt,
                text(font: serif, size: 13pt, title),
                text(size: 6.4pt, font: mono, fill: c("color-text-muted"), okl(x.at(key))),
                block(above: 0pt, inset: (top: 3pt), text(size: 8.5pt, use)),
              ),
              swatch(c(key), 18mm, edge),
            ),
          )),
        ),
      ),
    )

    #v(1mm)
    #line(length: 100%, stroke: 0.5pt + c("color-border"))
    #v(6mm)
    #grid(
      columns: (auto, 1fr, auto, 1fr, auto, 1fr, auto),
      ..(
        ("background-positive", "Positive", "Success, confirmation"),
        ("background-warning", "Warning", "Caution, reversible risk"),
        ("background-danger", "Danger", "Destructive or failed"),
        ("background-informational", "Informational", "Neutral notice"),
      ).map(((key, title, use)) => stack(
        spacing: 5pt,
        swatch-small(c(key), 12mm, edge),
        v(4pt),
        text(size: 8pt, title),
        // The value on its own line, under the title.
        text(size: 5.2pt, font: mono, fill: c("color-text-muted"), okl(x.at(key))),
        text(size: 7pt, fill: c("color-text-muted"), use),
      )).intersperse([]),
    )
  ]
}

#for (key, name, kanji, light, dark) in palettes {
  palette-page(swatches.at(key).light, exact.at(key).light, name, kanji, light, "Light")
  palette-page(swatches.at(key).dark, exact.at(key).dark, name, kanji, dark, "Dark")
}
