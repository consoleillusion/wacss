# Generated CSS

The CSS that applies tokens is generated from each schema. It contains only:

- `var(--<component>-<property>-<variant>-<state>)` for each property in the active channel;
- the schema's structural literals.

No other values appear in it.

## Selectors

| Component kind | Base selector | Variant | State |
| --- | --- | --- | --- |
| Element (`element: "button"`) | `:where(button)` | `:where(button.primary)` | `:where(button.primary):where(:hover)` |
| Class (`name: "card"`) | `.card` | `.card.primary` | `.card.primary:where(:hover)` |

- **Element rules have zero specificity** (`:where`). Any component class outranks them, and element rules only provide defaults.
- **Class rules are one class** (plus a variant class). States are wrapped in `:where()` so they add nothing. Every state rule of a variant has the same specificity as the variant rule, and it overrides because it comes later and sets different properties.
- **The default variant (`secondary`) has no class.** The default state (`static`) has no state selector.

Class count: one per class component, plus one per distinct variant name (the variant classes are shared), plus the helper classes.

Selector order is tag, then ARIA or HTML state, then plain attributes. Use `[data-*]` only when no semantic equivalent exists and styling the base element would break semantic best practice.

## Example

Card here declares `channels: { hover: ["box-shadow"] }`, so hovering lifts the card instead of tinting it.

```css
@layer wacss.components {
  .card {
    display: grid;                                              /* structure */
    overflow: hidden;
    background: var(--card-background-secondary-static);
    color: var(--card-color-secondary-static);
    border-color: var(--card-border-color-secondary-static);
    box-shadow: var(--card-box-shadow-secondary-static);
  }
  .card:where(:hover) {
    box-shadow: var(--card-box-shadow-secondary-hover);          /* hover's channel only */
  }
  .card.primary {
    background: var(--card-background-primary-static);
    color: var(--card-color-primary-static);
    border-color: var(--card-border-color-primary-static);
    box-shadow: var(--card-box-shadow-primary-static);
  }
  .card.primary:where(:hover) {
    box-shadow: var(--card-box-shadow-primary-hover);
  }
}

@layer wacss.elements {
  :where(button) {
    display: inline-flex;
    cursor: pointer;
    background: var(--button-background-secondary-static);
    color: var(--button-color-secondary-static);
    /* … */
  }
  :where(button):where(:hover) { background: var(--button-background-secondary-hover); }
  :where(button):where(:focus-visible) { outline-color: var(--button-outline-color-secondary-focus); }
  :where(button):where(:active) { transform: var(--button-transform-secondary-active); }
  :where(button):where(:disabled, [aria-disabled="true"], [data-disabled]) {
    cursor: not-allowed;
    opacity: var(--button-opacity-secondary-disabled);
  }
  :where(button.primary) { background: var(--button-background-primary-static); /* … */ }
  :where(button.primary):where(:hover) { background: var(--button-background-primary-hover); }
  /* … */
}
```

A primary button that is hovered, focused and pressed at once shows all three changes: a lighter background, an outline and a slight scale.

## Cascade layers

```css
@layer wacss.reset, wacss.elements, wacss.components, wacss.layout;
```

| Layer | Contains | Source |
| --- | --- | --- |
| `wacss.reset` | Minimal reset | helper (hand) |
| `wacss.elements` | Element components | generated |
| `wacss.components` | Class components | generated |
| `wacss.layout` | Layout helpers | helper (hand) |

Tokens (L1–L5) are unlayered custom properties on `:root`.

- A class component always beats an element component, whatever their specificity.
- A layout helper beats both, so `.stack` spacing applies to cards inside it.
- Consumer CSS outside any layer beats all of WACSS.

## Containment

A button inside a card is styled by the `button` element rules. The card influences it only through inheritance:

- `color`, the `font-*` properties and `currentColor` are inherited from the card;
- `em`-based lengths (padding, radius, gap) scale with the card's font size.

A button that must look different inside a card is a different component, or a variant.

## Generation rules

For each component:

1. Emit the base rule: `structure.static` literals, then every property's `<default variant>-static` token.
2. For each state in emit order, emit `selector:where(<state selector>)` with that state's structural literals and only the properties in its channel.
3. For each non-default variant, emit `selector.<variant>` with every property's `<variant>-static` token, then its state rules as in step 2.
4. For each pseudo-element, repeat steps 1–3 on `selector::<pseudo>`.

A rule with no declarations is omitted.
