<script lang="ts">
  import { Dialog as BitsDialog } from "bits-ui";
  import type { DialogProps } from "../types";

  let {
    open = $bindable(false),
    title,
    description,
    triggerLabel = "Open dialog",
    closeLabel = "Close dialog",
    class: className = "",
    children,
    footer,
    trigger,
    ...restProps
  }: DialogProps = $props();

  const classes = $derived(["wacss-dialog", className].filter(Boolean).join(" "));
</script>

<BitsDialog.Root bind:open data-wacss="dialog">
  <BitsDialog.Trigger data-wacss="dialog-trigger">
    {#if trigger}
      {@render trigger()}
    {:else}
      {triggerLabel}
    {/if}
  </BitsDialog.Trigger>

  <BitsDialog.Portal>
    <BitsDialog.Overlay data-wacss="dialog-overlay" />
    <BitsDialog.Content {...restProps} class={classes} data-wacss="dialog-content">
      {#if title}
        <BitsDialog.Title data-wacss="dialog-title">{title}</BitsDialog.Title>
      {/if}
      {#if description}
        <BitsDialog.Description data-wacss="dialog-description">
          {description}
        </BitsDialog.Description>
      {/if}

      {#if children}
        <div data-wacss="dialog-body">
          {@render children()}
        </div>
      {/if}

      {#if footer}
        <div data-wacss="dialog-footer">
          {@render footer()}
        </div>
      {/if}

      <BitsDialog.Close data-wacss="dialog-close" aria-label={closeLabel}>
        <svg
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          aria-hidden="true"
        >
          <path d="m4 4 8 8M12 4l-8 8" />
        </svg>
      </BitsDialog.Close>
    </BitsDialog.Content>
  </BitsDialog.Portal>
</BitsDialog.Root>
