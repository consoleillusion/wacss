# Tasks

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
- [x] Demo site as data (`src/site.ts`): navbar, theme toggle, palette picker, persistence, flash prevention
- [x] `/components`: every variant, and every state in an accordion
- [x] `/design`: token graph per component, live editing, copy and reset
- [x] Themes chapter: one page per theme, drawn in that theme from rendered colours (`bun run theme-swatches`); square corners
- [x] Spec rewritten in four parts — Introduction, Architecture, Aesthetics, Components — describing the intended library, with unbuilt parts marked Planned
- [x] Four themes (kinari, matcha, ai, shu), each with a light and a dark mode: base, surface, accent, pop, plus four status colours per mode; text derived from base; every pair ≥ 4.5:1
- [x] Themes moved into the primitive tokens; the book is typeset in its own Sage palette
- [x] Architecture specifies generation step by step, the stylesheet's rule order and layers, and every supported customisation
- [x] Themes chapter states the rules for making a theme: anatomy, the four colours, origin, character, derivation, legibility
- [x] Shu (vermilion) replaces Sage as a theme; the book keeps its own Sage palette
- [x] Theme pages show two tints, two tones and two shades beside every colour
- [x] Aesthetics part describes the design only; commands and source listings live in Architecture
- [x] Components part: full argument, state and property reference for Accordion, Button and Card

## Next

- [ ] Decide how the secondary variant shows the accent at full strength (today: ring, selection and border tint only)
- [ ] Required-states check in the build (focusable → `focus`, disableable → `disabled`)
- [ ] Package exports for stylesheet, tokens, schemas and components
- [ ] Accordion content open/close animation (bits-ui exposes `--bits-accordion-content-height`)
- [ ] Card figure: hydrate interactive figure components (figures are server-rendered only)
- [ ] Contrast check in the build (currently checked by hand from design/themes.json)
- [ ] Minified stylesheet with mangled L3/L4 names
- [ ] Remaining layout helpers if needed (sidebar, switcher, cover, frame, reel, box)
- [ ] Next components, each with a schema.dhall and a bits-ui wrapper
- [ ] `load-object` and `dhall-wasm` are GitHub dependencies; pin them to commits or publish them
