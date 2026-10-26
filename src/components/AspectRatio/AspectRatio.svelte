<script>
  import { AspectRatio } from "bits-ui";
  let { children, ...rest } = $props();
</script>

<AspectRatio.Root {...rest}>
  {#if children}
    {@render children()}
  {/if}
</AspectRatio.Root>
