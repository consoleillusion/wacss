<script>
  import { ContextMenu } from "bits-ui";
  let { children, ...rest } = $props();
</script>

<ContextMenu.Root {...rest}>
  {#if children}
    {@render children()}
  {/if}
</ContextMenu.Root>
