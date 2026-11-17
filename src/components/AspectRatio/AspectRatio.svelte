<script>
  import { AspectRatio } from "bits-ui";
  let { children, class: className = "", ...rest } = $props();
  const classes = $derived(["aspect-ratio", className].filter(Boolean).join(" "));
</script>

<AspectRatio.Root {...rest} class={classes}>
  {#if children}
    {@render children()}
  {/if}
</AspectRatio.Root>
