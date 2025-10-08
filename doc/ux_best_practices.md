# UX best practices
 
*File: `docs/06-ux-guidelines.md`. Advisory guidance for design review; not wacss-specific. No dependencies.*
 
Practical principles for a consistent, accessible, and usable design system, concerned primarily with interface design rather than visual aesthetics alone.
 
## Core principles (read first)
 
1. Clarity over decoration.
2. Consistency over novelty.
3. Accessibility by default.
4. Semantic meaning over arbitrary styling.
5. Predictability over cleverness.
6. User control over forced workflows.
7. Progressive enhancement over unnecessary complexity.
8. Content-first responsive design.
9. Feedback for every meaningful interaction.
10. Evidence-based decisions over aesthetic assumptions.

## Visual hierarchy
 
- Establish clear hierarchy: users should immediately see what is important, secondary, and tertiary.
- Use consistent typography: limit typefaces, weights, and sizes.
- Control visual density: avoid presenting too much at once.
- Use whitespace deliberately: spacing should communicate relationships.
- Maintain alignment: align related elements to consistent edges and grids.
- Use contrast intentionally: important elements stand out without everything competing.
- Avoid unnecessary decoration: every visual element serves a function.
- Establish predictable sizing: one scale for headings, body, labels, and supporting text.

## Colour and contrast
 
- Use semantic colours: communicate meaning, not just decoration.
- Maintain sufficient contrast for text and interactive elements.
- Don't rely on colour alone: add icons, labels, or patterns for states.
- Limit accent colours: reserve strong colours for meaningful emphasis and interaction.
- Maintain consistency: the same semantic role uses the same colour everywhere.
- Support light and dark themes: design both deliberately, not as inversions.
- Distinguish surfaces: subtle luminance, borders, or elevation differences establish depth.
- Test real foreground/background combinations, not isolated palette values.

## Navigation and information architecture
 
- Make navigation predictable: no new navigation model on every page.
- Use descriptive labels: familiar terminology over clever wording.
- Expose important destinations: frequent functionality is easy to reach.
- Maintain orientation: users know where they are.
- Provide clear hierarchy: group related items logically.
- Avoid excessive nesting.
- Preserve navigation state: don't reset filters, tabs, or position needlessly.
- Provide contextual navigation: breadcrumbs and local navigation for complex structures.

## Interaction design
 
- Provide immediate feedback: actions produce visible confirmation.
- Make interactive elements identifiable as controls.
- Use predictable interactions: similar controls behave similarly.
- Provide adequate target sizes for mouse, touch, and keyboard.
- Avoid ambiguous actions: labels describe what the button does.
- Prevent accidental actions: confirm destructive operations or provide undo.
- Support keyboard interaction for every function.
- Preserve user input across navigation, refresh, and recoverable errors.
- Distinguish hover, focus, active, selected, disabled, and loading states visually.

## Forms and input
 
- Minimise required fields: ask only what the task needs.
- Use appropriate input types for the data collected.
- Label every field: clear, persistent labels near their controls.
- Don't rely on placeholders: use them for examples, not as labels.
- Validate as early as practical without interrupting unnecessarily.
- Explain errors: what went wrong and how to fix it.
- Preserve invalid input: never erase it because validation failed.
- Group related fields into logical sections.
- Use sensible defaults when they can be safely inferred.
- Make required and optional fields distinguishable.

## Accessibility
 
- Use semantic HTML: native elements over custom interactive ones.
- Support keyboard navigation: logical tab order and visible focus indicators.
- Use meaningful structure: headings, landmarks, lists, and labels reflect the content hierarchy.
- Provide alternative text for informative images.
- Respect text scaling: stay usable when text size increases.
- Avoid motion dependency: essential information must not depend on animation.
- Respect `prefers-reduced-motion`.
- Meet WCAG contrast requirements.
- Associate error messages with their form fields.
- Test with assistive technologies; automated testing alone is insufficient.
## Responsive design
 
- Design for content, not devices: breakpoints sit where the layout stops working.
- Use fluid layouts over fixed dimensions.
- Prioritise content: small screens may need different arrangements.
- Avoid horizontal overflow.
- Keep touch targets and spacing usable on mobile.
- Test intermediate widths, not only desktop and mobile endpoints.
- Use responsive typography.
- Support portrait and landscape where appropriate.
## Feedback and system status
 
- Communicate loading with progress or indicators.
- Confirm successful actions.
- Make errors actionable: explain the problem and the recovery path.
- Design empty, loading, success, error, and unavailable states.
- Avoid silent failures.
- Match the mechanism to the purpose: inline validation, notifications, dialogs, and status messages.
- Avoid notifications for inconsequential events.
## Content and language
 
- Use plain language.
- Be concise.
- Maintain consistent terminology.
- Write action-oriented labels ("Save changes" over "Submit").
- Avoid ambiguous messages; state consequences and expectations.
- Make important information scannable with headings, lists, and grouping.
- Write useful empty states: why content is absent and what to do next.
## Consistency and design systems
 
- Establish design tokens for colour, type, spacing, borders, and other foundations.
- Use reusable components; don't implement the same interaction twice.
- Separate semantics from implementation: components consume semantic tokens, not palette values.
- Define component states consistently.
- Document component contracts: inputs, outputs, accessibility behaviour, constraints.
- Avoid unnecessary variants; each adds maintenance and testing cost.
- Use naming conventions that describe purpose.
- Maintain backward compatibility for shared components.
## Performance and perceived responsiveness
 
- Minimise JavaScript; prefer native browser functionality.
- Optimise image delivery: formats, dimensions, responsive sources.
- Prevent layout shifts: reserve space for async content.
- Render critical content early.
- Don't let expensive operations freeze the interface.
- Use progressive enhancement: core functionality survives JS failure.
- Keep animations purposeful.
## User control and trust
 
- Make actions reversible with undo or recovery.
- Avoid dark patterns.
- Make consequences explicit before consequential actions.
- Respect theme, motion, language, and accessibility preferences.
- Protect privacy: collect only what is necessary and explain its use.
- Avoid unnecessary account requirements.
- Provide data portability.
- Don't create artificial dependencies; users keep reasonable control of their data and workflows.
## Usability testing and validation
 
- Test with actual users; developer intuition is not a substitute.
- Test task completion.
- Observe errors: hesitation, confusion, misclicks, abandonment.
- Measure efficiency: time, steps, cognitive effort.
- Test edge cases: empty data, long content, invalid input, unexpected system states.
- Test across browsers, screen sizes, input methods, and assistive technologies.
- Use analytics carefully: they show patterns, not explanations.
- Prioritise actual usability problems over subjective aesthetic preferences.
