<script>
  import { DropdownMenu } from "bits-ui";
  let { children, ...rest } = $props();
</script>

<DropdownMenu.Root {...rest} data-wacss="dropdown-menu">
  {#if children}
    {@render children()}
  {/if}
</DropdownMenu.Root>
