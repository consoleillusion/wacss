<script lang="ts">
  // Accordion: the bits-ui Accordion, driven by data. Each item is styled by .accordion,
  // its trigger by .accordion-trigger and its body by .accordion-content.
  // An item's body is its `content` text, or a snippet (an Astro named slot) named after its value;
  // values must not be argument names.
  import { Accordion } from "bits-ui";
  import type { Snippet } from "svelte";

  type Item = { value: string; title: string; content?: string; disabled?: boolean };

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
  const body = (item: Item) =>
    // Purpose: the snippet given for an item's body, if any
    slots[item.value] as Snippet | undefined;
</script>

<Accordion.Root {id} type={type as any} bind:value={open} {disabled} {loop} {orientation} class={className || undefined}>
  {#each items as item (item.value)}
    <Accordion.Item value={item.value} disabled={item.disabled} class="accordion">
      <Accordion.Header>
        <Accordion.Trigger class="accordion-trigger">{item.title}</Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content class="accordion-content">
        {#if body(item)}{@render body(item)!()}{:else if item.content}<p>{item.content}</p>{/if}
      </Accordion.Content>
    </Accordion.Item>
  {/each}
</Accordion.Root>
