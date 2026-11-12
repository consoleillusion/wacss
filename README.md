# wacss

A high-level, data-driven Svelte component library with a single global, token-driven stylesheet. Pass data, get a complete accessible UI.

The **wa** in `wacss` comes from **和 (wa)**: harmony, balance, and working with the grain of the web. The library favors web standards, accessibility, calm defaults, and a small public surface over configuration.

## Install

```bash
bun add wacss bits-ui svelte
```

Import the stylesheet once in your app shell:

```ts
import "wacss/styles";
```

Then import components from the package root:

```svelte
<script>
  import { Accordion, Button, Card, Checkbox, Dialog, Form, Input, Label, Select, Switch, Tabs } from "wacss";
</script>
```

## Quick start

```svelte
<script>
  import { Accordion, Button, Card, Input, Select, Tabs } from "wacss";

  const items = [
    { value: "tokens", title: "One token set", content: "Paste a new token set at :root and everything follows." },
    { value: "global", title: "Global styles only", content: "Components carry no scoped styles." },
  ];

  const options = [
    { value: "sakura", label: "Sakura" },
    { value: "matcha", label: "Matcha" },
  ];

  const tabs = [
    { value: "overview", label: "Overview", content: "A data-driven tab panel." },
    { value: "usage", label: "Usage", content: "Pass a tabs array and the component renders the rest." },
  ];
</script>

<Card title="Account" description="Update your details.">
  <Input label="Email" type="email" placeholder="you@example.com" />
  <Select {options} placeholder="Choose a theme" />
  <Button>Save changes</Button>
</Card>

<Accordion {items} />
<Tabs {tabs} />
```

Every component is styled entirely by global CSS. There are no Tailwind classes, no scoped Svelte styles, and no per-component CSS files.

## Components

The core components share one shape: data in, UI out.

| Component | Data / value props | Notes |
|---|---|---|
| `Accordion` | `items`, `value`, `type` | Single or multiple open items. |
| `Button` | `variant`, `size`, `loading`, `href` | Renders `<button>` or `<a>`. |
| `Card` | `title`, `description`, `footer` | Optional header, content, and footer. |
| `Checkbox` | `checked`, `indeterminate`, `label` | Uses bits-ui internally. |
| `Dialog` | `open`, `title`, `description`, `triggerLabel` | Modal with trigger, body, and footer snippets. |
| `Form` | `schema`, `values`, `uiSchema`, `action`, `target` | Renders a complete form from JSON Schema. |
| `Input` | `value`, `label`, `description`, `error` | Label, help text, and error wiring included. |
| `Label` | `for`, `text`, `required` | Styled form label. |
| `Select` | `options`, `value`, `type` | Single or multiple selection. |
| `Switch` | `checked`, `label`, `description` | Uses bits-ui internally. |
| `Tabs` | `tabs`, `value` | Data-driven tab list and panels. |

All are exported from the package root. TypeScript prop types are exported alongside them (`AccordionProps`, `SelectOption`, `TabsItem`, `FormProps`, `JsonSchema`, and so on).

## Forms from JSON Schema

`Form` accepts a JSON Schema and infers the right control for every property. No field markup is required. The prop is named `jsonschema`; `schema` is accepted as an alias.

```svelte
<script>
  import { Form } from "wacss";

  const jsonschema = {
    $id: "profile",
    type: "object",
    required: ["name", "email"],
    properties: {
      name: { type: "string", title: "Full name" },
      email: { type: "string", format: "email", title: "Email" },
      age: { type: "integer", title: "Age", minimum: 0, maximum: 120 },
      role: { type: "string", title: "Role", enum: ["Engineer", "Designer"] },
      newsletter: { type: "boolean", title: "Product updates" },
      interests: {
        type: "array",
        title: "Interests",
        items: { type: "string", enum: ["Design", "Engineering", "Product"] },
      },
      bio: { type: "string", title: "Bio", maxLength: 280 },
      address: {
        type: "object",
        title: "Address",
        properties: {
          street: { type: "string", title: "Street" },
          city: { type: "string", title: "City" },
        },
      },
    },
  };
</script>

<Form {jsonschema} action="/api/profile" method="post" target="_self" />
```

`action`, `method`, `target`, and `enctype` are ordinary props on the form element, separate from the schema. Without `onSubmit`, the browser submits natively.

Handle submission on the client when you need to:

```svelte
<Form
  {jsonschema}
  onSubmit={async (values, event) => {
    await fetch("/api/profile", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(values),
    });
  }}
/>
```

Providing `onSubmit` prevents native submission and receives the current values object.

### Inference

| Schema shape | Control |
|---|---|
| `string` | text input |
| `string` with `format: "email" \| "uri" \| "tel" \| "password" \| "date" \| "time" \| "date-time" \| "month" \| "week" \| "color"` | matching native input type |
| `string` with `maxLength > 120` | textarea |
| `integer` / `number` | number input with min, max, and step |
| `boolean` | switch |
| `enum` / `const` variants | select |
| `array` of enum values | checkbox group |
| other `array` | textarea |
| `object` | nested fieldset |
| `const` | hidden input |

`$ref`, `$defs`, `allOf`, `oneOf`, and `anyOf` enums are resolved before inference. Defaults come from `default` and `const`; otherwise strings start empty, booleans start `false`, and arrays start empty.

### Presentation and validation

```svelte
<Form
  {jsonschema}
  columns={2}
  uiSchema={{
    email: { placeholder: "you@example.com" },
    bio: { widget: "textarea", help: "Keep it short." },
    "address.city": { label: "Town" },
  }}
  errors={{ email: "That address is already in use." }}
/>
```

`uiSchema` is keyed by dot path and accepts either a widget name (`"email": "textarea"`) or an object with `widget`, `label`, `help`, `placeholder`, `autocomplete`, `order`, `hidden`, `disabled`, `readonly`, and `columns`. Widgets: `auto`, `text`, `email`, `password`, `url`, `tel`, `search`, `number`, `textarea`, `select`, `checkboxes`, `switch`, `date`, `time`, `datetime-local`, `month`, `week`, `color`, `range`, `hidden`, and `group`.

Other useful props: `values` for controlled values, `errors` for server-side messages keyed by dot path, `nameFormat="bracket"` to submit nested names as `address[city]`, `columns` for the root grid, `submitLabel`, `submitVariant`, `showSubmit`, `resetLabel`, `showReset`, `disabled`, and `readonly`.

## Persistence

Value-like state (`Accordion` open items, `Input` text, `Checkbox`/`Switch` checked state, `Select` selection, `Tabs` selection, and `Form` values) uses `localStorage` as the source of truth after hydration. The server renders the passed or default value; on mount the stored value replaces it; subsequent changes are written back.

```svelte
<!-- Default key: wacss:select -->
<Select {options} />

<!-- Separate instances need separate keys -->
<Select {options} storageKey="account:country" />
<Select {options} storageKey="account:language" />

<!-- Opt out entirely -->
<Input label="Search" persist={false} />
```

Default keys: `wacss:accordion`, `wacss:input`, `wacss:checkbox`, `wacss:switch`, `wacss:select`, `wacss:tabs`, and `wacss:form`. `Input`, `Checkbox`, and `Switch` append their `id` when one is provided. `Form` uses `wacss:form:<schema.$id>` when the schema has an `$id`.

## Token hierarchy

Styling is a strict four-layer cascade. A layer may only reference the layer above it; component normal states use component tokens and interactive states use state tokens.

1. **Primitive** — raw values only: hues, type scale, space, radius, shadow, motion (`--color-zinc`, `--space-4`, `--radius-md`, `--motion-fast`).
2. **Alias** — semantic roles built from primitives (`--color-base`, `--color-surface`, `--color-accent`, `--color-text`, `--color-border`, `--font-body`, `--shadow-surface`).
3. **Component** — component roles built from alias tokens (`--background-button`, `--text-button`, `--radius-card`, `--padding-dialog`).
4. **State** — hover, active, focus, selected, and disabled values derived from component tokens (`--background-button-hover`, `--ring-input-focus`, `--opacity-switch-disabled`).

```css
:root {
  /* primitive */
  --color-indigo: oklch(58.5% 0.19 275);

  /* alias */
  --color-accent: var(--color-indigo);
  --color-accent-text: var(--color-white);

  /* component */
  --background-button: var(--color-accent);
  --text-button: var(--color-accent-text);

  /* state */
  --background-button-hover: color-mix(in oklch, var(--background-button), var(--mix-color) 10%);
}

[data-wacss="button"] {
  background: var(--background-button);
  color: var(--text-button);
}

[data-wacss="button"]:hover {
  background: var(--background-button-hover);
}
```

Because every component style consumes these tokens, restyling the library means replacing one token set at `:root`. Light and dark values follow `prefers-color-scheme`; add the `light` or `dark` class to `<html>` to override.

The source lives in `src/styles/`:

```text
src/styles/tokens/_primitives.scss   raw values
src/styles/tokens/_alias.scss        semantic roles + light/dark themes
src/styles/tokens/_components.scss   component roles
src/styles/tokens/_states.scss       interactive state values
src/styles/base/                     reset, global, typography, prose
src/styles/elements/                 native element styles
src/styles/patterns/                 layout patterns
src/styles/components/               data-wacss component styles
```

## Attribute hooks

Semantic attributes (`aria-*`, `data-state`, `data-disabled`) come from the native elements or bits-ui. Visual hooks are namespaced as `data-wacss="..."` so they never collide with user content:

```html
<button data-wacss="button" data-variant="outline" data-size="sm">Save</button>
<div data-wacss="select-trigger" data-state="open">…</div>
```

## Development

Requires Bun.

```bash
bun install
bun run build        # build dist/wacss.css and dist/wacss.min.css
bun run build:demo   # build the Astro demo into demo-dist/
```

Project layout:

```text
scripts/build.js       Sass compile + Lightning CSS minify
src/components/*/      Svelte components + colocated schema.ts
src/components/index.ts  Package root exports
src/components/types.ts  Shared public prop types
src/components/persist.svelte.ts  localStorage-backed reactive state
src/components/Form/    JSON Schema inference and recursive field rendering
src/spec/index.ts      Schema index
src/styles/            Global SCSS source
dist/                  Built CSS
```

## Aesthetic direction

Calming, spacious, faded, and readable: muted palettes, gentle surfaces, subtle borders and shadows, and transitions that help usability without demanding attention. The default look follows shadcn-svelte; the token hierarchy is what makes it yours.
