<script lang="ts">
  import type { AccordionProps } from "../types";

  let {
    items = [],
    type = "single",
    value = "",
    name,
    disabled = false,
    class: className = "",
    children,
    ...restProps
  }: AccordionProps & { name?: string } = $props();

  const groupName = type === "single" ? (name ?? "wacss-accordion") : undefined;
  const classes = ["wacss-accordion", className].filter(Boolean).join(" ");

  function isOpen(itemValue: string): boolean {
    if (Array.isArray(value)) return value.includes(itemValue);
    return value === itemValue;
  }
</script>

<div
  {...restProps}
  class={classes}
  data-wacss="accordion"
  data-type={type}
>
  {#each items as item, index (item.value)}
    {@const open = isOpen(item.value)}
    <details
      name={groupName}
      open={open || undefined}
      data-wacss="accordion-item"
    >
      <summary data-wacss="accordion-trigger">
        <span data-wacss="accordion-title">{item.title}</span>
        <svg
          data-wacss="accordion-icon"
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m4 6 4 4 4-4" />
        </svg>
      </summary>

      <div data-wacss="accordion-content">
        {#if item.content}
          <p>{item.content}</p>
        {/if}
        {#if children}
          {@render children({ item, index })}
        {/if}
      </div>
    </details>
  {/each}
</div>
