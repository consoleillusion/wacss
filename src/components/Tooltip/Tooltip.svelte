<script>
  import { Tooltip } from "bits-ui";
  let { children, ...rest } = $props();
</script>

<Tooltip.Root {...rest} data-wacss="tooltip">
  {#if children}
    {@render children()}
  {/if}
</Tooltip.Root>
