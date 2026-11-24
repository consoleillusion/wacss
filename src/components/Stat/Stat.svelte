<script lang="ts">
  // Stat: a number that matters, large, with a label beneath it.
  let {
    value,
    label,
    class: className = "",
    ...restProps
  }: {
    value: number | string;
    label: string;
    class?: string;
    [key: string]: unknown;
  } = $props();
  const classes = $derived(["stat", className].filter(Boolean).join(" "));
</script>

<div {...restProps} class={classes}>
  <data value={String(value)}>{value}</data>
  <span>{label}</span>
</div>
