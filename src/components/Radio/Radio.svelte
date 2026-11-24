<script lang="ts">
  // Radio: one choice from several, as native radio buttons in a Fieldset under a legend.
  import Fieldset from "../Fieldset/Fieldset.svelte";
  let {
    legend,
    name,
    options = [],
    value = $bindable(),
    required = false,
    disabled = false,
    class: className = "",
    ...restProps
  }: {
    legend?: string;
    name: string;
    options?: { value: string; label: string }[];
    value?: string;
    required?: boolean;
    disabled?: boolean;
    class?: string;
    [key: string]: unknown;
  } = $props();
</script>

<Fieldset {...restProps} {legend} {disabled} class={className}>
  {#each options as option (option.value)}
    <label class="cluster">
      <input type="radio" {name} value={option.value} {required} bind:group={value} />
      <span>{option.label}</span>
    </label>
  {/each}
</Fieldset>
