// The data the book is written from, read once: the shared vocabulary and the color
// configuration (evaluated from Dhall), and what the generator writes to dist/tokens.json — every
// token and every component. Chapters import what they need from here rather than restating it.
#let dhall-plugin = plugin("/design/dhall.wasm")
#let load-dhall(path) = json(dhall-plugin.decode(read(path, encoding: none), bytes(json.encode((:)))))
#let vocabulary = load-dhall("/src/components/vocabulary.dhall")
#let colors = load-dhall("/src/styles/palettes.dhall")
#let generated = json("/dist/tokens.json")
#let tokens = generated.tokens
// Every component's title, in name order: the folders in src/components with a schema.
#let component-titles = generated.components.keys().sorted()
#let scripts = json("/package.json").scripts

// A token's value, as written in its source, by name.
#let token(name) = {
  let t = tokens.find(t => t.name == name)
  if t == none { panic("no token " + name) }
  t.value
}
// A token quoted in prose: its name and, in brackets, its value.
#let quoted(name) = [#raw(name) (#raw(token(name)))]
// A list in prose: "a, b and c".
#let listed(items) = if items.len() == 1 { items.first() } else { items.slice(0, -1).join(", ") + " and " + items.last() }
#let title-case(name) = upper(name.first()) + name.slice(1)

// A token's value with its references followed: a value that is only var(--x) is replaced by
// --x's value, until a value of its own is reached.
#let resolved(name) = {
  let v = token(name)
  let m = v.match(regex("^var\((--[\w-]+)\)$"))
  if m == none { v } else { resolved(m.captures.at(0)) }
}
// A number and its unit from a token's resolved value, such as 250 and "ms" from 250ms.
#let measure(name) = {
  let m = resolved(name).match(regex("^(-?[0-9.]+)([a-z%]*)$"))
  if m == none { panic(name + " is not a single measure: " + resolved(name)) }
  (float(m.captures.at(0)), m.captures.at(1))
}
