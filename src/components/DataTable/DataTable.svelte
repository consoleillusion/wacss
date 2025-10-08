<script lang="ts">
  import { Grid } from "@svar-ui/svelte-grid";

  let {
    data = [],
    columns = [],
    class: className = "",
    ...restProps
  }: {
    data?: Record<string, unknown>[];
    columns?: Record<string, unknown>[];
    class?: string;
    [key: string]: unknown;
  } = $props();
</script>

<div data-datatable-root class={className || undefined}>
  <Grid {data} {columns} {...restProps} />
</div>
