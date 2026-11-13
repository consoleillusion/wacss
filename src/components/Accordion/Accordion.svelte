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

  const groupName = type === "single" ? (name ?? "") : undefined;
  const classes = ["", className].filter(Boolean).join(" ");

  function isOpen(itemValue: string): boolean {
    if (Array.isArray(value)) return value.includes(itemValue);
    return value === itemValue;
  }
</script>

<div
  {...restProps}
  class={classes}
  data-type={type}
  data-accordion-root
>
  {#each items as item, index (item.value)}
    {@const open = isOpen(item.value)}
    <details
      name={groupName}
      open={open || undefined}
    >
      <summary>
        <span>{item.title}</span>
        <svg
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

      <div>
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
