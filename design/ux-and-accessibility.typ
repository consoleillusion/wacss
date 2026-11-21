= UX and accessibility
<ux-and-accessibility>
These apply to every component and to the demo site.

Core principles: clarity over decoration; consistency over novelty;
accessibility by default; semantic meaning over arbitrary styling;
predictability over cleverness; user control over forced workflows;
progressive enhancement over unnecessary complexity; content-first
responsive design; feedback for every meaningful interaction;
evidence-based decisions over aesthetic assumptions.

== How the token system serves these
<ux-and-accessibility:how-the-token-system-serves-these>
#table(
  columns: 2,
  [Requirement], [Mechanism],
  [Distinguish hover, focus, active, selected, disabled and loading],
  [Separate channels per state; co-occurring states stay visible
  (#link(<states>)[states])],
  [Visible focus indicator],
  [`focus` owns `outline-color` on every focusable component],
  [Never rely on colour alone],
  [Selection and validity states also change a non-colour channel or
  come with text/icons from the component],
  [Respect text scaling],
  [Component lengths in `em`, type in `rem`],
  [Respect reduced motion],
  [Global reduced-motion rule in helpers; motion durations are tokens],
  [Light and dark designed, not inverted],
  [Dark and light L2 values are set deliberately; interaction direction
  flips with the theme],
  [Sufficient contrast],
  [Ink tokens are computed against their fill (`on-accent`,
  `tone-*-ink`); the build checks WCAG 2.2 AA on real fill/ink pairs in
  both themes and all four palettes],
)

Make hierarchy explicit: users should immediately see what is primary,
secondary and tertiary. Use consistent typography, control density, use
whitespace to communicate relationships, maintain alignment, use
contrast intentionally, avoid unnecessary decoration, and keep one
predictable scale for headings, body, labels and supporting text.

Use semantic colours to communicate meaning, not just decoration. Limit
accents to meaningful emphasis and interaction, keep the same semantic
role the same colour everywhere, distinguish surfaces with subtle
luminance, borders or elevation, and test real foreground/background
combinations rather than isolated palette values.

== Accessibility
<ux-and-accessibility:accessibility>
- Accessibility is part of the system, not an enhancement. Meet WCAG 2.2
  and WAI-ARIA by default.
- Semantic HTML5 first: good HTML needs little CSS and little extra
  markup. Stick to HTML5 where possible, but prioritise usability and
  user joy by targeting base elements, input types and standard
  attributes.
- Native elements over custom widgets.
- Classless as much as possible: style native elements; use a class only
  when no semantic HTML element exists (for example a card).
- Full keyboard support and logical tab order.
- Meaningful structure: headings, landmarks, lists and labels reflect
  the content hierarchy.
- Alternative text for informative images.
- Essential information never depends on animation.
- Respect text scaling and `prefers-reduced-motion`.
- Contrast meets WCAG 2.2 AA; this is enforced by the build across both
  themes and all four palettes.
- Error messages are associated with their fields.
- Tested with assistive technology, not only automated tools.

== Interaction
<ux-and-accessibility:interaction>
- Immediate feedback for every meaningful interaction.
- Interactive elements look different from static content.
- Similar controls behave similarly; labels describe what the action
  does.
- Adequate target sizes for mouse, touch and keyboard.
- Keyboard interaction is available for every function.
- Destructive actions need confirmation or undo.
- User input is preserved, including invalid input.
- Navigation is predictable: no new navigation model on every page,
  descriptive labels, frequent destinations easy to reach, clear
  orientation, logical grouping, no excessive nesting, preserved
  navigation state, and breadcrumbs or local navigation for complex
  structures.
- Use plain, concise and consistent language. Write action-oriented
  labels, state consequences and expectations, make information
  scannable with headings and lists, and write useful empty states that
  say why content is absent and what to do next.

== Forms
<ux-and-accessibility:forms>
- Clear, persistent labels near their controls; placeholders are
  examples, never labels.
- Appropriate input types.
- Validate early without interrupting; explain errors and how to fix
  them.
- Preserve invalid input.
- Group related fields into logical sections; mark required and optional
  fields clearly.
- Request only what is needed; use safe defaults when they can be safely
  inferred.

== Feedback and status
<ux-and-accessibility:feedback-and-status>
- Show loading and progress for long operations.
- Confirm success; make errors actionable.
- Design empty, loading, success, error and unavailable states.
- Match the mechanism to the purpose: inline validation, notifications,
  dialogs and status messages.
- No silent failures; no notifications for inconsequential events.

== Layout and responsiveness
<ux-and-accessibility:layout-and-responsiveness>
- Design for content, not devices; break where the layout stops working.
- Fluid sizing over fixed dimensions; no horizontal overflow.
- Prioritise content; small screens may need different arrangements.
- Keep touch targets and spacing usable on mobile; support portrait and
  landscape where appropriate.
- Use responsive typography.
- Test intermediate widths and both orientations.
- Minimise JavaScript and prefer native browser functionality.
- Optimise image delivery, reserve space for async content, render
  critical content early, keep expensive work from freezing the
  interface, and use progressive enhancement so core functionality
  survives JavaScript failure.

== Consistency
<ux-and-accessibility:consistency>
- Establish design tokens for colour, type, spacing, borders and other
  foundations; components consume semantic tokens, never palette values.
- Use reusable components; don\'t implement the same interaction twice.
- Define component states consistently.
- Few variants: each one costs maintenance and testing.
- Document each component\'s contract: inputs, outputs, accessibility
  behaviour and constraints.
- Use naming conventions that describe purpose.
- Maintain backward compatibility for shared components.

== Trust and control
<ux-and-accessibility:trust-and-control>
- Make actions reversible with undo or recovery where practical;
  consequences explicit beforehand.
- No dark patterns.
- Respect theme, motion, language and accessibility preferences.
- Protect privacy: collect only necessary data, explain its use, allow
  export, avoid unnecessary account requirements, and don\'t create
  artificial dependencies; users keep reasonable control of their data
  and workflows.

== References
<ux-and-accessibility:references>
#table(
  columns: 3,
  [Resource], [Use], [Authority],
  [WCAG 2.2],
  [Accessibility requirements],
  [Normative standard],
  [WAI-ARIA],
  [Accessible semantics for custom widgets],
  [Normative standard],
  [Nielsen Norman Group],
  [Usability research and heuristics],
  [Research],
  [Inclusive Design Principles],
  [Inclusive design],
  [Guidance],
  [Apple Human Interface Guidelines],
  [Platform conventions],
  [Guidance],
  [USWDS],
  [Government design system],
  [Reference],
  [#emph[Every Layout] (Pickering, Bell)],
  [Intrinsic layout primitives],
  [Reference],
)

Validation: test with actual users, not developer intuition alone. Check
task completion, observe errors such as hesitation, confusion, misclicks
and abandonment, measure efficiency in time, steps and cognitive effort,
include edge cases such as empty data, long content, invalid input and
unexpected system states, and test across browsers, screen sizes, input
methods and assistive technologies. Use analytics carefully: they show
patterns, not explanations. Prioritise real usability problems over
subjective aesthetic preferences.

Priorities when principles conflict: clarity over decoration,
consistency over novelty, accessibility by default, semantics over
styling, predictability over cleverness, evidence over taste.
