<script>
  import { Select } from "bits-ui";
  let { children, ...rest } = $props();
</script>

<Select.Root {...rest} data-wacss="select">
  {#if children}
    {@render children()}
  {/if}
</Select.Root>
