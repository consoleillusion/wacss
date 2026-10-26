<script lang="ts">
  import type { ButtonProps } from "../types";

  let {
    variant = "default",
    size = "default",
    loading = false,
    disabled = false,
    href,
    type = "button",
    class: className = "",
    children,
    label,
    ...restProps
  }: ButtonProps & { label?: string; size?: string } = $props();

  const dataVariant = $derived(variant === "default" ? "primary" : variant);
  const dataSize = $derived(size === "default" ? "md" : size);
</script>

{#if href}
  <a
    {...restProps}
    {href}
    class={className || undefined}
    role="button"
    data-variant={dataVariant}
    data-size={dataSize}
    data-loading={loading || undefined}
    aria-disabled={disabled || loading ? "true" : undefined}
    aria-busy={loading || undefined}
    tabindex={disabled || loading ? -1 : undefined}
  >
    {#if loading}
      <span aria-hidden="true" data-spinner></span>
    {/if}
    {#if children}{@render children()}{:else if label}{label}{/if}
  </a>
{:else}
  <button
    {...restProps}
    {type}
    disabled={disabled || loading}
    class={className || undefined}
    data-variant={dataVariant}
    data-size={dataSize}
    data-loading={loading || undefined}
    aria-busy={loading || undefined}
  >
    {#if loading}
      <span aria-hidden="true" data-spinner></span>
    {/if}
    {#if children}{@render children()}{:else if label}{label}{/if}
  </button>
{/if}
