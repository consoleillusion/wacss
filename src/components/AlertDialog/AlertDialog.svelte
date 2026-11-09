<script>
  import { AlertDialog } from "bits-ui";
  let { children, ...rest } = $props();
</script>

<AlertDialog.Root {...rest} data-wacss="alert-dialog">
  {#if children}
    {@render children()}
  {/if}
</AlertDialog.Root>
