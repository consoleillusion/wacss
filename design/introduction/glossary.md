#import "../data.typ": colors, vocabulary, listed, title-case

= Glossary
<glossary>
Terms are grouped: a group names a family of terms, and a subgroup a
family within it. A row whose subgroup is empty defines a term of the
group as a whole.

// Each entry is (group, subgroup, term, meaning). Entries of one group, and of one subgroup within
// it, are adjacent; their group and subgroup cells are merged down the rows they share.
#let entries = (
  ("Palette", "", "Palette", [Every color of the semantic level: the decor colors and the intent colors of a light and a dark mode. A palette is named after its accent, whose hue is its prima: #title-case(colors.palettes.first().name) is both a palette and its accent. The palettes are #listed(colors.palettes.map(p => title-case(p.name))), listed in `palettes.dhall` and chosen with `data-palette`. Spacing, type, shape and motion are not part of a palette.]),
  ("Palette", "", "Prima", [The palette's hue, `--hue-accent`, from which its decor colors are made. The only token that knows which palette is in effect.]),
  ("Palette", "", "Mode", [Light or dark, chosen with `data-mode`. A mode chooses the lightness and chroma of every color of the palette.]),
  ("Palette", "", "Color configuration", [`src/styles/palettes.dhall`: the palettes, the decor colors and the intent colors. The top of the color hierarchy; nothing else holds a color value.]),
  ("Palette", "Decor", "Decor colors", [The colors a page is made of, made from the palette's hue: #listed(colors.decor.map(c => c.name)).]),
  ("Palette", "Decor", "Base", [The background of the page.]),
  ("Palette", "Decor", "Surface", [The color of anything raised from the background, such as a card or a panel.]),
  ("Palette", "Decor", "Accent", [The color the palette is named for, at full strength; the fill of the default variant and the focus ring.]),
  ("Palette", "Decor", "Pop", [A second accent, kept for critical emphasis: the fill of the primary variant and of selected text.]),
  ("Palette", "Intent", "Intent colors", [The colors that report the intent of what they mark: #listed(colors.intent.colors.map(c => c.name).sorted()). Each has its own hue, the same in every palette, and a tint, the color washed into the base. Not to be confused with semantic tokens, the token level L2.]),
  ("Palette", "Intent", "Danger", [Something destructive, or something that failed: a wrong answer, an error.]),
  ("Palette", "Intent", "Informational", [A neutral notice: something to know, with nothing to do.]),
  ("Palette", "Intent", "Positive", [Success or confirmation: a right answer, a saved change.]),
  ("Palette", "Intent", "Warning", [Caution: a risk that can still be reversed.]),
  ("Token", "", "Design token", [A CSS custom property of wacss, at one of the four levels. In this book, "token" alone always means a design token.]),
  ("Token", "", [_AI token_], [A unit of text read or written by a language model; the measure of an AI agent's cost. Unrelated to design tokens.]),
  ("Token", "Level", "Primitive token (L1)", [A literal: a base, a step, a ratio or a hue. Hues come from the color configuration; the rest are hand-written.]),
  ("Token", "Level", "Semantic token (L2)", [A token that gives a primitive a meaning or makes it the default for a CSS property. The palette's colors are written from the color configuration; the rest are hand-written.]),
  ("Token", "Level", "Channel token (L2)", [A hand-written token that says what a state does to a property.]),
  ("Token", "Level", "Component token (L3)", [A generated token holding one property of one variant of one component.]),
  ("Token", "Level", "State token (L4)", [A generated token holding one property of one variant of one component in one state.]),
  ("Component", "", "Element component", [A component selected by element name.]),
  ("Component", "", "Class component", [A component selected by a single class.]),
  ("Component", "", "Child", [A component given to another component as data, `{ component, data }`. A Table's cell, a Card's figure and an Accordion's section may each be one.]),
  ("Component", "", "Category", [What a component is for: #listed(vocabulary.categories.map(c => c.name)), each defined in `vocabulary.dhall` (#link(<using:categories>)[categories]). A component may be in more than one.]),
  ("Component", "", "Part", [A set of descendant elements a component styles with tokens of its own, such as a Table's cells or a Slider's thumbs. Declared in the schema's `parts`.]),
  ("Component", "Property", "Themable property", [A CSS property whose value is controlled by tokens.]),
  ("Component", "Property", "Structural property", [A CSS property with a fixed value the component needs in order to work.]),
  ("Component", "Variant", "Variant", [A role a component can play, such as `primary`. The default variant is `secondary`.]),
  ("Component", "Variant", "Color role", [What a variant's colors are: one of #listed(vocabulary.roles.keys().map(raw)). Defined in `vocabulary.dhall` by the value each color property takes.]),
  ("Component", "Variant", "Derived color", [A text, underline or border color, which a component makes from its own background by a template in `vocabulary.dhall`. There are no derived-color tokens above components.]),
  ("Component", "State", "State", [A condition a component can be in, such as `hover`. The default state is `static`.]),
  ("Component", "State", "Channel", [The set of properties a state changes.]),
)

// How many rows from index i on share the value that key(entry) gives.
#let run(i, key) = {
  let n = 1
  while i + n < entries.len() and key(entries.at(i + n)) == key(entries.at(i)) { n += 1 }
  n
}

#table(
  columns: (auto, auto, auto, 1fr),
  [Group], [Subgroup], [Term], [Meaning],
  ..entries.enumerate().map(((i, (group, sub, term, meaning))) => {
    let cells = ()
    // A group's cell, and a subgroup's within it, is written on the first of its rows and spans them.
    if i == 0 or entries.at(i - 1).at(0) != group {
      cells.push(table.cell(rowspan: run(i, e => e.at(0)), strong(group)))
    }
    if i == 0 or entries.at(i - 1).at(0) != group or entries.at(i - 1).at(1) != sub {
      cells.push(table.cell(rowspan: run(i, e => (e.at(0), e.at(1))), sub))
    }
    cells + (term, meaning)
  }).flatten(),
)

In token names, `<component>`, `<variant>`, `<property>` and `<state>` are
placeholders; the words "variant" and "state" never appear in a name.
