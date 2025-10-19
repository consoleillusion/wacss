<script lang="ts">
  import type { SeparatorProps } from "./types";

  let {
    orientation = "horizontal"
    , decorative = true
    , class: className = ""
    , ...restProps
  }: SeparatorProps = $props();

  const classes = $derived(["", className].filter(Boolean).join(" "));
</script>

<div
  {...restProps}
  class={classes}
  data-orientation={orientation}
  role={decorative ? "none" : "separator"}
  aria-orientation={decorative ? undefined : orientation}
></div>
