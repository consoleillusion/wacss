<script lang="ts">
  import { Slider } from "bits-ui";

  let {
    value = $bindable(150),
    min = 0,
    max = 360,
    step = 1,
    disabled = false,
    class: className = "",
    ...restProps
  }: {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    class?: string;
    [key: string]: unknown;
  } = $props();

  const classes = $derived(["wacss-slider", className].filter(Boolean).join(" "));
</script>

<Slider.Root
  bind:value
  {min}
  {max}
  {step}
  {disabled}
  class={classes}
  data-wacss="slider"
  {...restProps}
>
  <Slider.Range />
  <Slider.Thumb index={0} />
</Slider.Root>
