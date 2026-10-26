<script>
  import { Toggle } from "bits-ui";
  let { children, ...rest } = $props();
</script>

<Toggle.Root {...rest}>
  {#if children}
    {@render children()}
  {/if}
</Toggle.Root>
