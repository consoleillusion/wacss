// Shared by every page of the book: fonts, the label style and the page footer.
// The book (book.typ) and the palette pages (aesthetics/palettes.typ) both import this file,
// so a page's footer and labels are defined in one place only.
//
// Text is never set in block capitals: nothing here or anywhere in the book transforms text
// to upper case, and labels and footers are written in sentence or title case.

#let running-title = "wacss specification"

#let sans = ("Helvetica Neue", "Arial", "Liberation Sans")
#let serif = ("Noto Serif CJK JP", "Liberation Serif")
#let mono = ("JetBrains Mono", "DejaVu Sans Mono", "Liberation Mono")
#let cjk = ("Noto Serif CJK JP", "Noto Serif JP", "Yu Mincho", "Hiragino Mincho ProN")

// Small, tracked label for eyebrows, table heads and footers.
#let label-text(body, size: 6.8pt, fill: black) = text(size: size, weight: 500, tracking: 0.14em, fill: fill, body)

// A heading's text as a plain lowercase string.
#let plain(it) = {
  let walk(c) = if type(c) == str { c } else if c.has("text") { c.text } else if c.has("children") { c.children.map(walk).join() } else if c.has("body") { walk(c.body) } else { " " }
  lower(walk(it))
}

// The page footer, on every page: "wacss specification · <part> · <chapter>", lowercase,
// taken from the part and chapter in effect on the page, with the page number on the right.
#let page-footer(ink, muted) = context {
  let parts = query(heading.where(level: 1).before(here()))
  let trail = ("wacss specification",)
  if parts.len() > 0 {
    let part = parts.last()
    trail.push(plain(part.body))
    let chapters = query(heading.where(level: 2).before(here())).filter(h => h.location().position().page > part.location().position().page or (h.location().position().page == part.location().position().page and h.location().position().y > part.location().position().y))
    if chapters.len() > 0 { trail.push(plain(chapters.last().body)) }
  }
  grid(
    columns: (1fr, auto),
    label-text(trail.join(" · "), fill: ink),
    label-text(str(counter(page).get().first()), fill: muted),
  )
}
