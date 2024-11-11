<script>
  import { Separator } from "bits-ui";
  let { children, ...rest } = $props();
</script>

<Separator.Root {...rest} data-wacss="separator">
  {#if children}
    {@render children()}
  {/if}
</Separator.Root>
