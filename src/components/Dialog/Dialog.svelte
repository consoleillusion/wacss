<script lang="ts">
  import { Dialog as BitsDialog } from "bits-ui";
  import type { DialogProps } from "./types";

  let {
    open = $bindable(false)
    , title
    , description
    , triggerLabel = "Open dialog"
    , closeLabel = "Close dialog"
    , class: className = ""
    , children
    , footer
    , trigger
    , ...restProps
  }: DialogProps = $props();
</script>

<BitsDialog.Root bind:open>
  <BitsDialog.Trigger>
    {#if trigger}
      {@render trigger()}
    {:else}
      {triggerLabel}
    {/if}
  </BitsDialog.Trigger>

  <BitsDialog.Portal>
    <BitsDialog.Overlay data-dialog-overlay />
    <BitsDialog.Content {...restProps} class={className || undefined} data-dialog-content>
      <header data-dialog-header>
        {#if title}
          <BitsDialog.Title data-dialog-title>{title}</BitsDialog.Title>
        {/if}
        {#if description}
          <BitsDialog.Description data-dialog-description>{description}</BitsDialog.Description>
        {/if}
      </header>

      {#if children}
        <div data-dialog-body>
          {@render children()}
        </div>
      {/if}

      {#if footer}
        <footer data-dialog-footer>
          {@render footer()}
        </footer>
      {/if}

      <BitsDialog.Close aria-label={closeLabel} data-dialog-close>
        <svg viewBox="0 0 15 15" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
          <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" stroke="none"/>
        </svg>
      </BitsDialog.Close>
    </BitsDialog.Content>
  </BitsDialog.Portal>
</BitsDialog.Root>
