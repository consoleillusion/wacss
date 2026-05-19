<script lang="ts">
  import type { BadgeProps } from "./types";

  let {
    variant = "default"
    , as = "span"
    , href
    , class: className = ""
    , children
    , label
    , ...restProps
  }: BadgeProps & { label?: string } = $props();

  const Tag = $derived(href ? "a" : as);
  const variantClass =
    ({ default: "", secondary: "", outline: "tertiary", neutral: "tertiary"
     , info: "informational", warning: "warning", positive: "positive"
     , destructive: "danger", negative: "danger" } as Record<string, string | undefined>)[variant];
  const cls = $derived(["badge", variantClass, className].filter(Boolean).join(" "));
</script>

<svelte:element
  this={Tag}
  {...restProps}
  {href}
  class={cls}
>
  {#if children}{@render children()}{:else if label}{label}{/if}
</svelte:element>
