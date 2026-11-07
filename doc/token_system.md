# Token system
 
*File: `docs/03-tokens.md`. How styles are built and themed. Depends on Part 2.*
 
## The five-layer hierarchy
 
Styling is a strict five-layer chain. Only primitives hold real values, and each layer derives from the one above it.
 
| # | Layer | Name pattern | Holds | Examples |
|---|---|---|---|---|
| 1 | **Primitive** | `--<domain>-<name>` | Raw values: hues, type scale, space, radius, shadow, motion | `--color-aizome`, `--space-4`, `--radius-4`, `--motion-fast` |
| 2 | **Semantic** | `--<domain>-<x>` | Meanings built from primitives | `--color-base`, `--color-surface`, `--color-accent`, `--color-text`, `--color-border`, `--font-body` |
| 3 | **Component** | `--<component>-<property>` | Component anatomy built from semantic tokens | `--button-background`, `--button-radius`, `--card-radius`, `--dialog-padding` |
| 4 | **Role** | `--<component>-<property>-<role>` | Emphasis: Primary, Secondary, Tertiary, Standard | `--button-background-primary`, `--button-background-standard` |
| 5 | **State** | `--<component>-<property>-<role>-<state>` | Final per-state values: static, hover, active, focus, selected, open, disabled | `--button-background-standard-hover`, `--input-border-focus`, `--opacity-disabled` |
 
**Role notes**
 
- **Standard** aliases Secondary by default and is the choice when no special emphasis is wanted.
- **Primary** is the call-to-action style and uses the `pop` colour.
## Rules
 
1. Lower layers reference higher layers, never raw literals.
2. Rendered styles consume the family's final token for the affordance. Static styles use the role/component token; interactive affordances use layer-5 tokens, which always carry an actual state name (`hover`, `focus`, `active`, `disabled`, `open`) or `static` for the no-state value.
```css
   button       { background: var(--button-background-standard); }
   button:hover { background: var(--button-background-standard-hover); }
```
3. No token name may contain the word `state`.
4. Many token families, such as a colour theme, derive from a single higher-level token (the *prima* token for the domain).
5. Each domain (colour, spacing, radius, and so on) has a prima token on each layer, which the other tokens in the same category derive from.
6. **Paste-at-any-level theming:** replacing the tokens at any one layer restyles the whole interface coherently.
7. Light and dark values follow `prefers-color-scheme` by default. Set `data-theme="light"` or `data-theme="dark"` on `<html>` to override (persisted by the UI toggle).
8. `bun run audit:tokens` enforces this mechanically:
   - no token name contains "state";
   - every layer references only layers at or above it;
   - no raw literals outside layer 1.
## Reference implementation (colour and button)
 
```scss
$palettes: (
  sakura: oklch(62% 0.085 5),
  matcha: oklch(62% 0.075 140),
  sumi: oklch(60% 0.01 260),
  aizome: oklch(60% 0.075 250),
  kurenai: oklch(60% 0.095 25),
);
 
:root {
  /* primitive */
  @each $name, $color in $palettes {
    --color-dark-#{$name}: #{$color};
    --color-light-#{$name}: oklch(from #{$color} calc(l + .1) calc(c * .8) h);
  }
  --color-dark-well: #111111;
  --color-light-well: #fafafa;
 
  /* semantic */
  --color-well: var(--color-dark-well);
  --color-accent: var(--color-dark-sumi); // prima
  /* Neutral pillars: accent hue at ~1% chroma keeps text and surfaces near-neutral. */
  --color-base-light: oklch(from var(--color-accent) 18% 0.01 h);
  --color-base-light-inverse: oklch(from var(--color-base-light) clamp(0, calc(1 - l), 1) 0.01 h);
  @each $name, $color in $palettes {
    &[data-palette="#{$name}"] {
      --color-accent: var(--color-dark-#{$name});
    }
    &[data-palette="#{$name}"][data-theme="light"] {
      --color-accent: var(--color-light-#{$name});
    }
  }
 
  @media (prefers-color-scheme: light) {
    --color-base-light: oklch(from var(--color-accent) .97 0.01 h);
    --color-well: var(--color-light-well);
  }
  &[data-theme="light"] {
    --color-base-light: oklch(from var(--color-accent) .97 0.01 h);
    --color-well: var(--color-light-well);
  }
 
  --color-base: color-mix(in oklch, var(--color-base-light), var(--color-accent) 2%);
  --color-surface: color-mix(in oklch, var(--color-base), var(--color-base-light-inverse) 4%);
  --color-pop: oklch(from var(--color-accent) l calc(c + 0.01) calc(h + 15));
 
  /* component */
  --button-background: var(--color-accent); // prima
  --button-color: oklch(from var(--button-background) clamp(0, calc(1 - l), 1) 0.01 h);
 
  /* role */
  --button-background-standard: var(--button-background); // prima
  --button-color-standard: var(--button-color);
 
  /* state */
  --button-background-standard-static: var(--button-background-standard);
  --button-background-standard-hover: color-mix(in oklch, var(--button-background-standard), var(--color-base-light-inverse) 10%);
}
 
button       { background: var(--button-background-standard); color: var(--button-color-standard); }
button:hover { background: var(--button-background-standard-hover); }
```
 
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
