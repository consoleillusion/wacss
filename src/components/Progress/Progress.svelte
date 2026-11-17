<script lang="ts">
  import type { ProgressProps } from "./types";

  let {
    value = null
    , max = 100
    , label
    , showValue = false
    , disabled = false
    , class: className = ""
    , ...restProps
  }: ProgressProps = $props();

  const safeMax = $derived(max > 0 ? max : 100);
  const clamped = $derived(
    value == null ? null : Math.min(safeMax, Math.max(0, value))
  , );
  const percent = $derived(clamped == null ? 0 : (clamped / safeMax) * 100);
  const indeterminate = $derived(value == null);
  const classes = $derived(["progress", className].filter(Boolean).join(" "));
  const indicatorStyle = $derived(
    [ `width: ${indeterminate ? 40 : percent}%`
    , "height: 100%"
    , "background: currentColor"
    , "border-radius: inherit"
    , "transition: width var(--duration-interaction)"
    , indeterminate
        ? "animation: wacss-progress-indeterminate var(--duration-indeterminate) var(--ease-ambient) infinite"
        : ""
    ].filter(Boolean).join("; ")
  );
</script>

{#if label || showValue}
  <div>
    {#if label}<span>{label}</span>{/if}
    {#if showValue && !indeterminate}
      <span>{Math.round(percent)}%</span>
    {/if}
  </div>
{/if}

<div
  {...restProps}
  class={classes}
  role="progressbar"
  aria-valuemin={0}
  aria-valuemax={safeMax}
  aria-valuenow={indeterminate ? undefined : clamped}
  aria-label={label}
  data-disabled={disabled || undefined}
  data-indeterminate={indeterminate || undefined}
>
  <div style={indicatorStyle}></div>
</div>
