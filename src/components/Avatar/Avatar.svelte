<script>
  import { Avatar } from "bits-ui";
  let { children, ...rest } = $props();
</script>

<Avatar.Root {...rest} data-wacss="avatar">
  {#if children}
    {@render children()}
  {/if}
</Avatar.Root>
