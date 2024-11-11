<script>
  import { Accordion } from "bits-ui";
  let { children, ...rest } = $props();
</script>

<Accordion.Root {...rest} data-wacss="accordion">
  {#if children}
    {@render children()}
  {/if}
</Accordion.Root>
