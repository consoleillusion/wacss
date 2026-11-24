<script lang="ts">
  // PieChart: one slice for each row, sized by its value. Drawn by LayerChart; its colors are the palette's,
  // --chart-1 onward for the slices, and LayerChart's own variables, set in L2.
  import { PieChart as Chart } from "layerchart";

  let {
    data = [],
    key = "key",
    value = "value",
    label = "A pie chart",
    class: className = "",
    ...rest
  }: { data?: Record<string, unknown>[]; key?: string; value?: string; label?: string; class?: string; [key: string]: unknown } = $props();
  const colors = $derived((data as Record<string, unknown>[]).map((_, i) => `var(--chart-${(i % 6) + 1})`));
</script>

<div {...rest} class={["pie-chart", className].filter(Boolean).join(" ")} role="img" aria-label={label}>
  <Chart {data} {key} {value} label={key} cRange={colors} c={key} legend padding={{ top: 8, bottom: 44, left: 8, right: 8 }} />
</div>
