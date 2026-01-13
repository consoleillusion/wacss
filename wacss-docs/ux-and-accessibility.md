# 13. UX and accessibility

These apply to every component and to the demo site.

## 13.1 How the token system serves these

| Requirement | Mechanism |
| --- | --- |
| Distinguish hover, focus, active, selected, disabled and loading | Separate channels per state; co-occurring states stay visible ([06-states.md](06-states.md)) |
| Visible focus indicator | `focus` owns `outline-color` on every focusable component |
| Never rely on colour alone | Selection and validity states also change a non-colour channel or come with text/icons from the component |
| Respect text scaling | Component lengths in `em`, type in `rem` |
| Respect reduced motion | Global reduced-motion rule in helpers; motion durations are tokens |
| Light and dark designed, not inverted | Dark and light L2 values are set deliberately; interaction direction flips with the theme |
| Sufficient contrast | Ink tokens are computed against their fill (`on-accent`, `tone-*-ink`); contrast is tested on real fill/ink pairs |

## 13.2 Accessibility

- Semantic HTML first; native elements over custom widgets.
- Full keyboard support and logical tab order.
- Meaningful structure: headings, landmarks, lists, labels.
- Alternative text for informative images.
- Essential information never depends on animation.
- Contrast meets WCAG 2.2 AA.
- Error messages are associated with their fields.
- Tested with assistive technology, not only automated tools.

## 13.3 Interaction

- Immediate feedback for every meaningful interaction.
- Interactive elements look different from static content.
- Adequate target sizes for mouse, touch and keyboard.
- Action-oriented labels.
- Destructive actions need confirmation or undo.
- User input is preserved, including invalid input.

## 13.4 Forms

- Clear, persistent labels; placeholders never replace them.
- Appropriate input types.
- Validate early without interrupting; explain errors and how to fix them.
- Group related fields; mark required and optional fields clearly.
- Request only what is needed; use safe defaults.

## 13.5 Feedback and status

- Show loading and progress for long operations.
- Confirm success; make errors actionable.
- Design empty, loading, success, error and unavailable states.
- No silent failures; no needless notifications.

## 13.6 Layout and responsiveness

- Design for content, not devices; break where the layout stops working.
- Fluid sizing over fixed dimensions; no horizontal overflow.
- Test intermediate widths and both orientations.

## 13.7 Consistency

- Foundations live in tokens; components consume tokens, never palette values.
- One implementation per interaction.
- Few variants: each one costs maintenance and testing.
- Document each component's contract: props, accessibility behaviour and constraints.

## 13.8 Trust and control

- Reversible actions where practical; consequences explicit beforehand.
- No dark patterns.
- Respect theme, motion, language and accessibility preferences.
- Collect only necessary data, explain its use, and allow export.

## 13.9 References

| Resource | Use | Authority |
| --- | --- | --- |
| WCAG 2.2 | Accessibility requirements | Normative standard |
| WAI-ARIA | Accessible semantics for custom widgets | Normative standard |
| Nielsen Norman Group | Usability research and heuristics | Research |
| Inclusive Design Principles | Inclusive design | Guidance |
| Apple Human Interface Guidelines | Platform conventions | Guidance |
| USWDS | Government design system | Reference |
| *Every Layout* (Pickering, Bell) | Intrinsic layout primitives | Reference |

Priorities when principles conflict: clarity over decoration, consistency over novelty, accessibility by default, semantics over styling, predictability over cleverness, evidence over taste.
