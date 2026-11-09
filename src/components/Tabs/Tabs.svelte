<script>
  import { Tabs } from "bits-ui";
  let { children, ...rest } = $props();
</script>

<Tabs.Root {...rest} data-wacss="tabs">
  {#if children}
    {@render children()}
  {/if}
</Tabs.Root>
