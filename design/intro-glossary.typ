= Glossary
<glossary>
#table(
  columns: 2,
  [Term], [Meaning],
  [Theme], [A named colour scheme — Kinari, Matcha, Ai or Shu — chosen with `data-palette`. Each has a light and a dark mode.],
  [Mode], [Light or dark, chosen with `data-theme`. A mode supplies four colours and four status colours.],
  [Base], [The background colour of a mode.],
  [Surface], [The colour of anything raised from the background.],
  [Accent], [The defining colour of a theme.],
  [Pop], [A second, alternative accent, kept for critical emphasis.],
  [Status colours], [The positive, warning, danger and informational colours of a mode.],
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
  [Part], [A component that exists only inside another component.],
  [Element component], [A component selected by element name.],
  [Class component], [A component selected by a single class.],
)

In token names, `<component>`, `<variant>`, `<property>` and `<state>` are
placeholders; the words "variant" and "state" never appear in a name.
