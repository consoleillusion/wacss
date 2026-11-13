# Design rules
 
*File: `docs/02-design-rules.md`. The normative rules for all code. Depends on Part 1.*
 
## Markup and semantics
 
- **Semantic HTML5.** Good HTML should need little CSS and little extra markup.
- **Stick to HTML5 where possible, but prioritise usability and user joy.** Target base elements, input types, and standard attributes.
- **Classless as much as possible.** Style native elements, not utility or component classes. Use a CSS class only when no semantic HTML element exists (for example a card), and then use a simple name such as `.card`.
- **Selector order: tag, then ARIA or HTML state, then plain attributes.** Use `[data-*]` only when no semantic equivalent exists and styling the base element would break semantic best practice.
- **Prefer native mechanics.** For example, an accordion is `<details>/<summary>` with CSS-only animation.
- **Buttons show state, not actions.**
  - A light theme shows a sun icon; a dark theme shows a moon.
  - A button that is *on* uses the semantic "on" colour and its label says it is on.
- **Generous spacing and subdued colours.**
## Accessibility
 
- Accessibility is part of the system, not an enhancement. Meet global standards by default (WCAG 2.2, WAI-ARIA; see Part 7).
## Styling
 
- **One global stylesheet.** SCSS in `src/styles/**` builds to `dist/wacss.css`. No Tailwind. No scoped `<style>` blocks in Astro where possible, and none in Svelte elsewhere.
- **Tokens, not overrides.** Customise through variables rather than increasingly specific selectors.
- **Compact SCSS.** Generate scales and families (spacing, radius, themes) with loops, maps, and mixins.
- **Intrinsic web design and modern CSS.** Components size to their content and layouts reflow without special logic.
- **Layouts.** Learn from Heydon Pickering's simple layout rules.
- **Match shadcn-svelte** in default look and behaviour, using wacss's own SCSS and tokens.
## Colour
 
- Desaturated, earthy, muted palettes with a neutral foundation and limited accents that carry meaning.
- **Don't declare colour ramps.** Derive variations with `color-mix()`, `calc()`, `pow()` or other CSS functions.
- **Don't declare space or any other repetitive scale as separate tokens.** Define one base value (for example one radius) and derive everything else from it in hierarchical tokens. See the anti-pattern in Part 3.
## Motion and surfaces
 
- Motion communicates state or interaction. It is smooth, measured, quiet, and never distracting.
- Borders and shadows are soft and subtle.
## JavaScript
 
- Use CSS whenever it can do the job. Use JS only for accessibility behaviour that CSS cannot provide.
## Component API
 
- **Data-driven, one-line usage.** Components render fully from props (`items`, `tabs`, `jsonschema`, `media`, `component` + `data`) instead of nested markup or long attribute lists.
```svelte
  <Accordion items={...} />
  <Tabs tabs={...} />
  <Form {jsonschema} action={...} />
  <Card component="..." data={...} />
```
- **Registries over component trees.** Named components and media resolve from library-controlled registries and typed schemas, never ad-hoc embedded trees.
- **Predictable state.** Value components are controlled or bindable and can optionally persist (storage key and default).
- **Built-in affordances.** Light/dark toggle (top right) with persisted preference and flash prevention, plus a consistent navbar, all styled through the same tokens.
