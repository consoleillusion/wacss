<script>
  import { Meter } from "bits-ui";
  let { children, ...rest } = $props();
</script>

<Meter.Root {...rest}>
  {#if children}
    {@render children()}
  {/if}
</Meter.Root>
