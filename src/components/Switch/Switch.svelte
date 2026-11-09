<script>
  import { Switch } from "bits-ui";
  let { children, ...rest } = $props();
</script>

<Switch.Root {...rest} data-wacss="switch">
  {#if children}
    {@render children()}
  {/if}
</Switch.Root>
