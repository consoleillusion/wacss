= Using components
<using>
A component is used by passing it data. Every argument it accepts is
listed in its schema. The chapters that follow are laid out from the
schemas as this book compiles, so they always match the components' API
(#link(<schema:chapters>)[component chapters]).

== Passing data
<using:data>
In an Astro page, import the component from its folder and pass its
arguments as attributes. Svelte components that are interactive need a
client directive:

```astro
---
import Button from "wacss/components/Button/Button.svelte";
import Accordion from "wacss/components/Accordion/Accordion.svelte";
import Card from "wacss/components/Card/Card.astro";
---
<Button variant="primary" label="Save" />
<Accordion client:load items={[{ value: "a", title: "Shipping", content: "Two to four days." }]} />
<Card header="Button" text="An action." figure={{ component: "Button", data: { label: "Try me" } }} />
```

Every component also accepts `id` and `class`. A `class` is added to the
component's root and is meant for layout helpers; it does not restyle the
component.

A component that shows another component takes it as data,
`{ component, data }`: the other component's title and the arguments it
receives (#link(<schema:children>)[children]). Card's `figure` and
`footer` and an accordion item's `content` work this way.

== Variants and states
<using:variants>
The `variant` argument selects one of the variants the component
declares; the default variant, `secondary`, adds no class. States are
never passed as styling. They follow from the element's real condition:
the pointer, keyboard focus, `disabled`, `loading`, or an open item, as
mapped by #link(<states:vocabulary>)[the state vocabulary].

== Reading a component's tokens
<using:tokens>
Each reference below lists the component's themable properties. For each
variant `v` and property `p` there is a token `--<name>-v-p`, and for each
state `s` that changes `p`, a token `--<name>-v-p-s`. These are listed so
the hierarchy can be read; they are customised through the L1 and L2
tokens they are made from (#link(<customising>)[customising]). The demo
site's design page shows every one of them in context.

== More to come
<using:more>
Accordion, Badge, BarChart, Button, Card, Checkbox, CodeBlock, ColorInput, DateInput, Fieldset, Form, Globe, LineChart, Link, ModeToggle, NavBar, Notice, NumberInput, Page, Pagination, PieChart, Progress, Radio, Select, Slider, SortableList, Stat, StreetMap, Table, TextArea, TextInput and Toolbar are the first components. Each further
component follows the same schema and generation; listing it in
`design/book.typ` adds its chapter here.
