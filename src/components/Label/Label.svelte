<script>
  import { Label } from "bits-ui";
  let { children, ...rest } = $props();
</script>

<Label.Root {...rest} data-wacss="label">
  {#if children}
    {@render children()}
  {/if}
</Label.Root>
