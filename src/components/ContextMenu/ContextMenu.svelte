<script>
  import { ContextMenu } from "bits-ui";
  let { children, ...rest } = $props();
</script>

<ContextMenu.Root {...rest} data-wacss="context-menu">
  {#if children}
    {@render children()}
  {/if}
</ContextMenu.Root>
