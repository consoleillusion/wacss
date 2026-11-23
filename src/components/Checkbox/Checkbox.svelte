<script lang="ts">
  // Checkbox: a native checkbox driven by data, with its label beside it and any help below.
  let {
    label,
    help,
    checked = $bindable(false),
    name,
    value,
    required = false,
    disabled = false,
    id,
    class: className = "",
    ...restProps
  }: {
    label?: string;
    help?: string;
    checked?: boolean;
    name?: string;
    value?: string;
    required?: boolean;
    disabled?: boolean;
    id?: string;
    class?: string;
    [key: string]: unknown;
  } = $props();
</script>

<div class={className || "stack"}>
  <label class="cluster">
    <input {...restProps} type="checkbox" {id} {name} {value} {required} {disabled} bind:checked />
    {#if label}<span>{label}</span>{/if}
  </label>
  {#if help}<small>{help}</small>{/if}
</div>
