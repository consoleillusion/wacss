<script lang="ts">
  // LineChart: one line for each series, across the x values of the data. Drawn by LayerChart; its colors are the palette's,
  // --chart-1 onward for the series, and LayerChart's own variables, set in L2.
  import { LineChart as Chart } from "layerchart";

  let {
    data = [],
    x = "x",
    y = "y",
    label = "A line chart",
    class: className = "",
    ...rest
  }: { data?: Record<string, unknown>[]; x?: string; y?: string | string[]; label?: string; class?: string; [key: string]: unknown } = $props();
  const keys = $derived(Array.isArray(y) ? y : [y]);
  const series = $derived(keys.map((k, i) => ({ key: k, label: k, color: `var(--chart-${(i % 6) + 1})` })));
</script>

<div {...rest} class={["line-chart", className].filter(Boolean).join(" ")} role="img" aria-label={label}>
  <Chart {data} {x} {series} legend={keys.length > 1} />
</div>
