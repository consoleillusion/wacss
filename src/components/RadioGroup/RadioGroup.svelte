<script>
  import { RadioGroup } from "bits-ui";
  let { children, ...rest } = $props();
</script>

<RadioGroup.Root {...rest} data-wacss="radio-group">
  {#if children}
    {@render children()}
  {/if}
</RadioGroup.Root>
