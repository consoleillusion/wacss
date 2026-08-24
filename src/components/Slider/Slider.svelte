<script>
  import { Slider } from "bits-ui";
  let { children, ...rest } = $props();
</script>

<Slider.Root {...rest} data-wacss="slider">
  {#if children}
    {@render children()}
  {/if}
</Slider.Root>
