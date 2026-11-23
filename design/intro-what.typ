= What wacss is
<what>
wacss is a component library for the web with a single, global
stylesheet. A component is given data and renders a complete, accessible
piece of interface. Everything about how it looks comes from design
tokens, and every token can be traced back to a small number of values
chosen by hand.

The name comes from 和, #emph[wa]: harmony, balance, belonging. The
library tries to keep three things in harmony: the people who use an
interface, the people who build it, and the web platform beneath them.

== The problem
<what:problem>
A typical design system grows one component at a time. Each component
makes its own decisions about colour, spacing and behaviour, and the
system's consistency depends on everyone remembering to make the same
decisions in the same way. Gaps appear where nobody looked: a combination
of states that was never styled, a hover colour that differs from one
control to the next, a page that quietly adds its own CSS to fix
something. Over time the system describes less and less of the interface
it is meant to govern.

== The approach
<what:approach>
wacss starts from the other end. Each component declares, in one schema
file, exactly how it may vary: the roles it can play (its variants), the
conditions it can be in (its states), the CSS properties the design
system controls, and the fixed CSS it needs in order to work. A generator
reads those declarations, together with a few dozen hand-written tokens,
and produces every token and every CSS rule the component needs.

Two consequences follow. First, a component's appearance is completely
determined by its schema and the hand-written tokens; there is nowhere
else for a decision to hide. Second, the design system is complete with
respect to what it declares: if a component can be in a state, the
system has already decided what that state looks like.

== Benefits
<what:benefits>
#table(
  columns: 2,
  [Benefit], [What makes it true],
  [Every declared combination is styled], [The generator produces a value for every variant a component declares in every state it declares. Nothing depends on someone remembering to write it.],
  [States combine cleanly], [Each state changes its own set of properties, defined once for the whole library (#link(<channels>)[channels]). A control that is hovered, focused and pressed shows all three at once.],
  [One source for each value], [Every value derives from the hand-written tokens. Changing one changes everything that depends on it and nothing else.],
  [Pages never carry styles], [Pages arrange components; the stylesheet styles them. wacss sits in cascade layers, so a product's own CSS can always take precedence without `!important`.],
  [Interfaces described as data], [Components take data rather than markup, and are built on native HTML and bits-ui, so semantics and keyboard behaviour come with them.],
  [A design that can be inspected], [Every token records what it is made from. The demo site draws the whole hierarchy and lets any token be edited live (#link(<demo>)[demo site]).],
)

== Direction
<what:direction>
The library begins with three components — Accordion, Button and Card —
and will grow until it covers a complete application interface. The
checks and outputs planned for the build are listed in
#link(<build:planned>)[build].

== How this book is organised
<what:organisation>
The #strong[Introduction] explains what wacss is, the principles it is
built on, its commitments to usability and accessibility, the demo site
and the vocabulary used throughout. #strong[Architecture] specifies the
machinery precisely enough to implement or extend it: the token
hierarchy, how tokens and CSS are generated, the component schema, and
how to customise the library. #strong[Aesthetics] describes the default
design — its intent, the themes, animation, and space, type and form —
every part of which is a token value and can be changed.
#strong[Components] documents the API of each component.
