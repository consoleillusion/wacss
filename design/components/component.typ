// The skeleton of every component chapter. A chapter is not written by hand: it is laid out
// here from the component's src/components/<Name>/schema.dhall, which Typst evaluates through
// the Dhall plugin (design/dhall.wasm, built from design/dhall-plugin). The schema holds the
// metadata and plain text; this file holds only the arrangement.

#let dhall = plugin("/design/dhall.wasm")
#let prelude = read("/src/components/prelude.dhall")

#let load-schema(title) = {
  // Purpose: evaluate a component's schema.dhall, with the prelude it imports, to a dictionary
  json(dhall.decode(
    read("/src/components/" + title + "/schema.dhall", encoding: none),
    bytes(json.encode(("../prelude.dhall": prelude))),
  ))
}

#let kebab(title) = {
  // Purpose: the kebab-case name of a component title, as tokens and labels use it
  lower(title.replace(regex("([a-z0-9])([A-Z])"), m => m.captures.at(0) + "-" + m.captures.at(1)))
}

// The shared vocabulary (src/components/vocabulary.dhall): variants in order, and how a variant
// in each color role looks.
#let vocabulary = json(dhall.decode(read("/src/components/vocabulary.dhall", encoding: none), bytes("{}")))

#let is-child(a) = {
  // Purpose: whether an argument takes another component as data, { component, data }
  type(a) == dictionary and "component" in a.at("properties", default: (:))
}

#let type-cell(a, required) = {
  // Purpose: an argument's type, its choices or its shape, then its default and whether it is required
  let t = if "enum" in a { a.enum.map(raw).join(" · ") } else if is-child(a) and a.at("type", default: none) == "object" {
    raw("{ component, data }")
  } else if type(a.at("type", default: none)) == array { a.type.join(" or ") } else { a.at("type", default: "any") }
  if "default" in a {
    let d = a.default
    t = t + [; ] + raw(if type(d) == str { d } else { repr(d) })
  }
  if required { t = t + [; required] }
  t
}

#let meaning-cell(a) = {
  // Purpose: an argument's description, with a reference to children where it takes a component
  let d = a.at("description", default: "")
  let takes-child = is-child(a) or is-child(a.at("items", default: none))
  if takes-child [#d (#link(<schema:children>)[children])] else [#d]
}

#let argument-rows(schema) = {
  // Purpose: one row per argument, then one per described property of the items it lists
  let required = schema.at("required", default: ())
  let rows = ()
  for (key, a) in schema.arguments {
    rows.push((raw(key), type-cell(a, key in required), meaning-cell(a)))
    let items = a.at("items", default: (:))
    let inner = items.at("required", default: ())
    for (k, p) in items.at("properties", default: (:)) {
      if "description" in p { rows.push((raw(key + "[]." + k), type-cell(p, k in inner), meaning-cell(p))) }
    }
  }
  rows
}

#let paragraphs(list) = for p in list { par(p) }

#let component-chapter(title) = {
  // Purpose: lay out one component's chapter from its schema
  let s = load-schema(title)
  if s.title != title { panic(title + ": its schema's title is " + s.title) }
  let name = kebab(title)
  let at(key) = s.at(key, default: ())

  [#heading(depth: 1, title)#label(name)]
  par(s.description)
  paragraphs(at("details"))
  if "element" in s {
    par[It is an element component: its rules select #s.element.map(raw).join(", ", last: " and "),
      so every such element on a wacss page is styled as #title, whatever rendered it.]
  } else {
    par[It is a class component: its rules select #raw("." + name), the class it sets on its root.]
  }

  par[Categories: #s.categories.join(", ", last: " and ").]

  [#heading(depth: 2, "Variants and states")#label(name + ":states")]
  let variants = vocabulary.variants.map(v => v.name).filter(v => v in s.variants)
  table(columns: 3, [Variant], [Color role], [Look],
    ..variants.map(v => (raw(v), raw(s.variants.at(v)), [#vocabulary.roles.at(s.variants.at(v)).look])).flatten())
  let states = s.states.filter(x => x != "static")
  let effects = s.at("stateEffects", default: (:))
  if states.len() > 0 {
    table(columns: 2, [State], [Effect], ..states.map(x => {
      if x not in effects { panic(title + ": its schema gives no stateEffects entry for " + x) }
      ([#x], [#effects.at(x)])
    }).flatten())
  } else {
    par[It has no state other than #raw("static").]
  }
  paragraphs(at("stateNotes"))


  [#heading(depth: 2, "Arguments")#label(name + ":arguments")]
  table(columns: 3, [Argument], [Type and default], [Meaning], ..argument-rows(s).flatten())
  paragraphs(at("argumentNotes"))

  for section in at("sections") {
    [#heading(depth: 2, section.heading)#label(name + ":" + kebab(section.heading))]
    paragraphs(section.text)
    if section.columns.len() > 0 {
      table(columns: section.columns.len(), ..section.columns.map(c => [#c]), ..section.rows.flatten().map(c => [#c]))
    }
    paragraphs(section.notes)
  }

  [#heading(depth: 2, "Themable properties")#label(name + ":properties")]
  par(s.themeableProperties.map(raw).join(", ") + ".")
  for (pseudo, p) in s.at("pseudoElements", default: (:)).pairs().filter(((k, p)) => p.themeableProperties.len() > 0).to-dict() {
    par[On #raw(pseudo)#if "on" in p [, drawn when the element matches #raw(p.on)]: #p.themeableProperties.map(raw).join(", ").]
  }
  // Parts: the descendant elements it styles, with their own tokens and, if named, their own role.
  for (part, p) in s.at("parts", default: (:)).pairs() {
    let props = p.at("themeableProperties", default: ())
    par[Its part #raw(part), the elements #raw(p.selector) within it#if "role" in p [, in the #raw(p.role) role]#if props.len() > 0 [: #props.map(raw).join(", ").] else [, with structure only.]]
  }
  // Values: which semantic token a component token of the default variant refers to.
  let values = s.at("values", default: (:))
  if values.len() > 0 {
    par[On the default variant, #values.pairs().map(((k, v)) => [#raw(k) is #raw(v)]).join(", ", last: " and ").]
  }

  [#heading(depth: 2, "Example")#label(name + ":example")]
  if at("usage").len() == 0 { panic(title + ": its schema gives no usage") }
  for u in at("usage") { raw(u, block: true, lang: "astro") }

  for p in at("planned") { par[#emph[Planned:] #p] }
  if at("related").len() > 0 {
    par[See also #at("related").map(r => link(label(kebab(r)), r)).join(", ", last: " and ").]
  }
}
