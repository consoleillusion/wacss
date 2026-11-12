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
  const classes = $derived(["", className].filter(Boolean).join(" "));
</script>

<div
  {...restProps}
  class={classes}
  data-indeterminate={indeterminate || undefined}
>
  {#if label || showValue}
    <div>
      {#if label}<span>{label}</span>{/if}
      {#if showValue && !indeterminate}
        <span>{Math.round(percent)}%</span>
      {/if}
    </div>
  {/if}
  <div
    role="progressbar"
    aria-valuemin={0}
    aria-valuemax={safeMax}
    aria-valuenow={indeterminate ? undefined : clamped}
    aria-label={label}
  >
    <div style={`width: ${indeterminate ? 40 : percent}%`}></div>
  </div>
</div>
