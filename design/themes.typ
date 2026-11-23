= Themes
<themes>
wacss ships four themes: Kinari, Matcha, Ai and Shu. This chapter sets out
what a theme consists of and the rules every theme follows, so that new
themes can be made to the same standard. The pages after it show each
theme's modes.

== Anatomy of a theme
<themes:anatomy>
A theme has a light mode and a dark mode. Each mode is defined by exactly
eight colours. Four of them shape the page: base, surface, accent and
pop. The other four report status: positive, warning, danger and
informational. Every mode chooses its own status colours to suit its
other four. Every other colour on the page is derived from these eight
through the token hierarchy, as tints, shades and mixtures.

== The four colours
<themes:colours>
#table(
  columns: 2,
  [Colour], [Character and use],
  [#strong[Base]], [The background of the page. Close to neutral, with at most a trace of the theme, and always a step away from pure white or pure black.],
  [#strong[Surface]], [Raised surfaces such as cards and panels. A small step from the base, so a raised surface reads as part of the same page.],
  [#strong[Accent]], [The colour the theme is named for, at its full strength. It is the most characteristic colour on the page, and the default variant, `secondary`, uses it as its accent.],
  [#strong[Pop]], [A second accent, for critical emphasis such as a call to action, or wherever a second accent is needed. It may be a different hue, or another expression of the accent's own colour, such as a deeper or paler shade. The `primary` variant, which is stronger and used less often, uses it as its accent.],
)

== Where a theme's colours come from
<themes:source>
A theme is named after one thing, and every one of its colours is drawn
from that thing: its material, its stages, its preparations, the
traditions it belongs to. Its accent is the colour a person would name
it by. Its pop, base and surface are further colours found in the same
source. A theme reads as a single idea because each colour on its page
has the same origin.

== Character
<themes:character>
Every theme is elegant and restrained, in keeping with the palette of
this book. Its colours are chosen for their tone and their relationships
rather than for intensity, so saturation is spent only where it guides
the eye. Corners are square: the border radius is zero in every theme.

== Derived colours
<themes:derived>
Text is derived rather than chosen. It is a near-black or near-white
that keeps the base's hue, and it reads clearly on both the base and the
surface.

#table(
  columns: 3,
  [Colour], [Derived as], [Used for],
  [Text], [The base, moved to 23% lightness in light mode or 90% in dark], [All body text and headings],
  [Muted text], [68% text mixed into the base], [Secondary text, labels and captions],
  [Border], [32% accent mixed into the base], [Hairlines around surfaces and controls],
  [Ring], [The accent], [The focus outline],
  [Selection], [The accent, with text in the base], [Selected text],
  [Text on a fill], [The base], [Primary buttons and status fills],
  [Status surface], [10% of the status colour in the base in light mode, 16% in dark], [Tinted notes],
  [Status surface text], [45% of the status colour in the text], [Text on a tinted note],
)

== Legibility and distinction
<themes:legibility>
Every pairing that carries text or meaning meets WCAG 2.2 AA: text and
muted text on the base and the surface, and the text on every fill.
Each status colour stays clearly apart from the accent and the pop, so
emphasis and warning are never confused.

== Colour in each state
<themes:states>
States add no colours of their own; they transform the colours a control
already has, through the channel tokens (#link(<channels>)[channels]).
Hover moves a fill 8% toward the interaction colour, which is white in
dark mode and black in light mode, so a fill lightens on dark pages and
deepens on light ones. Focus adds a ring in the accent. Disabled reduces
a control to half opacity, and loading halves its saturation. Movement
belongs to #link(<animation>)[animation].

== The theme pages
<themes:pages>
Each mode has its own page, drawn in that mode's colours. It gives the
theme's name and a description of the mode, then one row for each of
the four colours, with a square of the colour on the left and its uses
on the right. The four status colours sit in a row at the foot of the
page. Every value shown is the one the stylesheet renders.

#let themes = json("themes.json")
#let serif = ("Source Serif 4", "Source Serif Pro", "Charter", "Georgia", "Liberation Serif")
#let mono = ("JetBrains Mono", "DejaVu Sans Mono", "Liberation Mono")
#let cjk = ("Noto Serif CJK JP", "Noto Serif JP", "Yu Mincho", "Hiragino Mincho ProN")

#let palettes = (
  ("kinari", "Kinari", "生成",
    "Unbleached cloth. The page is kinari itself, the natural white of raw silk and cotton; the tan of the undyed thread defines it, and the deep brown of the raw fibre marks the call to action.",
    "Raw silk by lamplight. The ecru of undyed thread on a dark page, and the pale lustre of the silk for emphasis."),
  ("matcha", "Matcha", "抹茶",
    "Whisked tea. Matcha green defines the page; koicha, the deep green of thick tea, marks what matters most.",
    "Tea at dusk. Matcha green on a dark page, and the pale green of the froth for emphasis."),
  ("ai", "Ai", "藍",
    "Indigo dye. Ai, true indigo, defines the page; kon, the deepest indigo from the same vat, marks the call to action.",
    "Indigo at night. Faded indigo on a blue-black page, and the palest indigo for emphasis."),
  ("shu", "Shu", "朱",
    "Vermilion lacquer. Shu, the cinnabar red of torii gates, lacquerware and seals, defines the page; the deep red of lacquer laid on in many coats marks the call to action.",
    "Lacquer by lamplight. Vermilion glowing on a dark page, and the pale red of finely ground cinnabar for emphasis."),
)

#let uses = (
  ("color-base", "Base",
    "Page backgrounds, and the text on any filled control."),
  ("color-surface", "Surface",
    "Cards, panels, accordion rows, inputs, secondary buttons and the figure of a card."),
  ("color-accent", "Accent",
    "The accent of the secondary variant: the focus ring, text selection, and the tint of every border."),
  ("color-pop", "Pop",
    "The accent of the primary variant: the fill of primary buttons and primary cards, for calls to action."),
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
#let swatch(col, size, edge) = {
  let v = variations(col).map(x => rect(width: size / 6, height: size / 6, fill: x, stroke: none))
  outlined(size + size / 6, size, edge, grid(
    columns: (size, size / 6),
    rows: (size / 6,) * 6,
    grid.cell(rowspan: 6, rect(width: size, height: size, fill: col, stroke: none)),
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

// One page drawn in one theme. `t` holds that theme's resolved colours.
#let theme-page(t, name, kanji, description, mode) = {
  let c(k) = rgb(t.at(k))
  let label(body) = text(size: 6.5pt, tracking: 0.16em, fill: c("color-text-muted"), upper(body))

  page(
    fill: c("color-base"),
    margin: (x: 28mm, top: 26mm, bottom: 24mm),
    footer: grid(columns: (1fr, auto), label[wacss · themes], label[#name · #mode]),
  )[
    #set text(fill: c("color-text"))
    #set par(leading: 0.85em)

    #grid(
      columns: (1fr, auto),
      align: (left + bottom, right + bottom),
      stack(spacing: 10pt, label[#mode], text(font: serif, size: 36pt, name)),
      text(font: cjk, size: 52pt, weight: "light", fill: c("color-border"), kanji),
    )
    #v(7mm)
    #line(length: 26pt, stroke: 1.2pt + c("color-pop"))
    #v(6mm)
    #block(width: 82%, text(size: 10pt, description))

    #v(9mm)

    #for (key, title, use) in uses {
      grid(
        columns: (24mm + 24mm / 6, 1fr),
        column-gutter: 10mm,
        align: (left + top, left + horizon),
        swatch(c(key), 24mm, c("color-border")),
        stack(
          spacing: 9pt,
          text(font: serif, size: 14pt, title),
          text(size: 6.8pt, font: mono, fill: c("color-text-muted"), t.at(key)),
          block(width: 92%, above: 0pt, inset: (top: 8pt), text(size: 9pt, use)),
        ),
      )
      v(5mm)
    }

    #v(1mm)
    #line(length: 100%, stroke: 0.5pt + c("color-border"))
    #v(6mm)
    #grid(
      columns: (1fr,) * 4,
      column-gutter: 8mm,
      ..(
        ("tone-positive", "Positive", "Success, confirmation"),
        ("tone-warning", "Warning", "Caution, reversible risk"),
        ("tone-danger", "Danger", "Destructive or failed"),
        ("tone-informational", "Informational", "Neutral notice"),
      ).map(((key, title, use)) => stack(
        spacing: 5pt,
        swatch-small(c(key), 12mm, c("color-border")),
        v(4pt),
        text(size: 8.5pt, title),
        text(size: 6pt, font: mono, fill: c("color-text-muted"), t.at(key)),
        text(size: 7pt, fill: c("color-text-muted"), use),
      )),
    )
  ]
}

#for (key, name, kanji, light, dark) in palettes {
  theme-page(themes.at(key).light, name, kanji, light, "Light")
  theme-page(themes.at(key).dark, name, kanji, dark, "Dark")
}
