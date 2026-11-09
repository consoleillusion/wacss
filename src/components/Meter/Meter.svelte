<script>
  import { Meter } from "bits-ui";
  let { children, ...rest } = $props();
</script>

<Meter.Root {...rest} data-wacss="meter">
  {#if children}
    {@render children()}
  {/if}
</Meter.Root>
