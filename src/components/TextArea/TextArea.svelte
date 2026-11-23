<script lang="ts">
  // TextArea: a native textarea driven by data, with its label above it and any help below.
  let {
    label,
    help,
    value = $bindable(),
    name,
    rows = 4,
    required = false,
    disabled = false,
    id,
    class: className = "",
    ...restProps
  }: {
    label?: string;
    help?: string;
    value?: string;
    name?: string;
    rows?: number;
    required?: boolean;
    disabled?: boolean;
    id?: string;
    class?: string;
    [key: string]: unknown;
  } = $props();
</script>

<label class={className || "stack"}>
  {#if label}<span>{label}</span>{/if}
  <textarea {...restProps} {id} {name} {rows} {required} {disabled} bind:value></textarea>
  {#if help}<small>{help}</small>{/if}
</label>
