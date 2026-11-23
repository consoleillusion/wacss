= Button
<button>
An action. Button wraps the bits-ui `Button`. It renders a `<button>`, or
an `<a>` when `href` is given. It is an element component: its rules
select `button` and `a[data-button-root]`, so a plain `<button>` on a
wacss page already looks like one.

== Arguments
<button:arguments>
#table(
  columns: 3,
  [Argument], [Type and default], [Meaning],
  [`variant`], [`secondary` · `primary` · `tertiary` · `danger`; `secondary`], [Its emphasis. Secondary is a surface with a border tinted by the accent; primary is filled with the pop; tertiary has no fill or border; danger is filled with the danger colour.],
  [`label`], [string], [The text of the button. Children, if given, replace it.],
  [`href`], [string], [Renders an anchor that goes here.],
  [`type`], [`button` · `submit` · `reset`; `button`], [The button's form type. Ignored when `href` is given.],
  [`disabled`], [boolean; `false`], [Prevents activation and shows the disabled state.],
  [`loading`], [boolean; `false`], [Marks the button busy (`aria-busy`), prevents activation and shows the loading state.],
  [`id`, `class`], [string], [Passed to the root element.],
)

Any other attribute is passed through to the element.

== States
<button:states>
#table(
  columns: 2,
  [State], [Effect],
  [hover], [The background moves toward the interaction colour.],
  [focus], [An accent ring appears.],
  [active], [The button scales down slightly.],
  [disabled], [Half opacity; `cursor: not-allowed`.],
  [loading], [Half saturation; `cursor: progress`.],
)

== Themable properties
<button:properties>
`background`, `color`, `border-color`, `border-width`, `border-radius`,
`padding-block`, `padding-inline`, `gap`, `font-size`, `font-weight`,
`outline-color`, `outline-width`, `outline-offset`, `transform`,
`opacity`, `filter`, `transition-duration`, `transition-timing-function`.

== Example
<button:example>
```astro
<Button label="Cancel" />
<Button variant="primary" type="submit" label="Save" loading={saving} />
<Button variant="tertiary" href="/help" label="Help" />
```
