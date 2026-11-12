<script>
  import { AspectRatio } from "bits-ui";
  let { children, ...rest } = $props();
</script>

<AspectRatio.Root {...rest} data-wacss="aspect-ratio">
  {#if children}
    {@render children()}
  {/if}
</AspectRatio.Root>
