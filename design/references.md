# References
 
| Standard / Resource | Purpose |
|---|---|
| Nielsen Norman Group | Usability research and heuristics |
| WCAG 2.2 | Accessibility requirements |
| WAI-ARIA | Accessible interaction semantics |
| Apple Human Interface Guidelines | Platform interface conventions |
| USWDS | Government design system |
| Inclusive Design Principles | Inclusive interface design |
 
These are not equally authoritative. WCAG is a normative technical standard; Nielsen Norman Group is a research and consultancy resource; Apple provides design-system guidance.
 
---
 
# Editorial notes (not part of the spec)
 
Issues spotted while restructuring. Resolve before splitting, then delete this section.
 
1. **Card geometry conflict.** The prose says figure = 3/7 and body = 4/7 of the height, but the SCSS uses `grid-template-rows: 1fr 1fr` (an even split). Use `grid-template-rows: 3fr 4fr` to match the prose.
2. **Card SCSS violates the token rules.** It uses raw literals (`30rem`, `1.5rem`) outside layer 1. These should become `--card-*` tokens.
3. **Yakisugi has no palette entry.** It is listed in Part 4 but missing from the `$palettes` map in Part 3.3.
4. **Layer-5 naming.** The original table wrote `<role><state>` with no separator; the examples use a hyphen. This document uses `-<state>` throughout.
5. **Primary role colour.** Part 3.1 says Primary uses `pop`, but the reference code only defines the Standard role. Add a Primary example.
6. **Typos fixed.** "priorize", "heirarchical", "Heydon Pickerings", "Svete" (read as Svelte). Please confirm that "Svelte" was intended.
7. **Kokō.** The kanji 古高 may be intended as 枯高 (the usual wabi-sabi spelling). Worth verifying.
