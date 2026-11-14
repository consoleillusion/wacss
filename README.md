# wacss

A high-level, data-driven component library with a single global, token-driven stylesheet. Pass data, get a complete accessible UI.

The **wa** comes from **和 (wa)**: harmony, balance, and conformity within a group. Here that means harmony with users, developers, and web standards. The design draws on Japanese Wabi-Sabi and Western editorial minimalism.

The library follows globally recognised accessibility standards, is pleasant for users, and is frictionless for developers. It styles elements rather than classes, and it encourages real semantic HTML over invented classes. JavaScript is used only where accessibility needs it.

## 1. Philosophy

Each aesthetic principle is paired with how it shapes the library.

| Principle | Meaning | In practice |
|---|---|---|
| **Wa (和)** | Harmony with users, developers, and standards | Use native browser behaviour and platform conventions. Be accessible by default. Keep the public surface small. |
| **Kanso (簡素)** | Simplicity; remove what is unnecessary | Classless styling, semantic HTML, few tokens edited at the right level. Clarity over decoration. |
| **Ma (間)** | Space, interval, timing | Whitespace is an active element that creates rhythm and hierarchy. |
| **Fukinsei (不均斉)** | Asymmetry | Balance without mirror symmetry; layouts need not be uniform. |
| **Shizen (自然)** | Naturalness | Intrinsic sizing, soft borders and shadows, organic motion. |
| **Kokō (古高)** | Weathered grace | Faded, mature surfaces that feel enduring rather than pristine. |
| **Yūgen (幽玄)** | Beauty felt more than seen | Suggestion over statement; restrained colour. |
| **Datsuzoku (脱俗)** | Freedom from convention | Occasional quiet surprises that stay graceful. |
| **Shibui (渋い)** | Restrained depth | Understated beauty that reveals itself over time. |
| **Seijaku (静寂)** | Energized calm | Nothing moves without purpose; the result is a quiet the reader can rest in. |

**Hidden detail** (Yūgen, Shibui, Datsuzoku): small discoveries that reward attention, such as swatch names appearing on hover.

## 2. Design rules

### Markup and semantics
- **Semantic HTML5** Good HTML should need little CSS and little extra markup.
- **Stick to HTML5 where possible, but priorize usability and user joy.** Target base elements, input types, and standard attributes.
- **Classless as much as possible.** Style native elements, not utility or component classes. Use css classes for a component when no semantic HTML element exists, for example, a card. In this case use a simple ".card" class.
- **Select by tag, then ARIA or HTML state, then plain attributes.** Use `[data-*]` only when no semantic equivalent exists and styling the base element would break semantic best practice.
- **Prefer native mechanics.** For example, an accordion is `<details>/<summary>` with CSS-only animation.
- **Buttons show state, not actions** So when a light theme is applied, the icon should be a sun, when a dark theme is applied, the icon should be a moon. When a button is on, the icon should have a semantic color of being on and its label should display it is on. 
- **Use generous Spacing and subdued colors**

### Accessibility
- Accessibility is part of the system, not an enhancement. Meet global standards by default.

### Styling
- **One global stylesheet.** SCSS in `src/styles/**` builds to `dist/wacss.css`. No Tailwind, and no scoped `<style>` blocks in Astro where possible, Svete elsewhere.
- **Tokens, not overrides.** Customise through variables rather than increasingly specific selectors.
- **Compact SCSS.** Generate scales and families (spacing, radius 1–12, themes) with loops, maps, and mixins.
- **Intrinsic web design and modern CSS.** Components size to their content and layouts reflow without special logic.
- **Layouts** Try to learn from Heydon Pickerings simple layout rules.
- **Match shadcn-svelte** in default look and behaviour, using wacss's own SCSS and tokens.

### Colour
- Desaturated, earthy, muted palettes with a neutral foundation and limited accents that carry meaning.
- **Don't declare colour ramps.** Derive variations with `color-mix()`, `calc()`, `pow()` or  other css functions.
- **Don't declare space or any other kind of repetitive tokens**. dont declare radius1-12. Instead define one radius and derive everything from that in heirarchical tokens.

### Motion and surfaces
- Motion communicates state or interaction. It is smooth, measured, quiet, and never distracting.
- Borders and shadows are soft and subtle.

### JavaScript
- Use CSS whenever it can do the job. Use JS only for accessibility behaviour that CSS cannot provide.

### Component API
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

## 3. Token hierarchy

Styling is a strict five-layer chain. Each layer may reference **only itself and its immediate predecessor** — no layer ever skips a level.

| # | Layer | Source | Holds |
|---|---|---|---|
| 1 | **Primitive** | `_primitives.scss` (hand-written) | Raw literals only — hues, type scale, space, radius, shadow, motion. No `var()`, ever. |
| 2 | **Semantic** | `_semantic.scss` (hand-written) | Meanings built from L1 (and same-domain primas): `--color-base`, `--color-accent`, `--font-body`, `--space-unit`, … |
| 3 | **Component** | `_component.scss` (hand-written) + `_component-source.scss` (generated) | Component anatomy built from L2 only: `--button-background`, `--card-radius`, `--dialog-padding`. The generated file adds `--<semantic>-source` aliases so L4 can reach semantic values without skipping. |
| 4 | **Role** | `_role.scss` (generated) | One `-role` token per layer-3 property/state pair: `--button-background-static-role`, `--button-background-hover-role`. |
| 5 | **State** | `_state.scss` (generated) | The final per-state token: `--button-background-static`, `--button-background-hover`, `--input-border-invalid`. |

The component schemas at `src/components/<Name>/schema.ts` are the source of truth for a component's **properties** and **states**. They contain **no CSS** — only declarations:

```ts
export const style =
{ properties:
  [ { property: "background", states: ["hover"] }
  , { property: "border" }
  , { property: "color", states: ["hover"] }
  , { property: "radius" }
  // …one entry per CSS property the component receives
  ]
, states: ["static", "hover"]
} as const;
```

Each property may declare the states it changes in (`static` is implicit). The generator validates that property and L3 token declarations agree exactly, then emits L4 roles and L5 state tokens from the schema. `_component-source.scss`, `_role.scss`, and `_state.scss` are generated; hand edits are lost on rebuild.

### Reference rules

- **Strict adjacency:** L1 holds literals only; L2 → {L1, L2}; L3 → {L2, L3}; L4 → {L3, L4}; L5 → {L4, L5}. A reference that skips a layer (`L5 → L3`, `L3 → L1`, …) is a build error.
- **Rendered styles consume layer 5 tokens only.** Static (no-condition) styles consume the `-static` twin; interactive states consume the layer-5 token carrying the state name.
  ```css
  button       { background: var(--button-background-static); }
  button:hover { background: var(--button-background-hover); }
  ```
- **Layer-5 state words are a closed set:** `static`, `hover`, `focus`, `active`, `disabled`, `selected`, `checked`, `invalid`, `open`, `highlighted`, `pressed`, `current`, `loading`. Every layer-5 token name ends in one of these.
- **States are declared per property.** A non-colour property that never changes (a size, a radius, a padding) declares no states and gets only a `-static` twin, so no nonsensical values such as `--checkbox-size-checked`.
- **Variants live in component CSS.** Button (`primary`, `secondary`, `destructive`, `link`), Badge and Alert resolve their variants to layer-5 tokens through local custom properties. No per-variant global tokens are generated.
- **Themes are attribute-only:** `[data-theme="light"|"dark"]` and `[data-palette="sakura"|"matcha"|…]` on `<html>`. There are no `.theme-*` classes.
- **Mangling applies to L3–L5 only.** `dist/wacss.css` is the readable expanded sheet; `dist/wacss.min.css` is minified with L3–L5 custom-property names mangled. L1 and L2 names stay readable in both outputs.
- `bun run verify:tokens` enforces all of the above mechanically: strict adjacency, the L5 state set, L5-only consumption by rendered styles, and no raw literals outside L1.

### Example

```scss
/* L1 — primitive: raw literals */
--color-dark-sumi: oklch(60% 0.01 260deg);
--space-step: 0.25rem;

/* L2 — semantic: meanings from L1 */
--color-accent: var(--color-dark-sumi); // prima
--color-base-light: oklch(from var(--color-accent) 18% 0.01 h);
--color-border: color-mix(in oklch, var(--color-text) 15%, transparent);
--space-unit: var(--space-step);

/* L3 — component: anatomy from L2 */
--button-background: color-mix(in oklch, var(--color-text) 8%, var(--color-clear));
--button-padding-inline: calc(var(--space-unit) * 4);

/* L4 — role: generated from L3 */
--button-background-static-role: var(--button-background);
--button-background-hover-role: color-mix(in oklch, var(--button-background-static-role), var(--color-text-source-role) 12%, var(--color-clear-source-role));

/* L5 — state: generated from L4 */
--button-background-static: var(--button-background-static-role);
--button-background-hover: var(--button-background-hover-role);
```

## 4. Themes

| Theme | Description |
|---|---|
| **Matcha (抹茶)** | Fresh green from powdered green tea; natural vibrancy, clean and balanced. |
| **Sakura (桜)** | Delicate cherry-blossom pink; light, warm, welcoming. |
| **Sumi (墨)** | Ink black, as in Japanese calligraphy. |
| **Aizome (藍染)** | Indigo-dyed blues; traditional textiles, refined and timeless. |
| **Kurenai (紅)** | Vivid crimson; energetic and confident. |
| **Yakisugi (焼杉)** | Charred wood; deep black and smoky grey, rustic and minimalist. |

## 5. Components

| Group | Components |
|---|---|
| Blocks | Navbar, Gallery |
| Input | Form (declarative, from a JSON Schema), Checkbox, Input, Number Input, Password Input, Date Picker, Button, Close Button, Icon Button, Switch |
| Display | Avatar, Badge, Card, Image, Data List, Icon, Table, Tag, Accordion, Breadcrumb, Carousel, Tabs, Blockquote, Code Block, Link |
| Media (required, with schemas) | Video, Image, Audio, using links that actually work |

### Card

A data-driven surface for presenting content. Placing a component in a card needs no per-instance logic.

**Props**

| Prop | Content |
|---|---|
| Header | The card's title. |
| Text | Body text below the figure. For showcase cards, it comes from the component's schema (`schema.description`) and appears nowhere else in the card or page. |
| Figure | Data matching any wacss component schema, recognised by its `title` property. Video, Image, and Audio are the common cases. The figure renders that component inside the card. The figure should be a portrait aspect ratio and have a fixed height. The width of the figure should be the full width of the card. no padding. It should take 3 / 7 of the card height. The body should take 4/7 of the card height. The card is 4 units high and 3 units wide. The figure should be vertically and horizontally centered|

**Behaviour when linked to a component page**
- Text stays selectable and shows the text cursor. The pointer cursor is reserved for following the link.
- Figure controls still work (for example, pausing a video does not follow the link).

**Home-page layout**
- Cards sit in a full-width `.grid`, intrinsically sized so it reflows on resize or drawer toggle without special logic.
- Each card has a header, a figure containing one component, and its schema description below.

```scss
.card {
  width: 30rem;
  display: grid;
  grid-template-rows: 1fr 1fr;
  aspect-ratio: 3 / 4;
  overflow: hidden;
}

.card__figure {
  min-height: 0;
  margin: 0;
}

.card__figure img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card__content {
  min-height: 0;
  padding: 1.5rem;
  box-sizing: border-box;
}
.card__figure  { order: 1; }
.card__content { order: 2; }
```

## Accordion

It's now possible to do pure css accordions with smooth css animations, so do it that way.

```scss
details {
  interpolate-size: allow-keywords;
  overflow: clip;
}

details summary {
  display: block;
  cursor: pointer;
  position: relative;
}

details[open]::details-content {
  height: auto;
}

details::details-content {
  height: 0;
  overflow-y: clip;
  transition: content-visibility 475ms allow-discrete, height 475ms;
}
```

# UX Design Best Practices

A practical set of principles for building a consistent, accessible, and usable design system. These are primarily concerned with interface design rather than visual aesthetics alone.

## 1. Visual hierarchy

- Establish clear hierarchy: Users should immediately understand what is important, secondary, and tertiary.
- Use consistent typography: Limit the number of typefaces, weights, and sizes.
- Control visual density: Avoid presenting too much information at once.
- Use whitespace deliberately: Spacing should communicate relationships between elements.
- Maintain alignment: Align related elements to consistent edges and grids.
- Use contrast intentionally: Important elements should stand out without making everything compete for attention.
- Avoid unnecessary decoration: Every visual element should serve a functional or communicative purpose.
- Establish predictable sizing: Use a consistent scale for headings, body text, labels, and supporting text.

## 2. Color and contrast

- Use semantic colors: Colors should communicate meaning rather than merely provide decoration.
- Maintain sufficient contrast: Text and interactive elements must remain distinguishable from their backgrounds.
- Don't rely on color alone: Use icons, labels, patterns, or other indicators to communicate states.
- Limit accent colors: Reserve stronger colors for meaningful emphasis and interaction.
- Maintain consistency: The same semantic role should use the same color throughout the interface.
- Support light and dark themes: Both should be deliberately designed rather than simple color inversions.
- Distinguish surfaces: Use subtle differences in luminance, borders, or elevation to establish depth.
- Test color combinations: Check contrast across actual foreground/background combinations, not isolated palette values.

## 3. Navigation and information architecture

- Make navigation predictable: Users should not need to learn a new navigation model on every page.
- Use descriptive labels: Prefer familiar terminology over clever or ambiguous wording.
- Expose important destinations: Frequently used functionality should be easy to reach.
- Maintain orientation: Users should understand where they are within the application.
- Provide clear hierarchy: Group related navigation items logically.
- Avoid excessive nesting: Deep navigation structures increase cognitive overhead.
- Preserve navigation state: Avoid unnecessarily resetting filters, tabs, or navigation position.
- Provide contextual navigation: Breadcrumbs and local navigation can help users understand complex structures.

## 4. Interaction design

- Provide immediate feedback: Actions should produce visible confirmation of their effects.
- Make interactive elements identifiable: Users should be able to distinguish controls from static content.
- Use predictable interactions: Similar controls should behave similarly.
- Provide adequate target sizes: Controls should be comfortable to operate with a mouse, touch, or keyboard.
- Avoid ambiguous actions: Button labels should describe the action they perform.
- Prevent accidental actions: Destructive operations should require appropriate confirmation or provide undo functionality.
- Support keyboard interaction: Every interactive function should be accessible without a mouse.
- Preserve user input: Avoid losing entered data when navigating, refreshing, or encountering recoverable errors.
- Distinguish interaction states: Hover, focus, active, selected, disabled, and loading states should be visually distinct.

## 5. Forms and input

- Minimize required fields: Only request information necessary for the task.
- Use appropriate input types: Match controls to the data being collected.
- Label every field: Place clear, persistent labels near their corresponding controls.
- Don't rely on placeholders: Placeholders should provide examples or supplementary guidance, not replace labels.
- Validate appropriately: Validate input as early as practical without interrupting the user unnecessarily.
- Explain errors: State what went wrong and how to correct it.
- Preserve invalid input: Never erase a user's input because validation failed.
- Group related fields: Use logical sections to reduce cognitive load.
- Use sensible defaults: Prepopulate values when they can be safely inferred.
- Indicate required fields: Make optional and mandatory fields distinguishable.

## 6. Accessibility

- Use semantic HTML: Prefer native elements over custom interactive implementations.
- Support keyboard navigation: Ensure logical tab order and visible focus indicators.
- Use meaningful document structure: Headings, landmarks, lists, and labels should reflect the content hierarchy.
- Provide alternative text: Images conveying information need meaningful text alternatives.
- Respect text scaling: Interfaces should remain usable when users increase text size.
- Avoid motion dependency: Essential information must not depend on animation.
- Respect reduced motion: Support `prefers-reduced-motion`.
- Maintain sufficient contrast: Follow WCAG contrast requirements.
- Use accessible error messages: Associate errors with their corresponding form fields.
- Test with assistive technologies: Automated accessibility testing alone is insufficient.

## 7. Responsive design

- Design for content, not devices: Breakpoints should be determined by where the layout stops working.
- Use fluid layouts: Prefer flexible sizing over excessive fixed dimensions.
- Prioritize content: Smaller screens may require different information arrangements.
- Avoid horizontal overflow: Content should fit within the available viewport.
- Maintain usable controls: Touch targets and spacing should remain appropriate on mobile.
- Test intermediate widths: Don't only test desktop and mobile endpoints.
- Use responsive typography: Text should remain readable across viewport sizes.
- Account for orientation: Support both portrait and landscape where appropriate.

## 8. Feedback and system status

- Communicate loading: Long-running operations should provide progress or loading indicators.
- Confirm successful actions: Users should know when an operation has completed.
- Make errors actionable: Explain the problem and provide a recovery path.
- Distinguish system states: Empty, loading, success, error, and unavailable states should be considered.
- Avoid silent failures: Users should never have to guess whether an action worked.
- Use appropriate feedback mechanisms: Inline validation, notifications, dialogs, and status messages each have different purposes.
- Avoid unnecessary notifications: Don't interrupt users for inconsequential events.

## 9. Content and language

- Use plain language: Prefer understandable wording over technical terminology.
- Be concise: Remove information that doesn't help users complete their task.
- Maintain consistency: Use the same terminology for the same concepts.
- Write action-oriented labels: Prefer "Save changes" over "Submit".
- Avoid ambiguous messages: Clearly communicate consequences and expectations.
- Make important information scannable: Use headings, lists, and meaningful grouping.
- Write useful empty states: Explain why content is absent and what the user can do next.

## 10. Consistency and design systems

- Establish design tokens: Centralize colors, typography, spacing, borders, and other foundational values.
- Use reusable components: Avoid implementing the same interaction differently across the application.
- Separate semantics from implementation: Component styling should consume semantic tokens rather than hardcoded palette values.
- Define component states: Establish consistent hover, focus, active, disabled, and loading behavior.
- Document component contracts: Specify expected inputs, outputs, accessibility behavior, and constraints.
- Avoid unnecessary variants: Every component variant increases maintenance and testing costs.
- Establish naming conventions: Token and component names should describe their purpose.
- Maintain backward compatibility: Changes to shared components should not unexpectedly break existing interfaces.

## 11. Performance and perceived responsiveness

- Minimize unnecessary JavaScript: Prefer native browser functionality where possible.
- Optimize image delivery: Use appropriate formats, dimensions, and responsive sources.
- Prevent layout shifts: Reserve space for asynchronously loaded content.
- Prioritize critical content: Render useful content as early as possible.
- Avoid blocking interactions: Expensive operations should not freeze the interface.
- Use progressive enhancement: Core functionality should remain available when JavaScript fails or is unavailable.
- Keep animations purposeful: Animation should communicate transitions or relationships, not merely decorate.

## 12. User control and trust

- Make actions reversible: Provide undo or recovery wherever practical.
- Avoid dark patterns: Don't manipulate users into unwanted decisions.
- Make consequences explicit: Explain what happens before consequential actions.
- Respect user preferences: Honor theme, motion, language, and accessibility settings.
- Protect privacy: Collect only necessary information and explain its use.
- Avoid unnecessary account requirements: Don't force registration for functionality that doesn't require it.
- Provide data portability: Allow users to export their information where appropriate.
- Don't create artificial dependencies: Users should retain reasonable control over their data and workflows.

## 13. Usability testing and validation

- Test with actual users: Developer intuition is not a substitute for user observation.
- Test task completion: Measure whether users can accomplish their intended goals.
- Observe errors: Pay attention to hesitation, confusion, misclicks, and abandonment.
- Measure task efficiency: Consider time, steps, and cognitive effort.
- Test edge cases: Include empty data, long content, invalid input, and unexpected system states.
- Test across environments: Different browsers, screen sizes, input methods, and assistive technologies.
- Use analytics carefully: Quantitative metrics identify patterns but don't necessarily explain them.
- Iterate based on evidence: Prioritize actual usability problems over subjective aesthetic preferences.

## 14. Useful design standards and references

| Standard / Resource              | Purpose                           |
| -------------------------------- | --------------------------------- |
| Nielsen Norman Group             | Usability research and heuristics |
| WCAG 2.2                         | Accessibility requirements        |
| WAI-ARIA                         | Accessible interaction semantics  |
| Apple Human Interface Guidelines | Platform interface conventions    |
| USWDS                            | Government design system          |
| Inclusive Design Principles      | Inclusive interface design        |

Important: These are not all equally authoritative. WCAG is a normative technical standard; Nielsen Norman Group is a research and consultancy resource; Apple provides design-system guidance.

## 15. Core principles to prioritize

1. Clarity over decoration.
2. Consistency over novelty.
3. Accessibility by default.
4. Semantic meaning over arbitrary styling.
5. Predictability over cleverness.
6. User control over forced workflows.
7. Progressive enhancement over unnecessary complexity.
8. Content-first responsive design.
9. Feedback for every meaningful interaction.
10. Evidence-based decisions over aesthetic assumptions.


DO NOT construct scales like this!!! It's too bulky!
```scss
  --radius-1: 0.125rem;
  --radius-2: 0.25rem;
  --radius-3: 0.375rem;
  --radius-4: 0.5rem;
  --radius-5: 0.625rem;
  --radius-6: 0.75rem;
  --radius-7: 0.875rem;
  --radius-8: 1rem;
  --radius-9: 1.125rem;
  --radius-10: 1.25rem;
  --radius-11: 1.375rem;
  --radius-12: 1.5rem;
  --radius-pill: 9999px;
```

Use modern scss and construct like this
```
radius
```
