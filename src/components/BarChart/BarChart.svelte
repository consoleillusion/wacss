<script lang="ts">
  // BarChart: one bar for each row, or a group of bars, one for each series. Drawn by LayerChart; its colours are the palette's,
  // --chart-1 onward for the series, and LayerChart's own variables, set in L2.
  import { BarChart as Chart } from "layerchart";

  let {
    data = [],
    x = "x",
    y = "y",
    label = "A bar chart",
    class: className = "",
    ...rest
  }: { data?: Record<string, unknown>[]; x?: string; y?: string | string[]; label?: string; class?: string; [key: string]: unknown } = $props();
  const keys = $derived(Array.isArray(y) ? y : [y]);
  const series = $derived(keys.map((k, i) => ({ key: k, label: k, color: `var(--chart-${(i % 6) + 1})` })));
</script>

<div {...rest} class={["bar-chart", className].filter(Boolean).join(" ")} role="img" aria-label={label}>
  <Chart {data} {x} {series} legend={keys.length > 1} seriesLayout="group" />
</div>
