= Glossary
<glossary>
#table(
  columns: 2,
  [Term], [Meaning],
  [Palette], [A named set of the themable colours, and only the colours — Kinari, Matcha, Aizome or Shu — chosen with `data-palette`. Each has a light and a dark mode. Spacing, type, shape and motion are not part of a palette.],
  [Mode], [Light or dark, chosen with `data-mode`. A mode supplies four colours and four status colours.],
  [Base], [The background colour of a mode.],
  [Surface], [The colour of anything raised from the background.],
  [Accent], [The defining colour of a palette.],
  [Pop], [A second, alternative accent, kept for critical emphasis.],
  [Status colours], [The positive, warning, danger and informational colours of a mode.],
  [_Design token_], [A CSS custom property of wacss, at one of the four levels below. In this book, "token" alone always means a design token.],
  [_AI token_], [A unit of text read or written by a language model; the measure of an AI agent's cost. Unrelated to design tokens.],
  [Primitive token (L1)], [A hand-written literal: a base, a step, a ratio or a colour.],
  [Semantic token (L2)], [A hand-written token that gives a primitive a meaning or makes it the default for a CSS property.],
  [Channel token (L2)], [A hand-written token that says what a state does to a property.],
  [Component token (L3)], [A generated token holding one property of one variant of one component.],
  [State token (L4)], [A generated token holding one property of one variant of one component in one state.],
  [Variant], [A role a component can play, such as `primary`. The default variant is `secondary`.],
  [State], [A condition a component can be in, such as `hover`. The default state is `static`.],
  [Channel], [The set of properties a state changes.],
  [Themable property], [A CSS property whose value is controlled by tokens.],
  [Structural property], [A CSS property with a fixed value the component needs in order to work.],
  [Child], [A component given to another component as data, `{ component, data }`.],
  [Element component], [A component selected by element name.],
  [Class component], [A component selected by a single class.],
)

In token names, `<component>`, `<variant>`, `<property>` and `<state>` are
placeholders; the words "variant" and "state" never appear in a name.
