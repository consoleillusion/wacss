# Token system

*How styles are built and themed.*

## The five-layer hierarchy

Styling is a strict five-layer chain. Only layer 1 holds raw values, and each layer derives from **the layer immediately below it** — no layer skips a level.

| # | Layer | Source | Name pattern | Holds | Examples |
|---|---|---|---|---|---|
| 1 | **Primitive** | `_primitives.scss` (hand-written) | `--<domain>-<name>` | Raw literals only: hues, type scale, space, radius, shadow, motion | `--color-dark-aizome`, `--space-step`, `--radius`, `--motion-fast` |
| 2 | **Semantic** | `_semantic.scss` (hand-written) | `--<domain>-<meaning>` | Meanings built from layer 1 | `--color-base`, `--color-surface`, `--color-accent`, `--color-text`, `--color-border`, `--font-body` |
| 3 | **Component** | `_component.scss` (hand-written primas) + `_component-source.scss` (generated aliases) | `--<component>-<property>` | Component anatomy built from layer 2 | `--button-background`, `--button-radius`, `--card-radius`, `--dialog-padding` |
| 4 | **Role** | `_role.scss` (generated) | `--<component>-<property>-<state>-role` | One role per emitted layer-3 token, derived from L3 | `--button-background-static-role`, `--button-background-hover-role` |
| 5 | **State** | `_state.scss` (generated) | `--<component>-<property>-<state>` | Final per-state values, derived from L4 roles | `--button-background-static`, `--button-background-hover`, `--input-border-invalid` |

**Layer-3 hybrid file**

- `_component.scss` is hand-written: the base value of every declared property (`--<component>-<property>`), plus an explicit state value (`--<component>-<property>-<state>-value`) wherever the state cannot be derived from the base by a shared recipe.
- `_component-source.scss` is generated: one `--<semantic>-source` alias per semantic token the system needs at L3–L5, so recipes and L4 roles can reach semantic values without skipping a level.

**State recipes**

Deterministic derivations shared by every component:

| state | recipe |
|---|---|
| `hover` | base colour mixed 12% toward `--color-text` |
| `active`, `pressed` | base colour mixed 18% toward `--color-text` |
| `highlighted` | base colour mixed 8% toward `--color-text` |
| `focus` | `--color-ring` |
| `invalid` | base colour mixed 30% toward `--color-destructive` |
| `disabled`, `loading` | base colour unchanged |

A state that needs a value the recipe cannot produce must be declared explicitly in `_component.scss` as `--<component>-<property>-<state>-value`, and listed on that property in the schema.

**Emitted tokens**

For a property `background` on family `button` with no explicit state value, the generator emits:

```scss
/* L4 - role */
--button-background-static-role: var(--button-background);
--button-background-hover-role: color-mix(in oklch, var(--button-background-static-role), var(--color-text-source-role) 12%, var(--color-clear-source-role));

/* L5 - state */
--button-background-static: var(--button-background-static-role);
--button-background-hover: var(--button-background-hover-role);
```

Rendered styles consume the L5 tokens directly:

```css
button       { background: var(--button-background-static); }
button:hover { background: var(--button-background-hover); }
```

## Rules

1. **Strict adjacency.** Layer 1 holds literals only; layer 2 may reference `{L1, L2}`; layer 3 `{L2, L3}`; layer 4 `{L3, L4}`; layer 5 `{L4, L5}`. A reference that skips a level (`L5 → L3`, `L3 → L1`, …) or points upward is a build error.
2. **Rendered styles consume layer-5 tokens only.** Static (no-condition) styles use the `-static` twin; interactive states use the layer-5 token carrying the state name.
3. **The state set is closed:** `static`, `hover`, `focus`, `active`, `disabled`, `selected`, `checked`, `invalid`, `open`, `highlighted`, `pressed`, `current`, `loading`. Every layer-5 token name ends in one of these words.
4. **States are declared per property.** A component schema lists only the properties it receives (`background`, `padding-inline`, …) and the states each of those properties changes in. `static` is implicit. A property that never changes has no state tokens beyond `-static`.
5. **The schemas contain no CSS.** `src/components/<Name>/schema.ts` exports a named `style` object — `{ properties: [{ property, states? }], states: [...] }` — and a named `component` object (the component's public JSON Schema). The generator (`bun run emit:tokens`) emits layers 3–5 from those declarations and validates that both agree exactly: every declared property has an L3 token, every L3 family token is declared, and every declared state has an explicit L3 `-value` token or a shared recipe.
6. **Variants are presentation, not tokens.** Variants (Button `primary`/`secondary`/`destructive`/`link`, Badge variants, Alert variants) resolve to layer-5 tokens inside the component's CSS via local custom properties (`--button-variant-background`, …). They do not generate per-variant global tokens.
7. **Prima tokens.** Many token families derive from a single higher-level token — the *prima* — for the domain. `--color-accent` is the colour prima; `--space-step` is the spacing prima.
8. **Paste-at-any-level theming.** Replacing the tokens at any one layer restyles the whole interface coherently.
9. **Themes are attribute-only.** Light and dark values follow `prefers-color-scheme` by default. Set `data-theme="light"` or `data-theme="dark"` on `<html>` to override (persisted by the UI toggle). Palettes use `data-palette="<name>"`. There are no `.theme-*` classes.
10. `bun run verify:tokens` enforces the rules mechanically:
    - strict layer adjacency;
    - every layer-5 name ends in the state set;
    - rendered styles reference layer-5 tokens only;
    - no raw literals outside layer 1;
    - generated files are in sync with the schemas.

## Reference implementation (colour and button)

```scss
/* L1 — primitive: raw literals only */
--color-dark-sumi: oklch(60% 0.01 260deg);
--color-dark-aizome: oklch(60% 0.075 250deg);
--space-step: 0.25rem;

/* L2 — semantic: meanings from L1 */
--color-accent: var(--color-dark-sumi); // prima
--color-base-light: oklch(from var(--color-accent) 18% 0.01 h);
--color-base-light-inverse: oklch(from var(--color-base-light) clamp(0, calc(1 - l), 1) 0.01 h);
--color-base: color-mix(in oklch, var(--color-base-light), var(--color-accent) 2%);
--color-pop: oklch(from var(--color-accent) l calc(c + 0.01) calc(h + 15));

/* L3 — component: anatomy from L2 */
--button-background: color-mix(in oklch, var(--color-text) 8%, var(--color-clear));
--button-color: var(--color-text);
--button-border: var(--color-clear);
--button-radius: var(--radius-control);

/* L4 — role: generated from L3 */
--button-background-static-role: var(--button-background);
--button-background-hover-role: color-mix(in oklch, var(--button-background-static-role), var(--color-text-source-role) 12%, var(--color-clear-source-role));

/* L5 — state: generated from L4 */
--button-background-static: var(--button-background-static-role);
--button-background-hover: var(--button-background-hover-role);
```

```css
button       { background: var(--button-background-static); color: var(--button-color-static); }
button:hover { background: var(--button-background-hover); }
```

## Variants live in component CSS

```css
button[data-variant] {
  --button-variant-background: var(--button-background-static);
  background: var(--button-variant-background);
}
button[data-variant="primary"] {
  --button-variant-background: var(--color-pop-static);
}
```

Component variants reuse layer-5 tokens; no per-variant global tokens are generated.

## Component schema format

```ts
export const style =
{ properties:
  [ { property: "background", states: ["hover"] }
  , { property: "border" }
  , { property: "color", states: ["hover"] }
  , { property: "radius" }
  ]
, states: ["static", "hover"]
} as const;
```

`properties` is the list of CSS properties the component receives; each may list the states in which the property changes. `states` is the full list of states the component can be in (always including `static`). The file contains no CSS and no token names beyond the property stems; the generator resolves everything.

## Anti-pattern: bulky scales

**Do not** construct scales like this. Declare one prima value and derive the rest hierarchically.

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
