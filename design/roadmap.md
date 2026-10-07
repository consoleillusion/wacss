# Roadmap to v1

v1 is the complete library: one generated, verified global stylesheet, the full component set, and the demo site. Work is staged so each milestone stands on its own. The token pipeline and verification are built before components; components are built in batches; the demo site follows the components and precedes the v1 release.

The first four components are **Accordion, Button, Card and Checkbox**. They are built in M4; the remaining components from the full list follow in M5.

## M0 — Spec baseline
- [x] Clear `design/open-questions.md`: remove the answered rows, and record the single remaining decision — add a WCAG contrast check to the build — in `design/build-and-verification.md` and `design/ux-and-accessibility.md`
- [x] Confirm the sequencing: start with Accordion, Button, Card and Checkbox, then the rest of the full set, then the demo site — all before v1
- [ ] Record the component folder contract: `<Name>.astro` and `schema.ts` required, `<Name>.svelte` optional for reactivity
- [ ] Resolve spec inconsistencies: L1/L2 authored in SCSS, card figure/body split of `3fr 4fr`, no size axis, exact `dist/` outputs
- [ ] Decide whether generated `dist/` files are committed; update `.gitignore` accordingly

## M1 — Foundation and tooling
- [ ] Reduce `package.json` to `build`, `tokens:show` and `test` scripts; keep Astro, Sass and Bun types; remove stale dependencies
- [ ] Install dependencies and commit the lockfile
- [ ] Set up strict `tsconfig.json` and environment types
- [ ] Add `src/tokens/types.ts`: `Meta`, variant/state unions, schema and override types
- [ ] Hand-author `src/tokens/primitives.scss` from `design/primitives.md`
- [ ] Hand-author `src/tokens/semantic.scss` from `design/semantic.md`: meanings, property defaults, variant tones, interaction parameters, light theme, four palettes
- [ ] Add helpers: minimal reset, `wacss-*` keyframes, global reduced-motion rule, ten layout classes from `design/layout.md`
- [ ] Compile SCSS and concatenate L1 + L2 into `dist/tokens.css`
- [ ] Add generated-file headers to every emitted file

## M2 — Generator
- [ ] Discover and load every `src/components/<Name>/schema.ts`
- [ ] Validate schemas: names, variants, states, `cssProperties` L2 defaults or overrides, `structure`/`pseudoElements` overlap, channels, `meta.types`
- [ ] Build the L3 → L4 → L5 name matrix, including pseudo-element matrices
- [ ] Infer bridges for recipes and overrides
- [ ] Generate L3/L4/L5 values from variant and state recipes, applying `tokens.ts` overrides
- [ ] Emit component CSS: cascade layers, base/state/variant/pseudo rules, `:where()` selectors, channel-only properties, structural literals, omit empty rules
- [ ] Emit `dist/l3.css`, `l4.css`, `l5.css`, `tokens.css`, `wacss.css`, `wacss.min.css`, `tokens.json`
- [ ] Mangle L3–L5 names consistently in the minified CSS; keep L1/L2 readable
- [ ] Add `bun run tokens:show <component>` inspector

## M3 — Verification
- [ ] Integrate every schema, token, state and CSS check into `build` so there is no separate verify step
- [ ] Token checks: adjacency, references resolve, no cycles, exact matrix plus bridges, banned name segments
- [ ] State checks: disjoint co-occurring channels, non-empty channels
- [ ] CSS checks: only own L5 tokens, no literals outside `structure`, helpers use only L2, no class-name collisions
- [ ] Implement a colour resolver for the L2 subset: `oklch`, relative-colour syntax, `color-mix`, `calc`, `var`, alpha compositing
- [ ] WCAG contrast check on fill/ink pairs across both themes and all four palettes (4.5:1 normal text, 3:1 large text); fail the build on violations
- [ ] Bun tests for recipes, validation, colour resolver, contrast check and generated CSS
- [ ] Confirm a fresh `bun install && bun run build` passes from scratch

## M4 — Component foundation and the first four
- [ ] Add shared prop types and a registry for data-driven composition
- [ ] `Accordion`: schema + `.astro`; native `<details>`/`<summary>`, `::details-content`, static/open, no JavaScript
- [ ] `Button`: schema + `.astro`; element component, secondary/primary/tertiary/danger, hover/focus/active/disabled/loading
- [ ] `Card`: schema + `.astro`; `.card` class, explicit hover → `box-shadow`, `3fr 4fr` figure/body, figure registry
- [ ] `Checkbox`: schema + `.astro`; native input/label, checked/unchecked/focus/disabled; add `.svelte` only if reactivity is required
- [ ] Replace the stale component files; keep only what the new implementations use

## M5 — Remaining components (full set, before v1)
Each component gets a `schema.ts`, an `.astro` file, and a `.svelte` file only where native HTML and CSS cannot provide the required behaviour. Variants, states, properties and structure are chosen from the spec when each schema is written.

**Inputs and fields**
- [ ] `Input`
- [ ] `Textarea`
- [ ] `Label`
- [ ] `Field`
- [ ] `Select`
- [ ] `RadioGroup`
- [ ] `Switch`
- [ ] `Toggle`

**Value pickers**
- [ ] `Slider`
- [ ] `ColorInput`
- [ ] `ColorPicker`
- [ ] `DatePicker`

**Forms**
- [ ] `Form` — declarative generation from JSON Schema, after the field components exist

**Feedback and display**
- [ ] `Alert`
- [ ] `Progress`
- [ ] `Meter`
- [ ] `Tooltip`
- [ ] `Popover`
- [ ] `Avatar`

**Media**
- [ ] `Image`
- [ ] `Audio`
- [ ] `Video`
- [ ] `AspectRatio`
- [ ] `Webpage` — real, working links

**Navigation and structure**
- [ ] `Nav`
- [ ] `NavigationMenu`
- [ ] `Pagination`
- [ ] `Tabs`
- [ ] `Table`
- [ ] `Grid` — page-layout element only

**Data and diagrams**
- [ ] `DataTable`
- [ ] `PertChart`
- [ ] `NodeLinkDiagram` — last, since it depends on `tokens.json`; no bespoke token-graph UI before this point

## M6 — Packaging and documentation
- [ ] Define `package.json` `exports` and `files` for the stylesheet, tokens, types/schemas and components
- [ ] Rewrite `README.md` to describe the rebuilt library
- [ ] Document consumer usage: install, import the one stylesheet, retheme at L2, switch palettes, custom accent
- [ ] Add `CHANGELOG.md` and draft v1 release notes

## M7 — Demo site (before v1)
- [ ] Represent the site as data: pages with ordered children, per `design/demo-site.md`
- [ ] Add dynamic Astro routes and a consistent navbar
- [ ] Add the state-showing light/dark toggle in the top-right corner, with persisted theme and palette and no flash on load
- [ ] Build the data-driven home page from component cards and their schemas
- [ ] Build a component page for every component in the full set, including `NodeLinkDiagram` once M5 completes
- [ ] Check the demo with the same lint/build gate as the library

## M8 — v1 release
- [ ] Final clean verification: fresh install, build, tests, demo build
- [ ] Confirm every documented component and helper is present
- [ ] Tag v1 and publish release notes

## After v1
- [ ] Pass-through token pruning, gated on computed-style equivalence
- [ ] Extended browser and assistive-technology testing with real users
