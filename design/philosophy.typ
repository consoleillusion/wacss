= Philosophy and aesthetic direction
<philosophy>
#emph[Wa] (和) means harmony, balance and belonging. In wacss it means
harmony between users, developers and web standards: native browser
behaviour, accessibility by default and a small public API.

The visual direction draws on Japanese wabi-sabi and Western editorial
minimalism.

== Visual defaults
<philosophy:visual-defaults>
- Spacious, clean and modern; generous whitespace.
- Desaturated, earthy, muted palettes on neutral foundations, with a
  limited set of accents that carry meaning.
- Strong contrast reserved for meaningful activity and interaction.
- Soft borders and shadows.
- Motion communicates state or interaction. It is smooth, measured,
  quiet and never distracting.
- Clear typography with few sizes and weights.
- Default component behaviour and proportions follow shadcn-svelte,
  built on wacss tokens.

== Principles
<philosophy:principles>
#table(
  columns: 4,
  [Principle], [], [Meaning], [In wacss],
  [Wa],
  [和],
  [Harmony],
  [Native behaviour, accessibility, a small API],
  [Kanso],
  [簡素],
  [Simplicity],
  [Few hand-authored tokens; one selector per component; nothing
  unnecessary],
  [Ma],
  [間],
  [Space and interval],
  [Whitespace and timing create rhythm and hierarchy],
  [Fukinsei],
  [不均斉],
  [Asymmetry],
  [Balance without mirror symmetry],
  [Shizen],
  [自然],
  [Naturalness],
  [Intrinsic sizing, soft edges, organic motion],
  [Kokō],
  [古高],
  [Weathered grace],
  [Mature, enduring surfaces rather than pristine ones],
  [Yūgen],
  [幽玄],
  [Felt more than seen],
  [Suggestion over statement; restrained colour],
  [Datsuzoku],
  [脱俗],
  [Freedom from convention],
  [Occasional quiet surprises],
  [Shibui],
  [渋い],
  [Restrained depth],
  [Beauty that reveals itself over time],
  [Seijaku],
  [静寂],
  [Energised calm],
  [Nothing moves without purpose],
)

== From principles to decisions
<philosophy:from-principles-to-decisions>
The principles are decision criteria, not decoration. They favour
derived, desaturated colour; motion that answers a state change; spacing
that carries hierarchy; and arrangements that balance without mirroring.
#link(<aesthetics-in-practice>)[Aesthetics in practice] shows how
each principle shapes colour, animation, spacing and arrangement, and
where accessibility or evidence overrides taste.

== Hidden details
<philosophy:hidden-details>
Yūgen, Shibui and Datsuzoku inform small discoveries that reward
attention, such as a palette swatch revealing its name on hover. They
are found, not announced, and never compete with content.

== Palettes
<philosophy:palettes>
#table(
  columns: 3,
  [Palette], [], [Character],
  [Sumi],
  [墨],
  [Ink black, as in calligraphy (default)],
  [Matcha],
  [抹茶],
  [Fresh, balanced green],
  [Sakura],
  [桜],
  [Delicate, warm pink],
  [Aizome],
  [藍染],
  [Refined indigo blue],
)

Every palette uses the same semantic and component tokens; only the
prima changes.
