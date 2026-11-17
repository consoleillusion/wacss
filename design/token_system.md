# Token system

Tokens follow a five-level hierarchy, from primitive values to fully resolved component states. You define a small number of L1 and L2 tokens by hand. Everything above them is generated from component metadata by `scripts/emit-tokens.ts`.

| Level | Name pattern | Source | Derives from |
| --- | --- | --- | --- |
| L1 Primitive | `--<name>` | `src/tokens/primitives.ts` (hand-written) | nothing: literals only |
| L2 Semantic | `--<property>` | `src/tokens/semantic.ts` (hand-written) | L1 (and other L2) |
| L3 Component-property | `--<component>-<property>` | generated | L2 |
| L4 Role | `--<component>-<property>-<role>` | generated | L3 of the same component |
| L5 State | `--<component>-<property>-<role>-<state>` | generated | L4 of the same component |

Generated output: `src/styles/tokens/_l1-primitives.scss` … `_l5-state.scss`. Do not edit them; run `bun run emit:tokens`.

The generator rejects any token that references a level other than the one directly below it.

## L1: primitives

Foundations, not ramps: a base plus a step (addition) or ratio (multiplication). For example, `--space-base`/`--space-step`, `--border-radius-base`/`--border-radius-step`, `--font-size-base`/`--font-size-ratio`, `--duration-base`/`--duration-ratio`, `--mix-base`/`--mix-step`. Palette hues are single colours; light-theme variants are derived in L2.

## L2: semantic / default

There are three groups:

1. **Design meanings:** `--color-accent` (the colour prima), `--color-surface`, `--color-text`, `--space`, `--font-size-ui`, `--box-shadow-overlay` and so on.
2. **Property defaults:** one `--<css-property>` per property a component can declare (`--background`, `--color`, `--border-color`, `--border-radius`, `--padding-block`, `--gap`, …). An L3 token with no override is `var(--<property>)`. The longest matching tail wins, so `trigger-padding-block` inherits `--padding-block`.
3. **Role tones and state parameters:**
   - `--tone-<role>`, `--tone-<role>-ink`, `--tone-<role>-surface`, `--tone-<role>-surface-ink`
   - `--state-<state>` (and `--state-<state>-ink` for selection states)
   - `--lightness`, the theme's interaction pole: white in the dark theme, black in the light theme

Themes and palettes only change L2: `[data-theme="light"]`, `prefers-color-scheme`, `[data-palette="<name>"]`, or an inline `--color-accent` on the root.

## Component metadata

Each component's `schema.ts` exports `meta`. The schema describes data and configuration, not styling.

```ts
export const meta =
{ name: "button"
, cssProperties: ["background", "color", "border-color", "border-radius", …]
, roles: ["standard", "primary", "secondary", "danger", "tertiary"]
, states: ["static", "hover"]
} as const;
```

Roles: `standard primary secondary tertiary positive warn danger informational`.
States: `static focus hover active checked unchecked disabled`, plus `selected invalid open highlighted pressed current loading`.

Styled things that are not components (page elements, layout primitives) use the same shape in `src/tokens/specs/<name>.ts`.

`generateTokenHierarchy(meta)` builds the L3 → L4 → L5 name tree. `toCSSVariables(tree)` flattens it to L5 names. Both are in `src/tokens/generate.ts`; run `bun scripts/emit-tokens.ts --show` to print them.

## Value generation

Roles and states need inputs from L2. Each component carries those inputs down as its own tokens, so adjacency is never broken and any one component can be retuned on its own:

```css
/* L3 */ --button-tone-primary: var(--tone-primary);
/* L3 */ --button-state-hover: var(--state-hover);
/* L3 */ --button-lightness: var(--lightness);
/* L4 */ --button-state-hover-primary: var(--button-state-hover);
```

Recipes depend on the **property type**, which comes from the property name:

| Type | Property name ends in |
| --- | --- |
| fill | `background`, `track`, `range`, `indicator`, `thumb`, `dot`, `fill`, `overlay`, `accent-color` |
| ink | `color`, `icon`, `ink` |
| edge | `border-color`, `outline-color`, `ring`, `stroke`, `text-decoration-color`, `caret-color` |
| opacity | `opacity` |
| other | anything else (lengths, shorthands, durations…) |

### L4 role recipes

| Role | fill | ink | edge | other |
| --- | --- | --- | --- | --- |
| standard | L3 | L3 | L3 | L3 |
| secondary | tone | tone-ink | L3 | L3 |
| primary, tertiary, positive, warn, danger, informational | tone | tone-ink | tone | L3 |

### L5 state recipes

| State | fill, ink, edge | opacity | other |
| --- | --- | --- | --- |
| static, unchecked | L4 | L4 | L4 |
| hover, open, highlighted, active, pressed | `color-mix(in oklab, L4, lightness <state amount>)` | L4 | L4 |
| checked, selected, current | fill/edge → state colour; ink → state ink | L4 | L4 |
| focus, invalid | edge → state colour; others L4 | L4 | L4 |
| disabled, loading | `color-mix(in oklab, L4 <amount × 100%>, transparent)` | `L4 × amount` | L4 |

Mix amounts come from L1 `--mix-base`/`--mix-step` through L2 `--state-*`. The light theme mixes with black and the dark theme mixes with white, via `--lightness`.

## Overrides

Generate by default and override when necessary. A component's `tokens.ts` replaces any generated value, with keys relative to the component:

```ts
export const tokens: Overrides =
{ "background": "color-mix(in oklch, var(--color-text) 8%, var(--color-clear))"     // L3, refs L2
, "background-danger": "var(--alert-tone-danger-surface)"                          // L4, refs L3
, "thumb-standard-checked": "var(--switch-state-checked-ink-standard)"            // L5, refs L4
};
```

An override still has to reference the level directly below it. Keys that match no generated token fail the build.

## Consuming tokens

Rendered CSS (`src/styles/components`, `src/styles/base`) reads L5 tokens only. It may combine them with literals and `calc()`, but it never reads L1–L4.

## Rules

1. Define foundations, not ramps.
2. Derive, don't duplicate: every higher-level token references its parent.
3. Generate by default, override when necessary.
