= Aesthetics in interface decisions
<aesthetics-in-practice>
The principles in #link(<philosophy>)[philosophy] are not a mood
board. Each one narrows a concrete choice: which colour gets the accent,
whether something should move, how much space a group needs, and where a
block sits on the page. They are tendencies, not laws. When a principle
conflicts with accessibility, clarity or observed user behaviour, the
latter wins (#link(<ux-and-accessibility>)[ux-and-accessibility]).

== Principle → decision map
<aesthetics-in-practice:principle--decision-map>
#table(
  columns: 5,
  [Principle], [Colour], [Animation], [Spacing], [Arrangement],
  [Wa 和],
  [One semantic role, one colour across palettes and themes],
  [The same state looks and moves the same way everywhere],
  [One shared rhythm],
  [A coherent composition, no one-off layouts],
  [Kanso 簡素],
  [One prima, derived neutrals, few accents],
  [Few properties move at once],
  [Few spacing values],
  [One clear primary path],
  [Ma 間],
  [Restraint leaves room for the accent],
  [Measured pacing between trigger and response],
  [Whitespace as structure],
  [Gutters and pauses in reading],
  [Fukinsei 不均斉],
  [Unequal emphasis, not uniform bands],
  [An occasional offset, never a loop],
  [Related but unequal gaps],
  [Balance without mirroring],
  [Shizen 自然],
  [Derived with CSS functions, not picked from ramps],
  [Natural deceleration, no mechanical bounce],
  [Fluid, intrinsic spacing],
  [Content-sized layouts that reflow],
  [Kokō 古高],
  [Matte, earthy, lived-in surfaces],
  [Quiet, never showy],
  [Comfortable rather than cramped],
  [Surfaces that age well],
  [Yūgen 幽玄],
  [Restrained chroma],
  [Detail revealed on interaction],
  [Space suggests more than it fills],
  [Suggest hierarchy instead of labelling it],
  [Datsuzoku 脱俗],
  [One unexpected accent inside a quiet palette],
  [One quiet surprise],
  [A deliberate break in rhythm],
  [An off-grid moment],
  [Shibui 渋い],
  [Depth through small tone steps],
  [Slow reveals where useful],
  [Layered spacing],
  [Layers discovered on use],
  [Seijaku 静寂],
  [Calm base; contrast only for meaningful activity],
  [Nothing moves without purpose],
  [Unhurried reading],
  [A single focal point],
)

== Colour
<aesthetics-in-practice:colour>
- #strong[Yūgen — say less with hue.] Base, surface and text sit close
  to neutral. Chroma is spent on the accents and status colours that
  carry meaning, so a quiet page makes the one active control legible.
- #strong[Shizen — derive instead of picking.] A palette begins with one
  prima (`--color-palette`), from which each theme derives its accent.
  Neutrals, tints, inks and borders are mixed with `oklch()` and
  `color-mix()` rather than chosen as colour ramps
  (#link(<semantic>)[semantic]). Change the prima and the whole
  composition shifts together, which is also Wa.
- #strong[Wa — meaning stays put.] A semantic token owns the same role
  in every palette and theme: primary, danger, focus and selection never
  swap hues between screens. Status surfaces mix in `oklab` so a green
  or red keeps its identity when tinted.
- #strong[Shibui and Kokō — depth without gloss.] Separate surfaces with
  small luminance steps, low-alpha borders and soft shadows. Avoid
  bright gradients, simulated highlights and pristine white; the aim is
  a mature surface that still looks considered after long use.
- #strong[Datsuzoku — one surprise.] An unexpected accent or hover
  detail is allowed, but only inside the restrained base, and never on a
  control that must be recognised instantly.
- #strong[Guardrail.] Restraint is not low contrast. Ink tokens are
  computed against their fill and the build checks WCAG 2.2 AA in both
  themes and all four palettes. Colour never carries state alone, so
  validity and selection also change a non-colour channel.

The colour decisions above live in the L2 meanings, variant tones and
interaction parameters (#link(<semantic>)[semantic]).

== Animation
<aesthetics-in-practice:animation>
- #strong[Seijaku — movement is a reply.] A transition explains
  something that changed: focus, disclosure, hover, loading, validation.
  No looping ambient effects, parallax or auto-playing content. If
  nothing changed, nothing should move.
- #strong[Ma — timing is an interval.] A brief, measured gap between
  trigger and response reads as deliberate rather than reflexive. The
  duration tiers – `--duration-interaction`, `--duration-surface`,
  `--duration-reveal` – give small changes immediate feedback and larger
  changes room to settle.
- #strong[Shizen — natural deceleration.] Ease out for direct
  manipulation, ease in and out for ambient or entrance changes.
  Transform and opacity carry the movement so it stays quiet; bounce,
  elastic and constant-speed motion feel mechanical.
- #strong[Yūgen, Shibui and Datsuzoku — discoveries, not announcements.]
  A swatch revealing its name on hover or a slow surface lift rewards
  attention without asking for it. The reveal is subtle, local to the
  element under attention, and never competes with content.
- #strong[Fukinsei — an occasional offset.] A small stagger can show
  that elements belong to a sequence. It is a one-shot detail, not a
  perpetual rhythm.
- #strong[Guardrail.] Essential information is never available only
  through motion. Durations are tokens, reduced motion is handled
  globally (#link(<layout>)[layout]), and every state remains visible
  when animation is removed.

== Spacing
<aesthetics-in-practice:spacing>
- #strong[Ma — space is a structural material.] Whitespace carries part
  of the message: more space between unlike groups, less within a group.
  The rhythm comes from one base and step, not a separate guess for
  every component.
- #strong[Kanso — a short scale.] Use few spacing values. If a gap needs
  a new value, reconsider the arrangement before adding one.
- #strong[Wa — hierarchy by proximity.] Consistent gaps make
  relationships legible before type or colour do, and the same alignment
  lines up across components and pages.
- #strong[Shizen — spacing that scales with content.] Component padding
  and gaps are in `em`, so a component inherits the size of its context;
  page spacing is in `rem`, so it stays stable. Fluid page helpers avoid
  breakpoint-specific gap values (#link(<tokens>)[tokens],
  #link(<layout>)[layout]).
- #strong[Seijaku — room to read.] Comfortable line height, a bounded
  measure and breathing room around text and controls. Whitespace gives
  attention somewhere to rest; it is not filler used to occupy a
  viewport.
- #strong[Guardrail.] Spacing must survive text scaling and keep targets
  usable. Small screens may compress gaps, but the grouping those gaps
  express stays the same.

== Arrangement
<aesthetics-in-practice:arrangement>
- #strong[Fukinsei — balance without mirroring.] Unequal column widths,
  offset headings, asymmetric margins and uneven grouping create
  interest. Baselines, gutters, alignment and reading order stay
  consistent, so the asymmetry reads as composition rather than
  disorder.
- #strong[Shizen — the content sets the shape.] Intrinsic helpers such
  as `.switcher`, `.sidebar`, `.grid` and `.center` reflow when the
  content needs room, rather than at device breakpoints
  (#link(<layout>)[layout]). Content is not cropped or truncated to
  preserve a grid.
- #strong[Wa — one composition.] A predictable primary path, repeated
  proportions and shared alignment make pages feel authored by one hand.
  The same holds across palettes and themes: only the intended accents
  change.
- #strong[Ma — negative space as composition.] Empty regions separate
  sections and mark pauses. The first viewport offers one focal point
  instead of a wall of equal elements; the rest can be found by reading.
- #strong[Yūgen and Shibui — layers.] Begin with surface and type. Let
  borders, elevation and small details appear on closer inspection
  rather than competing on first sight.
- #strong[Datsuzoku — one exception.] A deliberate off-grid block or
  horizontal reel is welcome when the surrounding system is strong
  enough that the difference reads as intention.
- #strong[Guardrail.] Source order matches visual order, navigation
  stays predictable, focus remains visible and responsive layouts
  preserve content priority. A surprising arrangement never means a
  surprising control.

== When principles pull against each other
<aesthetics-in-practice:when-principles-pull-against-each-other>
#table(
  columns: 2,
  [Conflict], [Decision],
  [Yūgen vs. legibility],
  [Raise ink/fill contrast, keep the palette muted; contrast is checked
  by the build.],
  [Datsuzoku vs. consistency],
  [Put the surprise in a detail or a section, never in a control, label
  or navigation model.],
  [Fukinsei vs. alignment],
  [Vary the composition, not the baselines, gutters or tab order.],
  [Ma vs. density and speed],
  [Keep the grouping clear, but do not push actions off-screen or shrink
  targets to protect whitespace.],
  [Shizen vs. structure],
  [Let content size itself; use structural literals where a fixed layout
  is required for the component to work (#link(<tokens>)[tokens]).],
  [Shibui vs. novelty],
  [Add depth that rewards use, not effects that demand attention.],
)

In short: colour, motion and spacing are expressed as L2 meanings and
component tokens, and arrangement is expressed through the hand-authored
layout helpers. Components consume those decisions; they do not restate
them.
