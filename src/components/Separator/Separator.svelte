<script lang="ts">
  import type { SeparatorProps } from "./types";

  let {
    orientation = "horizontal"
    , decorative = true
    , class: className = ""
    , ...restProps
  }: SeparatorProps = $props();

  const classes = $derived(["separator", className].filter(Boolean).join(" "));
</script>

<hr
  {...restProps}
  class={classes}
  data-orientation={orientation}
  role={decorative ? "none" : "separator"}
  aria-orientation={decorative ? undefined : orientation}
/>
