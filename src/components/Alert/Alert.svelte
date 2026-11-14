<script lang="ts">
  import type { AlertProps, AlertVariant } from "./types";

  let {
    variant = "info" as AlertVariant
    , title
    , description
    , children
    , class: className = ""
    , ...restProps
  }: AlertProps = $props();

  const uid = $props.id();
  const titleId = $derived(title ? `alert-title-${uid}` : undefined);
</script>

<div role="alert" data-alert-root data-variant={variant} class={className || undefined} aria-labelledby={titleId} {...restProps}>
  <div data-alert-icon aria-hidden="true">
    {#if variant === "info"}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 10v6" />
        <path d="M12 7h.01" />
      </svg>
    {:else if variant === "warning"}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
        <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
      </svg>
    {:else if variant === "positive"}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="m8.5 12.5 2.5 2.5 4.5-5" />
      </svg>
    {:else}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    {/if}
  </div>

  <div data-alert-body>
    {#if title}
      <p id={titleId} data-alert-title>{title}</p>
    {/if}
    {#if description}
      <p data-alert-description>{description}</p>
    {/if}
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>
