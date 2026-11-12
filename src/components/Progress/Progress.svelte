<script lang="ts">
  import type { ProgressProps } from "../types";

  let {
    value = null,
    max = 100,
    label,
    showValue = false,
    class: className = "",
    ...restProps
  }: ProgressProps = $props();

  const safeMax = $derived(max > 0 ? max : 100);
  const clamped = $derived(
    value == null ? null : Math.min(safeMax, Math.max(0, value)),
  );
  const percent = $derived(clamped == null ? 0 : (clamped / safeMax) * 100);
  const indeterminate = $derived(value == null);
  const classes = $derived(["wacss-progress", className].filter(Boolean).join(" "));
</script>

<div
  {...restProps}
  class={classes}
  data-wacss="progress"
  data-indeterminate={indeterminate || undefined}
>
  {#if label || showValue}
    <div data-wacss="progress-header">
      {#if label}<span data-wacss="progress-label">{label}</span>{/if}
      {#if showValue && !indeterminate}
        <span data-wacss="progress-value">{Math.round(percent)}%</span>
      {/if}
    </div>
  {/if}
  <div
    data-wacss="progress-track"
    role="progressbar"
    aria-valuemin={0}
    aria-valuemax={safeMax}
    aria-valuenow={indeterminate ? undefined : clamped}
    aria-label={label}
  >
    <div data-wacss="progress-indicator" style={`width: ${indeterminate ? 40 : percent}%`}></div>
  </div>
</div>
