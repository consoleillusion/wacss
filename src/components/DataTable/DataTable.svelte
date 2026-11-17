<script lang="ts">
  import { Grid } from "@svar-ui/svelte-grid";

  let {
    data = []
    , columns = []
    , class: className = ""
    , ...restProps
  }: {
    data?: Record<string, unknown>[];
    columns?: Record<string, unknown>[];
    class?: string;
    [key: string]: unknown;
  } = $props();
</script>

<div class={["datatable", className].filter(Boolean).join(" ")}>
  <Grid {data} {columns} {...restProps} />
</div>
