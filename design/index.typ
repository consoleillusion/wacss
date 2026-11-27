// wacss specification: the book.
//
// This file is the only entrypoint and the only place with styling. The chapter
// files (*.typ next to this one) hold content only.
//
//   typst compile book.typ                       -> light mode (default)
//   typst compile --input mode=dark book.typ     -> dark mode
//
// The modes are the dictionaries in `modes`.

// ---------------------------------------------------------------------------
// Document data
// ---------------------------------------------------------------------------

#let title = "wacss"
#let subtitle = "Specification"
#let eyebrow = "Design System & Component Library"
#let summary = [
  A data-driven component library with one global, token-driven stylesheet. \
  Pass data, get a complete, accessible UI.
]
#let status = "Draft"

// Each component's chapter is laid out by components/component.typ from its schema.dhall.
// Typst cannot list a folder, so the components are named here, in the order of their chapters.
#import "data.typ": component-titles
// Every component, in name order, read from what the generator found in src/components.
#let components = component-titles

// Each part is a level-1 heading; each file's own headings nest beneath it. An entry
// "schema:<Title>" is a component chapter, laid out from that component's schema.
#let parts = (
  ("Introduction", ("introduction/what", "introduction/philosophy", "introduction/usability", "introduction/demo", "demo/component", "demo/component-single", "demo/design", "introduction/glossary")),
  ("Architecture", ("architecture/overview", "architecture/tokens", "architecture/foundations", "architecture/channels", "architecture/variants", "architecture/states", "architecture/schema", "architecture/generation", "architecture/stylesheet", "architecture/helpers", "architecture/customising", "architecture/build", "architecture/reference")),
  ("Aesthetics", ("aesthetics/intent", "aesthetics/palettes", "aesthetics/animation", "aesthetics/form")),
  ("Components", ("components/using",) + components.map(c => "schema:" + c)),
)

// ---------------------------------------------------------------------------
// Modes
// ---------------------------------------------------------------------------

// The book is typeset in its own palette, Sage: four colors per edition and a
// derived text color. Every other shade is mixed from them, as the token
// hierarchy does.
#let sage = (
  light: ("color-base": "#f7f8f7", "color-surface": "#ebecea", "color-accent": "#4a6a5c",
          "color-text": "#1c1d1c", "color-text-muted": "#5a5b5a"),
  dark: ("color-base": "#1b1c1c", "color-surface": "#252626", "color-accent": "#8fb4a1",
         "color-text": "#dcdfdf", "color-text-muted": "#989a9a"),
)
#let mix(a, b, amount) = color.mix((rgb(a), amount), (rgb(b), 100% - amount), space: oklab)
#let derive(t) = (
  page: rgb(t.at("color-base")),
  wash: rgb(t.at("color-surface")),
  ink: rgb(t.at("color-text")),
  muted: rgb(t.at("color-text-muted")),
  faint: mix(t.at("color-text"), t.at("color-base"), 45%),
  rule: mix(t.at("color-accent"), t.at("color-base"), 22%),
  kanji: mix(t.at("color-accent"), t.at("color-base"), 10%),
  accent: rgb(t.at("color-accent")),
)
#let modes = (light: derive(sage.light), dark: derive(sage.dark))

#let mode-name = sys.inputs.at("mode", default: "light")
#let c = modes.at(mode-name)

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

#import "components/component.typ": component-chapter
#import "style.typ": sans, serif, mono, cjk, running-title, page-footer
#import "style.typ" as style
// The shared label, in the book's faint color unless another is given.
#let label-text(body, size: 6.8pt, fill: c.faint) = style.label-text(body, size: size, fill: fill)

// ---------------------------------------------------------------------------
// Base
// ---------------------------------------------------------------------------

#set document(title: title + " " + subtitle)
#set text(font: sans, size: 9.4pt, fill: c.ink, lang: "en", hyphenate: false)
#set par(leading: 0.78em, spacing: 1.05em, justify: false)
#set page(
  paper: "a4",
  margin: (x: 22mm, top: 26mm, bottom: 28mm),
  fill: c.page,
  footer: page-footer(c.ink, c.muted),
)

// Only parts (level 1) are numbered, in roman numerals. Every other heading is unnumbered.
#set heading(numbering: none)
#show heading.where(level: 1): set heading(numbering: "I")

// ---------------------------------------------------------------------------
// Headings
// ---------------------------------------------------------------------------

#let heading-number(it) = if it.numbering != none {
  counter(heading).display(it.numbering) + h(0.45em)
}

// Level 1: part divider page.
#show heading.where(level: 1): it => {
  pagebreak(weak: true)
  v(30%)
  label-text([Part #counter(heading).display("I")], size: 7.5pt, fill: c.faint)
  v(5mm)
  block(text(font: serif, size: 36pt, weight: "regular", fill: c.ink, it.body))
  v(7mm)
  line(length: 26pt, stroke: 1.2pt + c.accent)
  pagebreak(weak: true)
}

// Level 2: a file's title. Starts a new page.
#show heading.where(level: 2): it => {
  pagebreak(weak: true)
  block(above: 0pt, below: 8mm, width: 100%)[
    #text(font: serif, size: 23pt, weight: "regular", fill: c.ink)[#heading-number(it)#it.body]
    #v(4.5mm, weak: true)
    #line(length: 100%, stroke: 0.6pt + c.rule)
  ]
}

#show heading.where(level: 3): it => block(above: 9mm, below: 4mm, sticky: true)[
  #text(font: serif, size: 14.5pt, weight: "regular", fill: c.ink)[#heading-number(it)#it.body]
]

#show heading.where(level: 4): it => block(above: 7mm, below: 3mm, sticky: true)[
  #text(font: serif, size: 11.5pt, weight: "regular", fill: c.ink)[#heading-number(it)#it.body]
]

#show heading.where(level: 5): it => block(above: 6mm, below: 2.5mm, sticky: true)[
  #label-text(it.body, size: 7.2pt, fill: c.muted)
]

// ---------------------------------------------------------------------------
// Inline text
// ---------------------------------------------------------------------------

#show strong: set text(weight: 600)

// Links written in the text are accent-colored and underlined; the internal
// links the contents page builds from locations are left plain.
#show link: it => if type(it.dest) in (location, dictionary) {
  it
} else {
  set text(fill: c.accent)
  underline(stroke: 0.5pt + c.accent.transparentize(55%), offset: 2.2pt, it)
}

#show raw.where(block: false): it => highlight(
  fill: c.wash,
  top-edge: "ascender",
  bottom-edge: "descender",
  extent: 1.6pt,
  radius: 2pt,
  text(font: mono, size: 0.86em, fill: c.ink, it),
)

// ---------------------------------------------------------------------------
// Code blocks: restrained, no syntax colors.
// ---------------------------------------------------------------------------

// Dhall has no built-in syntax in Typst; this definition highlights it.
#set raw(syntaxes: "dhall.sublime-syntax")

#show raw.where(block: true): it => block(
  width: 100%,
  fill: c.wash,
  inset: (x: 11pt, y: 10pt),
  radius: 3pt,
  above: 1.1em,
  below: 1.5em,
  {
    set text(font: mono, size: 7.7pt, fill: c.ink)
    set par(leading: 0.62em, spacing: 0.62em)
    it
  },
)

// ---------------------------------------------------------------------------
// Tables
// ---------------------------------------------------------------------------

#set table(
  stroke: (x, y) => (bottom: if y == 0 { 0.8pt + c.ink } else { 0.5pt + c.rule }),
  inset: (x: 5pt, y: 6.5pt),
  align: left + top,
)
#show table: set text(size: 8.2pt)
#show table: set block(above: 1.1em, below: 1.2em)
#show table.cell.where(x: 0): set text(weight: 500)
#show table.cell.where(y: 0): set text(size: 6.6pt, weight: 600, tracking: 0.12em, fill: c.faint)

// ---------------------------------------------------------------------------
// Lists
// ---------------------------------------------------------------------------

#set list(marker: text(fill: c.faint)[•], indent: 3pt, body-indent: 7pt, spacing: 0.65em)
#set enum(numbering: n => text(fill: c.faint)[#n.], indent: 3pt, body-indent: 7pt, spacing: 0.65em)

#show quote.where(block: true): it => block(
  inset: (left: 10pt, y: 2pt),
  stroke: (left: 1.2pt + c.accent),
  text(fill: c.muted, it.body),
)

// ---------------------------------------------------------------------------
// Cover
// ---------------------------------------------------------------------------

#page(margin: (x: 22mm, top: 34mm, bottom: 28mm))[
  #text(font: cjk, size: 175pt, weight: "extralight", fill: c.kanji)[和]
  #v(1fr)
  // The eyebrow, title and subtitle are one group: each line is measured by its letters
  // (cap height to baseline, or x-height for the lowercase title), so the gaps between them
  // are exactly the spacing given here and nothing from the font's line box.
  #block({
    set text(top-edge: "cap-height", bottom-edge: "baseline")
    stack(
      spacing: 0pt,
      label-text(eyebrow, size: 7.2pt),
      v(7mm),
      text(font: serif, size: 46pt, tracking: 0.03em, fill: c.accent, top-edge: "x-height", title),
      v(5mm),
      text(font: serif, size: 19pt, fill: c.muted, subtitle),
    )
  })
  #v(10mm)
  #block(width: 62%, text(size: 10pt, fill: c.muted, summary))
  #v(16mm)
  #line(length: 100%, stroke: 0.5pt + c.rule)
  #v(3mm)
  #label-text(status + " · " + datetime.today().display("[month repr:long] [year]"), size: 7pt)
]

// ---------------------------------------------------------------------------
// Contents
// ---------------------------------------------------------------------------

// Contents entries link to an explicit page position rather than a named
// destination, so every PDF viewer follows them.
#let target(it) = {
  let loc = it.element.location()
  (page: loc.page(), x: 0pt, y: loc.position().y)
}

#show outline.entry.where(level: 1): it => {
  v(5mm, weak: true)
  block(below: 2.5mm, link(
    target(it),
    grid(
      columns: (12mm, 1fr, auto),
      label-text(it.prefix(), size: 6.8pt, fill: c.faint),
      text(font: serif, size: 11.5pt, it.element.body),
      text(size: 8pt, fill: c.faint, it.page()),
    ),
  ))
}

#show outline.entry.where(level: 2): it => block(
  below: 0pt,
  stroke: (bottom: 0.6pt + c.accent.transparentize(65%)),
  inset: (y: 3.9pt),
  link(
    target(it),
    grid(
      columns: (1fr, auto),
      text(size: 8.4pt, it.element.body),
      text(size: 8pt, fill: c.faint, it.page()),
    ),
  ),
)

#page[
  #block(below: 8mm, width: 100%)[
    #text(font: serif, size: 23pt)[Contents]
    #v(4.5mm, weak: true)
    #line(length: 100%, stroke: 0.6pt + c.rule)
  ]
  #outline(title: none, depth: 2, indent: 0pt)
]

// ---------------------------------------------------------------------------
// Body
// ---------------------------------------------------------------------------

#for (part-title, files) in parts {
  heading(level: 1)[#part-title]
  for f in files {
    [
      #set heading(offset: 1)
      #if f.starts-with("schema:") { component-chapter(f.slice(7)) } else { include (f + ".typ") }
    ]
  }
}
