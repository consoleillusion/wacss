<script>
  import { Toggle } from "bits-ui";
  let { children, class: className = "", ...rest } = $props();
  const classes = $derived(["toggle", className].filter(Boolean).join(" "));
</script>

<Toggle.Root {...rest} class={classes}>
  {#if children}
    {@render children()}
  {/if}
</Toggle.Root>
