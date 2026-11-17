# Token system

The normative specification lives in [`wacss-docs/`](../wacss-docs/). This note is a short index; when it disagrees with the docs, the docs win.

Tokens follow a five-level hierarchy, from primitive values to fully resolved component states. You define L1 and L2 by hand. Everything above them is generated from component metadata by `scripts/emit-tokens.ts`.

| Level | Name pattern | Source | Derives from |
| --- | --- | --- | --- |
| L1 Primitive | `--<name>` | `src/tokens/primitives.ts` (hand-written) | nothing: literals only |
| L2 Semantic | `--<property>` | `src/tokens/semantic.ts` (hand-written) | L1 (and other L2) |
| L3 Component-property | `--<component>-<property>` | generated | L2 |
| L4 Variant | `--<component>-<property>-<variant>` | generated | L3 of the same component |
| L5 State | `--<component>-<property>-<variant>-<state>` | generated | L4 of the same component |

Generated output: `src/styles/tokens/l1-primitives.css` … `l5-state.css`, `src/styles/generated/{elements,components}.css`, `dist/tokens.css`, `dist/tokens.json`. Do not edit generated files; run `bun run build`.

The generator rejects any reference that skips a level, leaves a component's matrix, creates a cycle or uses a forbidden name segment.

## L1: primitives

Foundations, not ramps: a base plus a step (addition) or ratio (multiplication). For example `--space-base`/`--space-step`, `--border-radius-base`/`--border-radius-step`, `--font-size-base`/`--font-size-ratio`, `--mix-base`/`--mix-step`. Palette hues are single colours (`sumi`, `matcha`, `sakura`, `aizome`); theme variants are derived in L2.

## L2: semantic / default

1. **Design meanings:** `--color-accent` (the colour prima), `--color-surface`, `--color-text`, `--space`, `--font-size-ui`, `--shadow-overlay` and so on.
2. **Property defaults:** one `--<css-property>` per property a component can declare (`--background`, `--color`, `--border-color`, `--border-radius`, `--padding-block`, `--gap`, …). An L3 token with no override is `var(--<property>)`; the longest matching tail wins.
3. **Variant tones and interaction parameters:**
   - `--tone-<variant>`, `--tone-<variant>-ink`, `--tone-<variant>-surface`, `--tone-<variant>-surface-ink`
   - `--interaction`, `--mix-hover`, `--mix-highlighted`, `--mix-open`, `--mix-invalid`, `--ring`, `--selection`, `--selection-ink`, `--opacity-disabled`, `--scale-active`

Themes and palettes only change L2: `[data-theme="light"]`, `prefers-color-scheme`, `[data-palette="<name>"]`, or an inline `--color-palette` on the root.

## Component metadata

Each component's `schema.ts` exports `meta`, the only styling input:

```ts
export const meta =
{ name: "button"
, element: "button"
, cssProperties: ["background", "color", "border-color", "outline-color", "transform", "opacity", …]
, variants: ["secondary", "primary", "tertiary", "danger"]
, states: ["static", "hover", "focus", "active", "disabled"]
, structure:
    { static: { display: "inline-flex", cursor: "pointer" }
    , disabled: { cursor: "not-allowed" }
    }
} as const;
```

Variants: `secondary primary tertiary positive warning danger informational`.
States: `static hover highlighted focus active checked unchecked selected current pressed open invalid loading disabled`.

Styling that is not a component (reset, layout primitives, keyframes, reduced motion) is a hand-authored helper in `src/helpers/*.css`. Helpers reference L2 tokens and their own local option properties only.

`generateTokenHierarchy(meta)` builds the L3 → L4 → L5 name tree; `toCSSVariables(tree)` flattens it to L5 names. Run `bun run tokens:show <component>` to print them.

## Value generation

Variant and state recipes need inputs from L2. Each component carries those inputs down as its own **bridge** tokens, so adjacency is never broken and the component can be retuned on its own:

```css
/* L3 */ --button-tone-primary: var(--tone-primary);
/* L3 */ --button-interaction: var(--interaction);
/* L4 */ --button-background-primary: var(--button-tone-primary);
```

Property type comes from the trailing name segment and is inferred (`background` → fill, `color` → ink, `border-color` → edge, everything else → other). Third-party properties declare it explicitly in `meta.types`.

### L4 variant recipes

| Variant | fill | ink | edge | other |
| --- | --- | --- | --- | --- |
| secondary | L3 | L3 | L3 | L3 |
| primary, positive, warning, danger, informational | tone | tone-ink | tone | L3 |
| tertiary | transparent tone | tone-ink | tone | L3 |

### L5 state recipes

| State | fill, ink, edge | other |
| --- | --- | --- |
| static, unchecked | L4 | L4 |
| hover, highlighted, open | `color-mix(in oklab, L4, interaction mix-<state>)` | box-shadow gains a ring; filter gains brightness |
| checked, selected, current, pressed | fill/edge → selection; ink → selection-ink | L4 |
| focus | outline-color → ring | L4 |
| invalid | edge/box-shadow mixes with `invalid` at `mix-invalid` | L4 |
| loading | filter → `saturate(50%)` | L4 |
| disabled | opacity → `L4 × opacity-disabled` | L4 |

Mix amounts come from L1 `--mix-base`/`--mix-step` through L2. `--interaction` flips with the theme (white on dark, black on light), so hover lightens on dark and darkens on light with no per-theme tokens.

Channels keep co-occurring states independent: each state changes only its own properties. The generator assigns defaults and fails on overlap; `meta.channels` overrides the assignment.

## Overrides

Generate by default and override when necessary. A component's `tokens.ts` replaces any generated value, with dot-separated keys relative to the component:

```ts
export const tokens: Overrides =
{ "background": "color-mix(in oklch, var(--color-text) 8%, var(--color-clear))"  // L3, refs L2
, "background.danger": "var(--alert-tone-danger-surface)"                      // L4, refs L3
, "color.danger": "var(--alert-tone-danger-surface-ink)"                       // L4, refs L3
};
```

An override still has to reference the level directly below it. Keys that match no generated token fail the build.

## Consuming tokens

Generated component CSS (`src/styles/generated/`) contains only L5 references of its own component and structural literals from `meta.structure`. It never reads L1–L4 and never contains other values.

## Rules

1. Define foundations, not ramps.
2. Derive, don't duplicate: every higher-level token references its parent.
3. Generate by default, override when necessary.
4. Put structural CSS in the schema or it will be deleted.
