<script lang="ts">
  // Accordion: the bits-ui Accordion, driven by data. Each item is styled by .accordion, which
  // slides its body open and closed in CSS; the body stays in the page and is inert while closed.
  // Each item's trigger is a button styled as a tertiary Button, and its body is text or another
  // component given as data: { component, data }.
  import { Accordion } from "bits-ui";
  import type { Snippet } from "svelte";

  type Child = { component: string; data?: Record<string, unknown> };
  type Item = { value: string; title: string; content?: string | Child; disabled?: boolean };

  const modules = import.meta.glob<{ default: any }>(["../*/*.svelte", "!./Accordion.svelte"], { eager: true });

  let {
    items = [],
    type = "single",
    value,
    disabled = false,
    loop = true,
    orientation = "vertical",
    class: className = "",
    id,
    ...slots
  }: {
    items?: Item[];
    type?: "single" | "multiple";
    value?: string | string[];
    disabled?: boolean;
    loop?: boolean;
    orientation?: "vertical" | "horizontal";
    class?: string;
    id?: string;
    [slot: string]: unknown;
  } = $props();

  const initial = (): any => {
    // Purpose: normalise the open value(s) to the shape bits-ui expects for this type
    if (type === "multiple") return Array.isArray(value) ? value : value ? [value] : [];
    return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
  };
  let open = $state(initial());

  const isOpen = (item: Item) =>
    // Purpose: whether an item is open, so its body can be taken out of reach while closed
    Array.isArray(open) ? open.includes(item.value) : open === item.value;
  const childOf = (content: Item["content"]) => {
    // Purpose: the component a body names, or undefined when the body is text
    if (!content || typeof content === "string") return undefined;
    return modules[`../${content.component}/${content.component}.svelte`]?.default;
  };
  const body = (item: Item) =>
    // Purpose: the snippet given for an item's body, if any (an Astro named slot)
    slots[item.value] as Snippet | undefined;
</script>

<Accordion.Root {id} type={type as any} bind:value={open} {disabled} {loop} {orientation} class={className || undefined}>
  {#each items as item (item.value)}
    {@const Child = childOf(item.content)}
    <Accordion.Item value={item.value} disabled={item.disabled} class="accordion">
      <Accordion.Header class="stack">
        <Accordion.Trigger class="tertiary">{item.title}</Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content class="box" forceMount inert={!isOpen(item)}>
        {#if body(item)}{@render body(item)!()}
        {:else if Child}<Child {...(item.content as Child).data ?? {}} />
        {:else if item.content}<p>{item.content}</p>{/if}
      </Accordion.Content>
    </Accordion.Item>
  {/each}
</Accordion.Root>
