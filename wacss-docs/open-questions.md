# 15. Open questions

Decisions this spec leaves open. Each needs an answer before the part it affects is built.

| # | Question | Affects | Current assumption | Answer |
| --- | --- | --- | --- | --- |
| 1 | Component list, and each component's element, variants, states and properties | [12](12-components-and-api.md) | To be decided separately | Components listed in componentns section. I want you to decide whats best for variants, states, properties
| 2 | Are the default channel preferences ([06](06-states.md#63-co-occurring-states-and-channels)) right, especially hover → `background` first and loading → `filter`? | States | As written |
| 3 | Hover's lightness amount: `--mix-base` is 8%. Your example mentioned 5%. | L1 | 8% |
| 4 | Should `open` on a trigger change `border-color` (ring) or something else? | States | `border-color` |
| 5 | Pass-through pruning: allowed later only if computed styles don't change. Confirm that's the constraint. | Build | Yes |
| 6 | Third-party property types (`meta.types`): acceptable, or should third-party widgets be themed some other way? | Schema | `meta.types` |
| 7 | Keyframe animations live in helpers and are referenced by name. Is that acceptable, or should animations be expressible in the schema? | Helpers | Helpers |
 8 | Status ink contrast: computed with the same lightness switch as `--color-on-accent`. Should it be checked against WCAG in the build? | L2, build | Not checked in build |


