<script>
  import { Checkbox } from "bits-ui";
  let { children, ...rest } = $props();
</script>

<Checkbox.Root {...rest} data-wacss="checkbox">
  {#if children}
    {@render children()}
  {/if}
</Checkbox.Root>
