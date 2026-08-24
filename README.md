# wacss

A semantic, token-driven, class-light CSS system and Astro component library inspired by Japanese Wabi-Sabi and editorial minimalism.

The **wa** in `wacss` comes from **和 (wa)**: harmony, balance, and working with the grain of the web. The library favors web standards, semantic HTML, accessibility, calm defaults, and small, maintainable code over flashiness.

## Status

**v0 (fresh start)**. This repository now contains a cohesive base:
- Global stylesheet source in `src/styles/` (no scoped Astro/Svelte styles)
- Standalone CSS outputs: `dist/wacss.css` and `dist/wacss.min.css`
- JS spec exports in `src/spec/`
- Thin Astro component wrappers in `src/components/`
- `src/islands/` reserved for Svelte islands only when native HTML is insufficient

## Principles

| Principle | Meaning | Implementation guidance |
|---|---|---|
| 和 Wa | harmony | Consistent semantics, accessible defaults, platform-friendly patterns. |
| 簡素 Kanso | simplicity | Fewer wrappers/elements; no utility-class API. |
| 間 Ma | negative space | Spacing is structural and tokenized; avoid spacer markup. |
| 不均斉 Fukinsei | asymmetry | Layouts may be naturally uneven; do not force artificial symmetry. |
| 自然 Shizen | naturalness | Use elements for what they mean (`button`, `nav`, `time`, `details`, etc.). |
| 渋い Shibui | restraint | Faded, muted palettes; subtle emphasis. |
| 幽玄 Yūgen | suggestion | Calm presentation; content can be brief and clear. |
| 脱俗 Datsuzoku | freedom | Break convention only deliberately, not by default. |
| 静寂 Seijaku | stillness | Motion is purposeful, subtle, and CSS-driven; respects `prefers-reduced-motion`. |

## What ships

- **CSS**: `dist/wacss.css` (readable) and `dist/wacss.min.css` (standalone). The CSS can be used without the components.
- **Astro components**: thin semantic wrappers in `src/components/`.
- **Svelte islands**: `src/islands/` for behavior that cannot be expressed well with native HTML. v0 uses native patterns first.
- **Schemas**: JSON Schema-shaped documentation contracts in colocated `schema.ts` files (e.g. `src/components/Button/schema.ts`), re-exported from `src/spec/index.ts`. Documentation info lives in the schema (descriptions, examples, and `x-wacss` metadata).

## Design contracts

### Semantic HTML first
- Prefer native elements and ARIA states before custom hooks.
- Do not use scoped styles in Astro/Svelte components. Styling comes from the global stylesheet.
- JavaScript/Svelte is used only when necessary; animation/transition behavior is handled in CSS/SCSS.

### Token hierarchy (global variables that bleed)
CSS custom properties are **unprefixed** and follow a strict hierarchy. Every applied value should trace back to `:root` tokens so a token set can reskin the interface.

1. **Primitive / global** — palette inputs and scales (e.g. `--color-*` primitives, `--mix-color`, type/space/radius/motion scales).
2. **Semantic / alias** — meaning roles (e.g. `--color-base`, `--color-surface`, `--color-accent`, `--color-pop`, `--color-text`, `--color-border`, `--color-positive`, `--color-neutral`, `--color-negative`).
3. **Component** — component roles defined from semantic tokens (e.g. `--button-background: var(--color-accent)`).
4. **State** — derived from component tokens and modern functions (e.g. `--button-background-hover: color-mix(in oklch, var(--button-background), var(--mix-color) 8%)`).

No hardcoded color ramps: states are derived (primarily `color-mix()` in OKLCH).

### Attribute hooks
Real `data-*` attributes may belong to user content, so wacss uses **vendor-prefixed** hooks only when ARIA/native semantics are insufficient:
- `data-wacss-palette="sakura|matcha"` selects a palette.
- Visual/non-semantic component hooks use `data-wacss-*` (e.g. `data-wacss-variant`, `data-wacss-badge`, `data-wacss-card`).

### Palettes and color scheme
- v0 palettes: **`sakura`** and **`matcha`**.
- Each palette supports light and dark values.
- `prefers-color-scheme` provides the default **dark** behavior (light is applied when the user prefers light).
- No mode override attribute in v0.

```html
<html data-wacss-palette="sakura">
  <!-- styles follow prefers-color-scheme by default -->
</html>
```

### Sizing
- Relative units are preferred (`rem`, `em` where flow-scaling makes sense).
- Prose measure uses `ch`.
- Fluid type/spacing may use `clamp()`.
- Modern CSS features (OKLCH, `color-mix()`, etc.) are acceptable; legacy-browser support is not a primary v0 constraint.

## v0 component starter set

| Area | Contract | Implementation |
|---|---|---|
| Base/prose | Global semantic elements, `ch` measure, calm rhythm | `src/styles/base/*` |
| Button | Native `<button>` for actions; do not fake buttons for navigation | `src/styles/elements/_button.scss`, `Button.astro` |
| Form basics | `label`, `input`, `textarea`, `select`, field help/error with ARIA associations | `src/styles/elements/_form.scss`, `Field.astro` |
| Table | Semantic table/caption/headers | `src/styles/elements/_table.scss` |
| Disclosure | Native `<details>/<summary>` | `src/styles/elements/_disclosure.scss`, `Disclosure.astro` |
| Nav | `<nav>` landmark with labeled navigation and `aria-current` | `src/styles/patterns/_nav.scss`, `Nav.astro` |
| Badge/Tag | Inline semantic element + `data-wacss-badge` | `src/styles/elements/_badge.scss`, `Badge.astro` |
| Card/Surface | Semantic `article`/`section` + `data-wacss-card` | `src/styles/patterns/_card.scss`, `Card.astro` |

## Development

Requires Bun.

```bash
bun install
bun run build
```

Build outputs:
- `dist/wacss.css`
- `dist/wacss.min.css`

## Project layout

```text
scripts/build.js      Bun build (Sass + Lightning CSS minify)
src/styles/           Global SCSS source (tokens, themes, base, elements, patterns)
src/spec/             Schema index (re-exports colocated schema.ts)
src/components/*/     Astro components + colocated schema.ts
src/islands/          Svelte islands (only when native HTML is insufficient)
dist/                 Built CSS
src/components/       Astro components (no scoped styles)
src/islands/          Svelte islands (only when native HTML is insufficient)
dist/                 Built CSS
```

## Aesthetic direction

Calming, spacious, faded, and readable. The visual language is a mixture of Wabi-Sabi restraint and editorial minimalism: muted palettes, gentle surfaces, subtle borders/shadows, and transitions that help usability without demanding attention.
