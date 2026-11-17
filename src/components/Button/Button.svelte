<script lang="ts">
  import type { ButtonProps } from "./types";

  let {
    variant = "default"
    , size = "default"
    , loading = false
    , disabled = false
    , href
    , type = "button"
    , class: className = ""
    , children
    , label
    , ...restProps
  }: ButtonProps & { label?: string; size?: string } = $props();

  // Public variant names map to spec variant classes on the root element.
  // The default variant has no class.
  const VARIANT_CLASS: Record<string, string> =
  { default: "", secondary: "", primary: "primary"
  , destructive: "danger", link: "tertiary", outline: "tertiary"
  , info: "informational", warning: "warning"
  };
  const variantClass = $derived(VARIANT_CLASS[variant] ?? "");
  const classNames = $derived([variantClass, className].filter(Boolean).join(" ") || undefined);
  const dataSize = $derived(size === "default" ? "md" : size);
</script>

{#if href}
  <a
    {...restProps}
    {href}
    class={classNames}
    role="button"
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
    class={classNames}
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
