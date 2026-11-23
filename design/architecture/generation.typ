= Generating tokens
<generation>
This chapter specifies, step by step, how the build turns its inputs into
tokens. The next chapter specifies the CSS written from them. Together
they are sufficient to reimplement the generator; the reference
implementation is `src/lib/generateTokens.ts`, driven by
`scripts/generate-tokens.ts`.

== Inputs
<generation:inputs>
+ Compile `primitives.scss`, `semantic.scss`, `channel.scss` and
  `helpers.scss` to CSS.
+ From each of the first three, read the declarations in the first
  top-level `:root` block. These are the L1 tokens, the L2 semantic tokens
  and the channel tokens. The L2 set used below is the semantic tokens
  together with the channel tokens.
+ Load every `src/components/<Name>/schema.dhall`, in alphabetical order of
  folder name, and derive each component's name as the kebab case of its
  title.

== Targets
<generation:targets>
A component's #emph[targets] are the component itself and then each of its
pseudo-elements, in the order the schema lists them. Every target has its
own themable and structural properties. A property's #emph[key] is its
name for the component itself, and the pseudo-element's name without
colons, a hyphen and the property name for a pseudo-element:
`background`, `after-transform`. A pseudo-element may be drawn only on
elements matching a selector, its `on` field
(#link(<schema:fields>)[fields]).

== Component tokens (L3)
<generation:l3>
For each target, and for each variant in schema order, and for each
themable property in schema order, write one token named
`--<name>-<variant>-<key>` whose value is given by the variant rules
(#link(<variants:recipes>)[variants]).

== State tokens (L4)
<generation:l4>
For each target and each variant, first write the `static` tokens: one
for every themable property, named `--<name>-<variant>-<key>-static`, whose
value is `var(` the property's L3 token `)`. Then, for each other state
the schema declares, in the vocabulary order of
#link(<states:vocabulary>)[states]:

+ Find the state's channel from the channel tokens
  (#link(<channels:map>)[channels]).
+ Keep the target's themable properties whose key is in the channel. These
  are the properties the state changes on this target.
+ For every themable property, write one token named
  `--<name>-<variant>-<key>-<state>`. For a property the state changes,
  its value is given by the channel rules
  (#link(<channels:recipes>)[channels]); for any other, it is `var(` the
  property's L3 token `)`, the same value as its `static` token.

== A worked example
<generation:example>
For a button's `background` in the `primary` variant, with the default
tokens:

```css
/* L2 */
--background-pop: var(--palette-pop);
--hover-background-toward: var(--interaction);
--hover-background-amount: var(--mix-hover);

/* L3: Button's schema gives primary the role pop, and background is a fill */
--button-primary-background: var(--background-pop);
/* L3: padding is not a colour, so primary uses the default variant's value */
--button-primary-padding-inline: var(--button-secondary-padding-inline);

/* L4: every property has a static token, equal to its L3 token */
--button-primary-background-static: var(--button-primary-background);

/* L4: hover's channel includes background, and a -toward token exists */
--button-primary-background-hover:
  color-mix(in oklab, var(--button-primary-background),
            var(--hover-background-toward) var(--hover-background-amount));
/* L4: hover does not change padding, so its hover token keeps the L3 value */
--button-primary-padding-inline-hover: var(--button-primary-padding-inline);
```

== Recording the result
<generation:record>
Every token, hand-written or generated, is recorded with its name, level
(1 to 4), group (the source file for L1 and L2, the component's name for
L3 and L4), value, and references: the names inside its `var()` calls.
These records are written to `dist/tokens.json`
(#link(<build:outputs>)[outputs]).
