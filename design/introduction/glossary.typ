= Glossary
<glossary>
#table(
  columns: 2,
  [Term], [Meaning],
  [Palette], [A hue, named, from which every themable colour is derived — Kinari, Matcha, Aizome or Sakura, listed in `palettes.dhall` — chosen with `data-palette`. Each has a light and a dark mode. Spacing, type, shape and motion are not part of a palette.],
  [Mode], [Light or dark, chosen with `data-mode`. A mode chooses the lightness and chroma of each colour: the palette's four and the four intent colours.],
  [Prima], [The palette's hue, `--hue-accent`, from which every colour of the palette is made. The only token that knows which palette is in effect.],
  [Colour configuration], [`src/styles/palettes.dhall`: the palettes, the four colours every palette has, and the intent colours. The top of the colour hierarchy; nothing else holds a colour value.],
  [Base], [The background colour of a mode.],
  [Surface], [The colour of anything raised from the background.],
  [Accent], [The defining colour of a palette.],
  [Pop], [A second, alternative accent, kept for critical emphasis.],
  [Intent colours], [Positive, warning, danger and informational: the colours that report the intent of what they mark, each with its own hue, the same in every palette. Not to be confused with semantic tokens, the token level L2.],
  [_Design token_], [A CSS custom property of wacss, at one of the four levels below. In this book, "token" alone always means a design token.],
  [_AI token_], [A unit of text read or written by a language model; the measure of an AI agent's cost. Unrelated to design tokens.],
  [Primitive token (L1)], [A literal: a base, a step, a ratio or a hue. Hues come from the colour configuration; the rest are hand-written.],
  [Semantic token (L2)], [A hand-written token that gives a primitive a meaning or makes it the default for a CSS property.],
  [Channel token (L2)], [A hand-written token that says what a state does to a property.],
  [Component token (L3)], [A generated token holding one property of one variant of one component.],
  [State token (L4)], [A generated token holding one property of one variant of one component in one state.],
  [Variant], [A role a component can play, such as `primary`. The default variant is `secondary`.],
  [Colour role], [What a variant's colours are: `accent`, `pop`, `surface`, `base`, `clear`, `map` or a intent colour. Defined in `vocabulary.dhall` by the value each colour property takes.],
  [Derived colour], [A text, underline or border colour, which a component makes from its own background by a template in `vocabulary.dhall`. There are no derived-colour tokens above components.],
  [State], [A condition a component can be in, such as `hover`. The default state is `static`.],
  [Channel], [The set of properties a state changes.],
  [Themable property], [A CSS property whose value is controlled by tokens.],
  [Structural property], [A CSS property with a fixed value the component needs in order to work.],
  [Child], [A component given to another component as data, `{ component, data }`. A Table's cell, a Card's figure and an Accordion's section may each be one.],
  [Part], [A set of descendant elements a component styles with tokens of its own, such as a Table's cells or a Slider's thumbs. Declared in the schema's `parts`.],
  [Element component], [A component selected by element name.],
  [Class component], [A component selected by a single class.],
)

In token names, `<component>`, `<variant>`, `<property>` and `<state>` are
placeholders; the words "variant" and "state" never appear in a name.
