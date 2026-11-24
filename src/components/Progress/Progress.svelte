<script lang="ts">
  // Progress: a native progress bar with a label above it and a line of text below.
  let {
    label,
    value,
    max = 1,
    text,
    variant = "secondary",
    id,
    class: className = "",
    ...restProps
  }: {
    label?: string;
    value?: number;
    max?: number;
    text?: string;
    variant?: "secondary" | "positive" | "warning" | "danger" | "informational";
    id?: string;
    class?: string;
    [key: string]: unknown;
  } = $props();
  const uid = $props.id();
  const barId = $derived(id ?? `progress-${uid}`);
</script>

<div class={className || "stack"}>
  {#if label}<label for={barId}>{label}</label>{/if}
  <progress {...restProps} id={barId} class={variant === "secondary" ? undefined : variant} {value} {max}></progress>
  {#if text}<small>{text}</small>{/if}
</div>
