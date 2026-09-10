<script lang="ts">
  import type { ButtonProps } from "../types";

  let {
    variant = "default",
    size = "md",
    loading = false,
    disabled = false,
    href,
    type = "button",
    class: className = "",
    children,
    ...restProps
  }: ButtonProps = $props();

  const classes = $derived(["wacss-button", className].filter(Boolean).join(" "));
</script>

{#if href}
  <a
    {...restProps}
    {href}
    class={classes}
    data-wacss="button"
    data-variant={variant}
    data-size={size}
    data-loading={loading || undefined}
    aria-disabled={disabled || loading ? "true" : undefined}
    tabindex={disabled || loading ? -1 : undefined}
  >
    {#if loading}
      <span data-wacss="button-spinner" aria-hidden="true"></span>
    {/if}
    {@render children?.()}
  </a>
{:else}
  <button
    {...restProps}
    {type}
    {disabled}
    class={classes}
    data-wacss="button"
    data-variant={variant}
    data-size={size}
    data-loading={loading || undefined}
  >
    {#if loading}
      <span data-wacss="button-spinner" aria-hidden="true"></span>
    {/if}
    {@render children?.()}
  </button>
{/if}
