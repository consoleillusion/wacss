<script>
  import { Button } from "bits-ui";
  let { children, ...rest } = $props();
</script>

<Button.Root {...rest} data-wacss="button">
  {#if children}
    {@render children()}
  {/if}
</Button.Root>
