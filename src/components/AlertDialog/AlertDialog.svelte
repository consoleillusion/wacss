<script>
  import { AlertDialog } from "bits-ui";
  let { children, ...rest } = $props();
</script>

<AlertDialog.Root {...rest}>
  {#if children}
    {@render children()}
  {/if}
</AlertDialog.Root>
