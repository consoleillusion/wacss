# wacss

A high-level, data-driven Svelte component library with a single global, token-driven stylesheet. Pass data, get a complete accessible UI.

The **wa** in `wacss` comes from **和 (wa)**: harmony, balance, and working with the grain of the web. The library favors web standards, accessibility, calm defaults, and a small public surface over configuration.

## Token hierarchy

Styling is a strict five-layer cascade. A layer may only reference the layer above it; component normal states use component tokens and interactive states use state tokens.

1. **Primitive** — raw values only: hues, type scale, space, radius, shadow, motion (`--color-zinc`, `--space-4`, `--radius-md`, `--motion-fast`).
2. **Alias** — semantic roles built from primitives (`--color-base`, `--color-surface`, `--color-accent`, `--color-text`, `--color-border`, `--font-body`, `--shadow-surface`).
3. **Component** — component roles built from alias tokens (`--background-button`, `--text-button`, `--radius-card`, `--padding-dialog`).
4. **Role** . Primary, Secondary, Tertiary, Standard. This is a layer that allows for emphasis. (`--background-button-standard`, `--background-button-primary`). Just use standard if you do not want any special emphasis. A standard button will be a reference to secondary by default. A standard button has standard styling. A primary button has call to action styling and the `pop` color.
5. **State** — hover, active, focus, selected, and disabled values derived from component tokens (`--background-button-hover`, `--ring-input-focus`, `--opacity-switch-disabled`).

```css
:root {
  /* primitive */
  --color-indigo: oklch(58.5% 0.19 275);

  /* alias */
  --color-accent: var(--color-indigo);
  --color-accent-text: var(--color-white);

  /* component */
  --background-button: var(--color-accent);
  --text-button: var(--color-accent-text);

  /* state */
  --background-button-hover: color-mix(in oklch, var(--background-button), var(--mix-color) 10%);
}

button {
  background: var(--background-button);
  color: var(--text-button);
}

button:hover {
  background: var(--background-button-hover);
}
```

Because every component style consumes these tokens, restyling the library means replacing one token set at `:root`. Light and dark values follow `prefers-color-scheme`; add the `light` or `dark` class to `<html>` to override.

## Attribute hooks

Semantic attributes (`aria-*`, `data-state`, `data-disabled`) come from the native elements or bits-ui. Visual hooks are namespaced as `data-wacss="..."` so they never collide with user content:

## Aesthetic direction

Calming, spacious, faded, and readable: muted palettes, gentle surfaces, subtle borders and shadows, and transitions that help usability without demanding attention. The default look follows shadcn-svelte; the token hierarchy is what makes it yours.

## Principles, Goals, and Purposes of wacss
Based on the codebase, established decisions, and the direction set in this project, the library aims to follow these principles and goals:
1. Data-driven, high-level (“one-line”) component APIs
- Goal: Components should be usable by passing data, not by assembling lots of markup or child components.
- Pattern: Provide fully rendered UI from props like items, options, tabs, values, jsonschema/uiSchema, media, component + data, etc. (e.g. `<Accordion items={...} />`, `<Tabs tabs={...} />`, `<Form jsonschema={...} />`, `<Card component="..." data={...} />`).
- Intent: Minimize boilerplate and imperative composition; favor declarative data/configuration over “500 attributes” or deeply nested wrapper components.
2. Global, classless-first styling (no Tailwind, no scoped component styles)
- Goal: All styling lives in global SCSS (src/styles/** → built to dist/wacss.css), not in Tailwind utilities or Svelte/Astro scoped `<style>` blocks.
- Intent: A single, coherent global stylesheet/theme that can style the interface consistently.
- Direction (in progress): Prefer semantic tags and ARIA/HTML state attributes for targeting; avoid data-* hooks where a tag or ARIA/semantic attribute expresses the same thing, and use plain (non-data-* ) attributes only where no semantic equivalent exists.
3. Strict, hierarchical design-token system (styling source of truth)
- Goal: All visual decisions flow through a disciplined token hierarchy so the UI is systematically themeable and consistent.
- Five levels (in order of derivation):
1. Primitive / global — real/raw values only; no references upward.
2. Alias / semantic — semantic meanings derived from primitives (e.g. background/foreground/primary/muted).
3. Component — component anatomy and base values derived from alias/semantic tokens.
4. Role — emphasis roles derived from component tokens (e.g. primary, secondary, tertiary, normal; normal aliases secondary).
5. State — finalized, state-specific tokens (default/hover/active/focus/disabled/selected/open, etc.) derived from role/component/alias/primitive.
- Rules/intent:
- Only primitives hold real values. Higher levels reference lower levels, never raw literals (except where structurally necessary during definition).
- All styling consumes finalized state tokens (the end of the chain) so appearance is controlled through the token system.
- No hierarchy confusion: each level has a clear responsibility and derivation direction.
4. Whole-interface theming by “paste-at-any-level” overrides
- Goal: A user should be able to paste/override a token set at any single level (primitives, alias/semantic, component, role, or state) and restyle the whole interface coherently.
- Intent: Make re-theming, branding, and customization simple and predictable without hunting through component CSS.
5. Compact, maintainable token definitions (SCSS-driven)
- Goal: Keep higher-level token files (and styling) concise and easy to modify with few changes.
- Means: Use SCSS features—loops, maps, mixins, and variables—to generate scales and families (e.g. spacing, radius 1–12, color ramps, theme maps) instead of repetitive hand-written declarations.
- Intent: Small edits at the right level should propagate broadly.
6. Visual and behavioral alignment with shadcn-svelte (without Tailwind)
- Goal: Default look-and-feel should match shadcn-svelte’s design language and component behavior as closely as practical.
- Constraint: Achieve that parity using the library’s own global SCSS and token system, not Tailwind classes or copied utility patterns.
7. Prefer native, simple, and accessible platform features
- Goal: Use built-in HTML/CSS capabilities when they satisfy the need, reducing JavaScript and complexity.
- Examples/intent:
- Accordion: native <details>/<summary> with CSS-only open/close animation (no JavaScript for toggling/animation).
- Leverage semantic elements, form controls, and ARIA/HTML states for behavior and styling hooks where appropriate.
- Purpose: Better accessibility, robustness, performance, and progressive behavior.
8. Built-in theming and user experience affordances
- Goal: Provide first-class, ready-to-use experience primitives.
- Examples/intent: Light/dark theme support with a top-right toggle, persisted preference (e.g. localStorage) and flash-prevention, and a consistent navbar/site chrome—all styled through the same token/global-SCSS system.
9. Consistent state, persistence, and interactivity model
- Goal: Value/stateful components behave predictably and can preserve user state where appropriate.
- Intent: Components support controlled/bindable values and, where relevant, optional persistence (e.g. storage keys/defaults) as part of a coherent interaction model.
10. Svelte and Astro compatibility as a component library
- Goal: Deliver components usable in Svelte and/or Astro contexts with a unified styling system and exports/types.
- Intent: One library (wacss) with shared tokens/CSS and component implementations appropriate to each environment (e.g. .svelte islands, .astro components where native/SSR-friendly).
11. Extensibility through structured data and registries (where needed)
- Goal: Enable rich composition without markup composition by resolving known building blocks from data.
- Intent: For cases like rendering named components or media from data, use explicit, library-controlled mappings/registries and typed schemas rather than ad-hoc embedded component trees.
In short: wacss aims to be a data-driven, globally themed, token-governed Svelte/Astro component library that achieves shadcn-like polish without Tailwind or scoped styles, favors native/accessible mechanics, and is designed so that changing values at the right token level (with compact, SCSS-generated definitions) can restyle the entire interface consistently.
12. Color ramps should not be declared. Instead, compoonents on a more applied level deviate from the more general level by using color-mix or calc functions.
13. Intrinsic Web Design styling principles and modern CSS.
14. Try to stick to HTML5 Standards. That means target base elements, types, attributes
15. Don't use [data-x] type selectors unless absolutely necessary, always try to style base elements unless it is not possible or breaks semantic html best practices.

## Card
Purpose / behavior
- A data-driven surface used to present content (e.g. on the home page in a grid), where placing components inside a card does not require special per-instance logic.
- The home page presents components in cards arranged in a grid (using the .grid layout, full-width, intrinsically sized so it auto-flows on resize/drawer without special logic). Each card contains one component shown in a figure.
- The card can link to its respective component page. While linked:
- Text remains selectable (cursor is the text-selection cursor over selectable text, not the pointer; pointer is for following the link).
- Figure interactions still work (e.g. you can pause/play a video inside the figure without the link following through).
Accepted props / content model
The card accepts:
1. Header
- The card’s heading/title content.
2. Text
- Descriptive/body text shown below the figure.
- For component showcase cards, this description must come from the component’s schema file (e.g. schema.description) and must not be duplicated elsewhere in the card/page markup.
3. Figure (encompasses the component/media)
- Takes data that has the schema of any wacss component.
- The schema of every wacss component is accepted (not just media).
- The passed schema/data is identified because it has a title property (the component/schema is recognized via that title).
- Especially common cases are Video / Image / Audio, but any wacss component schema is valid.
- The figure wraps/renders the component (e.g. a Video/Image/Audio player or another wacss component) inside the card.
Related component requirements given
- Video, Image, and Audio components must exist as wacss components (with schemas), preferably using links/sources that actually work.
- Their schemas are accepted by the card’s figure like any other wacss component schema.
Layout/presentation context (home page)
- Cards are laid out in a grid of component cards.
- Each card includes: a header, a figure containing one component, and description text below sourced from that component’s schema.
- Grid is full-width and intrinsically sized for automatic reflow (no special logic for drawers/resizing).


## Forms from JSON Schema

Declarative forms with jsonschema.

