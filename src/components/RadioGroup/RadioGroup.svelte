<script>
  import { RadioGroup } from "bits-ui";
  let { children, ...rest } = $props();
</script>

<RadioGroup.Root {...rest}>
  {#if children}
    {@render children()}
  {/if}
</RadioGroup.Root>
