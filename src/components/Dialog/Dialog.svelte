<script>
  import { Dialog } from "bits-ui";
  let { children, ...rest } = $props();
</script>

<Dialog.Root {...rest} data-wacss="dialog">
  {#if children}
    {@render children()}
  {/if}
</Dialog.Root>
