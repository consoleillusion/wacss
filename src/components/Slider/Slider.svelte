<script lang="ts">
  // Slider: a value, or a range between two values, chosen along a track. Wraps the bits-ui
  // Slider, which gives the thumbs their keyboard control.
  import { Slider } from "bits-ui";
  let {
    label,
    min = 0,
    max = 100,
    step = 1,
    value = $bindable(50),
    text,
    disabled = false,
    class: className = "",
    ...restProps
  }: {
    label?: string;
    min?: number;
    max?: number;
    step?: number;
    value?: number | number[];
    text?: string;
    disabled?: boolean;
    class?: string;
    [key: string]: unknown;
  } = $props();
  const uid = $props.id();
  const labelId = `slider-${uid}`;
</script>

<div class={className || "stack"}>
  {#if label}<span id={labelId}>{label}</span>{/if}
  {#if Array.isArray(value)}
    <Slider.Root {...restProps} type="multiple" class="slider" {min} {max} {step} {disabled} aria-labelledby={label ? labelId : undefined} bind:value={value as number[]}>
      {#snippet children({ thumbItems })}
        <Slider.Range />
        {#each thumbItems as { index } (index)}<Slider.Thumb {index} aria-label={index ? "End" : "Start"} />{/each}
      {/snippet}
    </Slider.Root>
  {:else}
    <Slider.Root {...restProps} type="single" class="slider" {min} {max} {step} {disabled} aria-labelledby={label ? labelId : undefined} bind:value={value as number}>
      {#snippet children({ thumbItems })}
        <Slider.Range />
        {#each thumbItems as { index } (index)}<Slider.Thumb {index} aria-labelledby={label ? labelId : undefined} />{/each}
      {/snippet}
    </Slider.Root>
  {/if}
  {#if text}<small>{text}</small>{/if}
</div>
