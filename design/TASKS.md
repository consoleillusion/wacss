# Tasks

## Working rules

- The book (`design/book.typ` and its chapters, one folder per part) is the specification. Build only what it states; when something it needs is not stated, ask before adding it.
- A component shows another component only by receiving it as data, `{ component, data }`. Inner elements that are not components are plain HTML, styled by element components and inheritance and arranged with layout helpers. There are no part components and no descendant rules.
- The build stops only where the CSS it writes would be broken. Add no other checks, rules or tests.
- Verify work by looking at it: the demo site in a browser, the book as rendered pages.

## Done

- [x] schema.dhall for Button, Card, Accordion (and their parts: AccordionTrigger, AccordionContent, CardFigure, CardBody)
- [x] Create primitive tokens (`src/styles/primitives.scss`)
- [x] Create semantic tokens (`src/styles/semantic.scss`)
- [x] Create channel tokens (`src/styles/channel.scss`)
- [x] Create generator for component tokens (L3: component × variant)
- [x] Create generator for state tokens (L4: from channels)
- [x] Create generator for CSS that consumes the tokens
- [x] Generate tokens for Button, Card, Accordion (`bun run generate:tokens`)
- [x] Button wraps bits-ui Button; Accordion wraps bits-ui Accordion; Card is Astro structure
- [x] Demo site as data (`src/site.ts`): navbar, palette toggle, palette picker, persistence, flash prevention
- [x] `/design`: token graph per component, live editing, copy and reset
- [x] Palettes chapter: one page per palette, drawn in that palette from rendered colours (`bun run palette-swatches`); square corners
- [x] Spec rewritten in four parts — Introduction, Architecture, Aesthetics, Components — describing the intended library, with unbuilt parts marked Planned
- [x] Four palettes (kinari, matcha, aizome, shu), each with a light and a dark mode: base, surface, accent, pop, plus four status colours per mode; text derived from base; every pair ≥ 4.5:1
- [x] Palettes moved into the primitive tokens; the book is typeset in its own Sage palette
- [x] Architecture specifies generation step by step, the stylesheet's rule order and layers, and every supported customisation
- [x] Palettes chapter states the rules for making a palette: anatomy, the four colours, origin, character, derivation, legibility
- [x] Shu (vermilion) replaces Sage as a palette; the book keeps its own Sage palette
- [x] Palette pages show two tints, two tones and two shades beside every colour
- [x] Aesthetics part describes the design only; commands and source listings live in Architecture
- [x] Children are passed as data (`{ component, data }`); the part components are gone. Accordion triggers are tertiary Buttons; Button draws a chevron when it has `aria-expanded` and turns it in the `open` state
- [x] Layout helpers `.box` (padding) and `.frame` (centred, clipped cell)
- [x] Card has one variant, on the surface colour
- [x] Build checks reduced to conditions that would break the generated CSS
- [x] Design page graph: laid out by inheritance, top to bottom, in the palette's colours; lines for every reference at any zoom; selecting a token highlights what it affects in the accent and what affects it in the pop
- [x] Corner radius comes from one L2 token, `--border-radius`
- [x] Accordion slides open and closed in CSS (grid row transition on the item; closed bodies stay mounted and inert)
- [x] `/component`: a grid of cards, one per component in its default variant, each linking to `/component/<name>`
- [x] `/component/<name>`: every variant in a card, the state selector, and the component's arguments
- [x] Design page: variants side by side without cards
- [x] One spec chapter per demo page in `design/demo/`; spec chapters in one folder per part
- [x] Default animation base duration 250 ms
- [x] Each palette's base and surface are derived from its accent (the prima) with CSS relative colour
- [x] Every property of every variant has a `static` state token; the CSS reads only state tokens
- [x] Colour roles: each schema maps its variants to a role; colour properties read `--<property>-<role>` (secondary Button = accent fill, Card and Accordion = surface); palette colours are `--palette-<role>`
- [x] Full L4 matrix: every property has a token in every declared state
- [x] "Palette" names a colour scheme and "mode" light or dark, everywhere: `data-mode`, `--palette-<role>`, `palette-swatches`, the Palettes chapter
- [x] Design graph highlights indirect relations in the muted text colour
- [x] Select component (native select, element component); the demo's palette, state and component selectors use it
- [x] Link, NavBar and Table components; the demo's bar is a NavBar and its arguments table a Table
- [x] Inputs: TextInput, NumberInput, DateInput, ColorInput, Checkbox, TextArea
- [x] Form: renders a form from a JSON Schema, with the form's standard attributes
- [x] Padding set in L2: controls 1ch by 1.5ch, blocks of content 2rem (`--padding`, read by `.box`)
- [x] Hover ring on every interactive component: the hover channel's box-shadow moves out to `--ring-gap` (0.125rem) as it fades in; Card has no ring
- [x] Selected text takes the pop everywhere (`::selection` in the reset)
- [x] Every palette's accent and pop share one lightness and chroma per mode (L1); palettes differ only in hue
- [x] Palette pages print each colour's exact oklch value (palettes-exact.json), not one measured back from 8-bit hex
- [x] Base and surface: light nearly neutral (0.985 / 0.995), dark a tinted grey (0.18 / 0.2, chroma 0.003 / 0.006), surface lighter in both; Shu a Japanese red (hue 22); StreetMap says when its tiles cannot load
- [x] TableCell element component (th, td): every table is ruled into rows; Table collapses its borders
- [x] StreetMap component: OpenStreetMap through Leaflet, with a centre, a zoom and markers
- [x] Hairline (`--color-border`) is a translucent neutral grey (`--hairline`) in every palette; Globe glows with its atmosphere on hover (oklab resting shadow, so it fades in without a dark flash; smaller in dark mode); its texture is requested when its script loads, shared by every globe
- [x] Card has no hover state (it is not interactive); Globe has no hover ring, and turns while its animation-play-state is running, which the hover channel sets
- [x] Globe hover colours from the palette: `--map-tone` (accent to pop) hue only, mixed in oklch with blue (sea) and green (land) at a 25% share, with chroma from L1 and lightness from L1 per mode (lighter in light, darker in dark) — trial
- [x] Globe timing from CSS: a turn takes its animation-duration (`--duration-turn`, 100 × base); speed changes follow the transition duration and easing
- [x] CodeBlock component (Shiki, palette syntax tokens, copy button) for every example on the component pages; Card hover is an accent border thickened by a box-shadow ring (no layout shift), through `stateValues`
- [x] Smoother `--easing`; card footers pushed to the foot (`.push` helper); Globe tilted right, with a texture of relief and sea depth
- [x] Component pages present a component as its book chapter does, live and unframed; shared vocabulary.dhall (variants, roles and their looks, categories)
- [x] Accents desaturated by 15% chroma, written in oklch; light surfaces lightened
- [x] Globe component: orthographic SVG, turned by dragging, by hover and by the arrow keys; `map` colour role; a role's own colour for a state (`--<property>-<role>-<state>`)
- [x] Badge component and `pressed` state; category filter of Badges above the component grid; `categories` in every schema
- [x] Component chapters laid out from each schema.dhall as the book compiles (Dhall plugin for Typst); descriptive text moved into the schemas
- [x] `current` state (aria-current), `.spread` helper, `--accent-color-<role>` and `--text-decoration-color-<role>` role tokens
- [ ] Demo pieces as library components: the token graph, its token nodes and lines, the token editor; then remove `src/demo/demo.scss`
- [x] The name is written "wacss", in lowercase, everywhere (What wacss is)
- [x] Introduction: prototyping with AI agents (fewer _AI tokens_, accuracy, assurance of coverage), distinguished from _design tokens_
- [x] No block capitals anywhere (Space, type and form); the book's fonts, labels and footer come from one file, `design/style.typ`, used by every page
- [x] Book footer on every page: "wacss specification · <part> · <chapter>", lowercase, from `design/style.typ`
- [x] Design Tokens Format (2025.10) export: `bun run export:tokens` writes `dist/dtcg/` (tokens, per palette-and-mode overrides, resolver)
- [x] Components part: full argument, state and property reference for Accordion, Button and Card
- [x] LineChart, BarChart and PieChart components, drawn by LayerChart in the palette's chart colours (`--chart-1` to `--chart-6`); a button no component styles is plain
- [x] Dark base and surface lightness 0.19 and 0.21, dark surface chroma 0.004; accent and pop chroma 0.005 lower; text selection in the pop
- [x] Palettes are data: `src/styles/palettes.dhall` lists each palette's name, kanji, hue and description; the generator writes the hues (`--hue-<palette>`), L2 chooses the prima `--hue-accent` and derives every colour from it; the pop is the hue turned `--pop-hue-offset`; status colours are shared by every palette; Sakura replaces Shu
- [x] Colour hierarchy configured in `palettes.dhall`: palettes (name, kanji, hue, description), the four colours (use, turn, lightness and chroma per mode) and the semantic colours (hue, use, one tone per mode); L1 hues, L2 `--hue-accent`, `--color-<colour>-<mode>` and `--color-<colour>`; no `--palette-*` or role tokens; roles' colour values in `vocabulary.dhall`; a component's text the inverse of its background; Sakura at hue 0, danger at 30; the Palettes chapter written from the configuration
- [x] No text or border tokens above components: text, underline and border are derived by each component from its own background (`derived` in `vocabulary.dhall`); the webpage is a component, Page (`body`, role base); L2 tokens that stand for text use `currentColor`

## Next

- [ ] Decide how the secondary variant shows the accent at full strength (today: ring, selection and border tint only)
- [ ] Package exports for stylesheet, tokens, schemas and components
- [ ] Card figure: hydrate interactive figure components (figures are server-rendered only)
- [ ] Contrast check in the build (currently checked by hand from design/palettes.json)
- [ ] Minified stylesheet with mangled L3/L4 names
- [ ] Remaining layout helpers if needed (sidebar, switcher, cover, reel)
- [ ] Next components, each with a schema.dhall and a bits-ui wrapper
- [ ] Form: fields for `object` and `array` properties (today they have none)
- [ ] `load-object` and `dhall-wasm` are GitHub dependencies; pin them to commits or publish them
