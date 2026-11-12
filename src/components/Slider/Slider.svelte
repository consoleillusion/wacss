<script lang="ts">
  import { Slider } from "bits-ui";

  let {
    value = $bindable(50)
    , min = 0
    , max = 100
    , step = 1
    , disabled = false
    , class: className = ""
    , onValueChange
    , ...restProps
  }: {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    class?: string;
    onValueChange?: (value: number) => void;
    [key: string]: unknown;
  } = $props();
</script>

<Slider.Root
  type="single"
  value={value}
  {min}
  {max}
  {step}
  {disabled}
  class={className || undefined}
  data-slider-root
  onValueChange={(v) => { value = v; onValueChange?.(v); }}
  {...restProps}
>
  <span data-slider-track>
    <Slider.Range data-slider-range />
  </span>
  <Slider.Thumb index={0} data-slider-thumb />
</Slider.Root>
