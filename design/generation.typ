= Generation
<generation>
The generator is JavaScript/TypeScript (`src/tokens/generate.ts`, run by
`scripts/build.ts`). It reads each component\'s `meta` and optional
`tokens.ts`, and writes the L3–L5 tokens and the component CSS.

== Names: the hierarchy
<generation:names-the-hierarchy>
```ts
import * as R from "ramda";

const generateTokenHierarchy = (meta) =>
  // Purpose: build the L3 → L4 → L5 name tree for one component
  R.fromPairs(
    meta.cssProperties.map((p) => [
      `${meta.name}-${p}`,
      R.fromPairs(meta.variants.map((v) => [v, meta.states])),
    ]),
  );

const toCSSVariables = (tokens) =>
  // Purpose: flatten a hierarchy into its L5 custom property names
  R.chain(
    ([property, variants]) =>
      R.chain(
        ([variant, states]) => states.map((state) => `--${property}-${variant}-${state}`),
        R.toPairs(variants),
      ),
    R.toPairs(tokens),
  );
```

For `button` with
`["background", "color"] × ["secondary", "primary"] × ["static", "hover"]`:

```yaml
button-background:        # L3
  secondary: [static, hover]   # L4: [L5…]
  primary:   [static, hover]
button-color:
  secondary: [static, hover]
  primary:   [static, hover]
```

```json
[ "--button-background-secondary-static", "--button-background-secondary-hover"
, "--button-background-primary-static", "--button-background-primary-hover"
, "--button-color-secondary-static", "--button-color-secondary-hover"
, "--button-color-primary-static", "--button-color-primary-hover" ]
```

These names, and the bridges described under Bridges, are the complete
token set for the component.

== Values
<generation:values>
#table(
  columns: 2,
  [Level], [Value],
  [L3 `--c-p`],
  [Override if present, else `var(--p)` (the L2 property default).],
  [L4 `--c-p-v`],
  [Override if present, else the variant recipe
  (#link(<variants:variant-recipes>)[variants]).],
  [L5 `--c-p-v-s`],
  [Override if present, else the state recipe if `p` is in the channel
  of `s` (#link(<states:recipes>)[states]), else `var(--c-p-v)`.],
)

== Worked example
<generation:worked-example>
```css
/* L2 */
--background: var(--color-surface);
--tone-primary: var(--color-accent);
--interaction: var(--color-white);
--mix-hover: var(--mix-base);

/* L3 */
--button-background: var(--background);
--button-tone-primary: var(--tone-primary);                /* bridge */
--button-interaction: var(--interaction);                   /* bridge */
--button-mix-hover: var(--mix-hover);                       /* bridge */

/* L4 */
--button-background-secondary: var(--button-background);
--button-background-primary: var(--button-tone-primary);
--button-interaction-secondary: var(--button-interaction);  /* bridge */
--button-interaction-primary: var(--button-interaction);
--button-mix-hover-secondary: var(--button-mix-hover);
--button-mix-hover-primary: var(--button-mix-hover);

/* L5 */
--button-background-secondary-static: var(--button-background-secondary);
--button-background-secondary-hover:
  color-mix(in oklab, var(--button-background-secondary), var(--button-interaction-secondary) var(--button-mix-hover-secondary));
--button-background-primary-static: var(--button-background-primary);
--button-background-primary-hover:
  color-mix(in oklab, var(--button-background-primary), var(--button-interaction-primary) var(--button-mix-hover-primary));
```

== Bridges
<generation:bridges>
Recipes need L2 values: a variant\'s tone, the interaction colour, a mix
amount. Referencing L2 from L4 or L5 would skip levels, so each
component carries those values down as its own tokens:

#table(
  columns: 3,
  [Level], [Name], [Value],
  [L3],
  [`--<component>-<l2 name>`],
  [`var(--<l2 name>)`],
  [L4],
  [`--<component>-<l2 name>-<variant>`],
  [`var(--<component>-<l2 name>)`],
)

- #strong[Inferred, not declared.] The generator creates a bridge for
  every L2 name used by a recipe or an override. A component only has
  the bridges it uses.
- #strong[Bridges are not CSS.] They never appear in the generated
  component CSS.
- #strong[They can be retuned per component or per variant], e.g. a
  softer hover for cards only: override `mix-hover` in
  `src/components/Card/tokens.ts`.
- #strong[Collisions fail the build.] A bridge name must not equal a
  matrix name. Using the L2 names from #link(<semantic>)[semantic]
  (`tone-*`, `interaction`, `mix-*`, `ring`, `selection`, …), which are
  not CSS property names, avoids collisions by construction.

== L2 lookups
<generation:l2-lookups>
An L3 property token defaults to the L2 token of the same name:
`padding-inline` → `--padding-inline`. Third-party properties
(`--wx-background`) and any property without an L2 default must have an
L3 override. The build fails otherwise.

== Overrides
<generation:overrides>
A component may replace any generated token in
`src/components/<Name>/tokens.ts`:

```ts
// Purpose: hand-authored exceptions for card tokens
export const tokens =
{ "background": "var(--color-surface)"                                      // L3
, "border-radius": "calc(var(--radius-surface) * 1.5)"                      // L3
, "background.primary": "color-mix(in oklab, var(--card-tone-primary) 12%, var(--card-background))"  // L4
, "box-shadow.secondary.hover": "var(--card-box-shadow-secondary), 0 0.5em 1em oklch(0% 0 0 / 0.08)" // L5
, "mix-hover": "calc(var(--mix-hover) / 2)"                                  // L3 bridge
};
```

- Keys address a matrix token or bridge: `property`, `property.variant`,
  `property.variant.state`. Dots separate the slots so property names
  with hyphens stay unambiguous.
- An override is emitted #strong[as the token it replaces]. It has the
  same name, and no extra tokens exist.
- An override follows the reference rules for its level. It may
  introduce bridges by naming them (`var(--card-tone-primary)`).
- A key that matches no generated token fails the build.

== Emission
<generation:emission>
Tokens are written per level (`l3.css`, `l4.css`, `l5.css`) on `:root`,
grouped by component. L1 and L2 are compiled from SCSS. Component CSS is
written separately (#link(<css-output>)[css-output]).
`dist/tokens.json` records each token\'s level, component, value and
references.
