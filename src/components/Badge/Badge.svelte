<script lang="ts">
  import type { BadgeProps } from "../types";

  let {
    variant = "default",
    as = "span",
    href,
    class: className = "",
    children,
    label,
    ...restProps
  }: BadgeProps & { label?: string } = $props();

  const Tag = $derived(href ? "a" : as);
  const classes = $derived(["wacss-badge", className].filter(Boolean).join(" "));
</script>

<svelte:element
  this={Tag}
  {...restProps}
  {href}
  class={classes}
  data-wacss="badge"
  data-variant={variant}
>
  {#if children}{@render children()}{:else if label}{label}{/if}
</svelte:element>
