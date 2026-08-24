<script>
  import { Progress } from "bits-ui";
  let { children, ...rest } = $props();
</script>

<Progress.Root {...rest} data-wacss="progress">
  {#if children}
    {@render children()}
  {/if}
</Progress.Root>
