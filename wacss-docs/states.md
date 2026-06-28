# States (L4 → L5)

A state is a UI condition. Its name fills the `<state>` slot: `--button-background-primary-hover`.

## The set

| State | Kind | Meaning |
| --- | --- | --- |
| `static` | — | No condition. **Default.** |
| `hover` | interaction | Pointer over the element |
| `highlighted` | interaction | Keyboard or programmatic highlight (menu and list items) |
| `focus` | interaction | Keyboard focus |
| `active` | interaction | Being pressed right now |
| `checked` | condition | On (checkbox, radio, switch) |
| `unchecked` | condition | Explicitly off |
| `selected` | condition | Chosen in a set (tab, option, day) |
| `current` | condition | The current item in a set (page, step, breadcrumb) |
| `pressed` | condition | A toggle button that is on |
| `open` | condition | Expanded (disclosure, menu trigger, dialog) |
| `invalid` | condition | Fails validation |
| `loading` | condition | Waiting on work |
| `disabled` | condition | Not available |

A component lists the states it supports, always including `static`. Tokens exist for every listed state.

## Selectors

The generator emits each state as a `:where()` selector, so every state rule has the same specificity as the component's base rule plus its variant class. The selector covers native pseudo-classes and the ARIA and `data-*` attributes Bits UI sets.

| State | Selector inside `:where(…)` |
| --- | --- |
| `static` | none |
| `hover` | `:hover` |
| `highlighted` | `[data-highlighted]` |
| `focus` | `:focus-visible` |
| `active` | `:active` |
| `checked` | `:checked, [aria-checked="true"], [data-state="checked"]` |
| `unchecked` | `[aria-checked="false"], [data-state="unchecked"]` |
| `selected` | `[aria-selected="true"], [data-selected]` |
| `current` | `[aria-current]:not([aria-current="false"])` |
| `pressed` | `[aria-pressed="true"]` |
| `open` | `[open], [aria-expanded="true"], [data-state="open"]` |
| `invalid` | `:user-invalid, [aria-invalid="true"], [data-invalid]` |
| `loading` | `[aria-busy="true"]` |
| `disabled` | `:disabled, [aria-disabled="true"], [data-disabled]` |

Selector order is tag, then ARIA or HTML state, then plain attributes. Use `[data-*]` only when no semantic equivalent exists and styling the base element would break semantic best practice.

## Co-occurring states and channels

Almost any states can apply at once: a checked checkbox can be hovered, focused and pressed at the same time. The only exclusive pair is `checked`/`unchecked`.

States must not cancel each other, so **each state changes its own properties**. These are its **channel**. For example, hover lightens the background, focus draws an outline, active scales and checked colours the box. They all stay visible together.

Rules:

1. In the generated CSS, a state's rule sets only the properties in its channel.
2. Any two states that can co-occur must have disjoint channels. The generator checks this and fails the build on overlap.
3. Every state except `static` and `unchecked` must end up with at least one channel property. A state with nothing to change is an error, not a silent no-op.
4. A state's L5 tokens still exist for every property. Properties outside the channel pass through: `var(L4)`.

### Default channels

Each state has a preference list. The generator assigns channels in the order below. Each state takes the first of its preferred properties that is in the component's `cssProperties` and not already taken by a co-occurring state. The selection states (`checked`, `selected`, `current`, `pressed`) claim every available property in their list. Every other state claims only the first available one.

| Order | State | Preference |
| --- | --- | --- |
| 1 | `disabled` | `opacity` |
| 2 | `loading` | `filter` |
| 3 | `invalid` | `border-color`, `outline-color`, `box-shadow` |
| 4 | `checked`, `selected`, `current`, `pressed` | `background`, `color`, `border-color` (all available) |
| 5 | `open` | `border-color`, `box-shadow` |
| 6 | `focus` | `outline-color` |
| 7 | `active` | `transform` |
| 8 | `hover` | `background`, `box-shadow`, `filter` |
| 9 | `highlighted` | `background`, `box-shadow` |

Examples:
- **Button** (secondary/primary; static, hover, focus, active, disabled): hover → `background`, focus → `outline-color`, active → `transform`, disabled → `opacity`.
- **Checkbox** (static, hover, focus, checked, disabled): checked takes `background`, `color` and `border-color`. Hover falls back to `box-shadow`.

A component can set channels explicitly with `meta.channels`, which the generator validates in the same way (see [component-schema](component-schema.md)).

## Recipes

When a property is in a state's channel, its L5 value is generated from its L4 token (`L4`) and the component's bridges (`b(name)` = `var(--<component>-<name>-<variant>)`):

| State | Property | L5 value |
| --- | --- | --- |
| `hover`, `highlighted`, `open` | fill, ink, edge | `color-mix(in oklab, var(L4), b(interaction) b(mix-<state>))` |
| `hover`, `highlighted`, `open` | `box-shadow` | `var(L4), 0 0 0 0.25em color-mix(in oklab, b(interaction) b(mix-<state>), transparent)` |
| `hover` | `filter` | `var(L4) brightness(calc(100% + b(mix-hover)))` |
| `focus` | `outline-color` | `b(ring)` |
| `active` | `transform` | `var(L4) scale(b(scale-active))` |
| `checked`, `selected`, `current`, `pressed` | fill, edge | `b(selection)` |
| `checked`, `selected`, `current`, `pressed` | ink | `b(selection-ink)` |
| `open` | `border-color` | `b(ring)` |
| `invalid` | edge, `box-shadow` | `color-mix(in oklab, var(L4), b(invalid) b(mix-invalid))` |
| `loading` | `filter` | `var(L4) saturate(50%)` |
| `disabled` | `opacity` | `calc(var(L4) * b(opacity-disabled))` |
| any | outside the channel | `var(L4)` |

The interaction colour flips with the theme (white on dark, black on light; see [semantic](semantic.md#themes)), so hover lightens on dark and darkens on light with no per-theme tokens.

`transform`, `box-shadow` and `filter` build on L4 because their L2 defaults are identity values.

## Rule order

Channels are disjoint, so order does not decide which value wins. It is fixed anyway, for stable output: static, then the order in the channel table, reversed (interactions before conditions).
