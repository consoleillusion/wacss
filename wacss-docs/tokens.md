# Tokens

## The five levels

| Level | Name | Pattern | Example | Author |
| --- | --- | --- | --- | --- |
| L1 | Primitive | `--<name>` | `--space-step` | Library Maintained |
| L2 | Semantic | `--<name>` | `--border-radius`, `--color-accent` | Library default, consumer retheme |
| L3 | Component | `--<component>-<property>` | `--button-background` | Generated |
| L4 | Variant | `--<component>-<property>-<variant>` | `--button-background-primary` | Generated |
| L5 | State | `--<component>-<property>-<variant>-<state>` | `--button-background-primary-hover` | Generated |

- `<property>` is a CSS property name: `background`, `border-radius`, `padding-inline`. A third-party custom property may be the property (see [component-schema](/component-schema)).
- `<variant>` is a variant name: `primary`, `secondary`, See [variants](/variants).
- `<state>` is a state name: `static`, `hover`, See [states](/states).
- Bridges use the same L3/L4 patterns with an L2 name in the `<property>` slot. See [generation](/generation).

## 2.2 The matrix

Each component generates exactly:

- **L3:** one token per property.
- **L4:** one token per property × variant.
- **L5:** one token per property × variant × state.

…plus its bridges at L3 and L4. Every combination exists, even when its value only passes through the level below.

## 2.3 Reference rules

A token may reference tokens at its own level and the level directly below it. Nothing else.

| Level | May reference |
| --- | --- |
| L1 | nothing (literals only) |
| L2 | L1, L2 |
| L3 | L2, L3 of the same component |
| L4 | L3, L4 of the same component |
| L5 | L4, L5 of the same component |

A reference that skips a level, or reaches into another component's tokens, fails the build.
A reference that skips a level, or reaches into another component's tokens, fails the build.


## 2.4 Themable values

A themable token at L2–L5 is an expression over the level below plus literals:

```css
/* L4 → L5: a reference to the level below and literal arguments */
--button-background-secondary-hover:
  color-mix(in oklab, var(--button-background-secondary), var(--button-interaction-secondary) var(--button-mix-hover-secondary));

/* L2: a reference to L1 and a literal multiplier */
--border-radius: calc(var(--border-radius-base) + var(--border-radius-step) * 4);
```

Literals as arguments are expected (`5%`, `* 4`, `in oklab`). Most generated values are fine for most people. They can be overridden, but it is usually easier to change L2.

A themable L2–L5 token without a reference is allowed only where the value has no meaningful source, such as `transparent`. Those cases are listed in L2.

## 2.5 Structural values

Some properties are not themable. A component needs them in order to work, and their value is the same in every theme: `display`, `position`, `inset`, flex and grid structure, `overflow`, `white-space`, `appearance`, `user-select`, `pointer-events`, `box-sizing`, `content`, `cursor`, `animation-name`.

Structural properties:

- are declared as literals in the component schema (`meta.structure`);
- have no tokens at any level;
- are emitted into the same selectors as the token declarations;
- never contain `var()`;
- never appear in `cssProperties`.

The test: if a designer would change the value when rethemeing or rebranding, or it differs by variant, it is themable. If changing it would break the component, it is structural.

## 2.6 Units

- **Component lengths** (padding, gap, radius, heights, offsets) are in `em`. A component scales with the font size of its context, so a button inside a small card is small.
- **Page-level lengths** (layout helpers, page spacing) are in `rem`. They do not scale with context.
- **Font sizes** are in `rem` at L2. Components scale them with `em` multipliers where needed.

There is no size axis. A component is made smaller by being placed in a smaller context.
