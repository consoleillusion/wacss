<script>
  import { Popover } from "bits-ui";
  let { children, ...rest } = $props();
</script>

<Popover.Root {...rest}>
  {#if children}
    {@render children()}
  {/if}
</Popover.Root>
