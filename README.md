# wacss

A high-level, data-driven component library with a single global, token-driven stylesheet. Pass data, get a complete accessible UI.

The **wa** comes from **和 (wa)**: harmony, balance, and conformity within a group. Here that means harmony with users, developers, and web standards. The design draws on Japanese Wabi-Sabi and Western editorial minimalism.

The library follows globally recognised accessibility standards, is pleasant for users, and is frictionless for developers. It styles elements rather than classes, and it encourages real semantic HTML over invented classes. JavaScript is used only where accessibility needs it.

---

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

---

## 2. Design rules

### Markup and semantics
- **Semantic HTML is enough.** Good HTML should need little CSS and little extra markup.
- **Stick to HTML5.** Target base elements, input types, and standard attributes.
- **Classless by default.** Style native elements, not utility or component classes.
- **Select by tag, then ARIA or HTML state, then plain attributes.** Use `[data-*]` only when no semantic equivalent exists and styling the base element would break semantic best practice.
- **Prefer native mechanics.** For example, an accordion is `<details>/<summary>` with CSS-only animation.

### Accessibility
- Accessibility is part of the system, not an enhancement. Meet global standards by default.

### Styling
- **One global stylesheet.** SCSS in `src/styles/**` builds to `dist/wacss.css`. No Tailwind, and no scoped `<style>` blocks in Astro where possible, Svete elsewhere.
- **Tokens, not overrides.** Customise through variables rather than increasingly specific selectors.
- **Compact SCSS.** Generate scales and families (spacing, radius 1–12, themes) with loops, maps, and mixins.
- **Intrinsic web design and modern CSS.** Components size to their content and layouts reflow without special logic.
- **Match shadcn-svelte** in default look and behaviour, using wacss's own SCSS and tokens.

### Colour
- Desaturated, earthy, muted palettes with a neutral foundation and limited accents that carry meaning.
- **Never declare colour ramps.** Derive variations with `color-mix()`, `calc()`, `pow()` or  other css functions.

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

---

## 3. Token hierarchy

Styling is a strict five-layer chain. Only primitives hold real values, and each layer derives from the one above it.

| # | Layer | Holds | Examples |
|---|---|---|---|
| 1 | **Primitive** | Raw values: hues, type scale, space, radius, shadow, motion | `--color-indigo`, `--space-4`, `--radius-md`, `--motion-fast` |
| 2 | **Semantic** | Meanings built from primitives | `--color-base`, `--color-surface`, `--color-accent`, `--color-text`, `--color-border`, `--font-body` |
| 3 | **Component** | Component anatomy built from semantic tokens | `--background-button`, `--text-button`, `--radius-card`, `--padding-dialog` |
| 4 | **Role** | Emphasis: Primary, Secondary, Tertiary, Standard | `--background-button-primary`, `--background-button-standard` |
| 5 | **State** | Final per-state values: default, hover, active, focus, selected, open, disabled | `--background-button-hover`, `--ring-input-focus`, `--opacity-switch-disabled` |

**Role notes:**
- Standard aliases Secondary by default and is the choice when no special emphasis is wanted.
- Primary is the call-to-action style and uses the `pop` colour.

**Rules:**
- Lower layers reference higher layers, never raw literals.
- Rendered styles consume layer 5 (final state tokens).
- Many token families, such as a colour theme, derive from a single higher-level token.
- **Paste-at-any-level theming:** replacing the tokens at any one layer restyles the whole interface coherently.
- Light and dark values follow `prefers-color-scheme` by default. Set `data-theme="light"` or `data-theme="dark"` on `<html>` to override (persisted by the UI toggle).
- Each domain(color, spacing, radius, etc) has a prima token on each layer, which the other tokens within the same category are derived from.


```scss
:root {
  /* primitive */
  --color-sakura: oklch(70% 0.15 5);
  --color-matcha: oklch(70% 0.15 140);
  --color-sumi: oklch(70% .01 260);

  /* semantic */
  --color-base-light: #111111;
  --color-base-light-inverse: oklch(from var(--color-base-light) clamp(0, calc(1 - l), 1) 0.05 h);
  @media (prefers-color-scheme: light) {
    --color-base-light: #fafafa;
  }
  &:[data-theme="light"]{
    --color-base-light: #fafafa;
  }
    
  --color-accent: var(--color-sumi); // prima
  --color-base: color-mix(in oklch, var(--color-base-light), var(--color-accent),5%);
  --color-surface: color-mix(in oklch, var(--color-base), var(--color-base-light-inverse), 5%);
  --color-pop: oklch(from var(--color-accent) l calc(c+.01) calc(h + 15));

  /* component */
  --button-background: var(--color-accent); // prima
  --button-color: oklch(from var(--button-background) clamp(0, calc(1 - l), 1) 0.05 h);

  /* role */
  --button-background-standard: var(--button-background); // prima
  --button-color-standard: oklch(from var(--button-background-standard) clamp(0, calc(1 - l), 1) 0.05 h);

  /* state */
  --button-background-standard-hover: color-mix(in oklch, var(--background-button-standard), var(--color-base-light-inverse), 10%);


}

button       { background: var(--button-background-standard); color: var(--text-button); }
button:hover { background: var(--button-background-standard-hover); }
```

---

## 4. Themes

| Theme | Description |
|---|---|
| **Matcha (抹茶)** | Fresh green from powdered green tea; natural vibrancy, clean and balanced. |
| **Sakura (桜)** | Delicate cherry-blossom pink; light, warm, welcoming. |
| **Sumi (墨)** | Ink black, as in Japanese calligraphy. |
| **Aizome (藍染)** | Indigo-dyed blues; traditional textiles, refined and timeless. |
| **Kurenai (紅)** | Vivid crimson; energetic and confident. |
| **Yakisugi (焼杉)** | Charred wood; deep black and smoky grey, rustic and minimalist. |

---

## 5. Components

| Group | Components |
|---|---|
| Blocks | Navbar, Gallery |
| Typography | Blockquote, Code Block, Link |
| Buttons | Button, Close Button, Icon Button |
| Date and time | Date Picker, Calendar |
| Forms | Form (declarative, from a JSON Schema), Checkbox, Input, Number Input, Password Input |
| Disclosure | Accordion, Breadcrumb, Carousel |
| Data display | Avatar, Badge, Card, Image, Data List, Icon, Table, Tag |
| Media (required, with schemas) | Video, Image, Audio, using links that actually work |

### Card

A data-driven surface for presenting content. Placing a component in a card needs no per-instance logic.

**Props**

| Prop | Content |
|---|---|
| Header | The card's title. |
| Text | Body text below the figure. For showcase cards, it comes from the component's schema (`schema.description`) and appears nowhere else in the card or page. |
| Figure | Data matching any wacss component schema, recognised by its `title` property. Video, Image, and Audio are the common cases. The figure renders that component inside the card. |

**Behaviour when linked to a component page**
- Text stays selectable and shows the text cursor. The pointer cursor is reserved for following the link.
- Figure controls still work (for example, pausing a video does not follow the link).

**Home-page layout**
- Cards sit in a full-width `.grid`, intrinsically sized so it reflows on resize or drawer toggle without special logic.
- Each card has a header, a figure containing one component, and its schema description below.

---

## 6. Open questions

Inconsistencies in the source notes that need a decision:

2. **State-token derivation.** One section says a layer references only the layer above it, and that state derives from component tokens. Another says state derives from "role/component/alias/primitive", and the example derives state from role. The chain should be role → state.
3. **Classless vs components.** Classless styling and a component library overlap. State when Svelte or Astro components are expected and when plain HTML should suffice.
