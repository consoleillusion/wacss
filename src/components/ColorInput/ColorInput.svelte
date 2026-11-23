<script lang="ts">
  // ColorInput: a native input driven by data, with its label above it and any help below.
  // Styled by the generated element rules; label, input and help are arranged by the .stack helper.
  let {
    label,
    help,
    
    value = $bindable(),
    name,
    required = false,
    disabled = false,
    id,
    class: className = "",
    ...restProps
  }: {
    label?: string;
    help?: string;
    
    value?: string | number;
    name?: string;
    required?: boolean;
    disabled?: boolean;
    id?: string;
    class?: string;
    [key: string]: unknown;
  } = $props();
</script>

<label class={className || "stack"}>
  {#if label}<span>{label}</span>{/if}
  <input {...restProps} type="color" {id} {name} {required} {disabled} bind:value />
  {#if help}<small>{help}</small>{/if}
</label>
