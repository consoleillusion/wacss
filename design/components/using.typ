= Using components
<using>
A component is used by passing it data. Every argument it accepts is
listed in its schema, which is also the reference for this part: the
tables below are the schemas' `arguments` and the tokens generated from
their properties.

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
<Card header="Button" text="An action." figure={{ title: "Button", label: "Try me" }} />
```

Every component also accepts `id` and `class`. A `class` is added to the
component's root and is meant for layout helpers; it does not restyle the
component.

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
Accordion, Button and Card are the first three components. Each further
component follows the same schema, generation and documentation, and adds
a chapter here.
