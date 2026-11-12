<script>
  import { Tooltip } from "bits-ui";
  let { children, ...rest } = $props();
</script>

<Tooltip.Root {...rest}>
  {#if children}
    {@render children()}
  {/if}
</Tooltip.Root>
