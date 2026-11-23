<script lang="ts">
  // Select: a native select driven by data, with its label. Styled by the generated `select`
  // element rules; the label and select are arranged by the .cluster layout helper.
  type Option = string | { value: string; label?: string };

  let {
    label,
    options = [],
    value = $bindable(),
    name,
    disabled = false,
    id,
    class: className = "",
    onchange,
    ...restProps
  }: {
    label?: string;
    options?: Option[];
    value?: string;
    name?: string;
    disabled?: boolean;
    id?: string;
    class?: string;
    onchange?: (value: string) => void;
    [key: string]: unknown;
  } = $props();

  const valueOf = (o: Option) =>
    // Purpose: an option's value, whether given as a string or a record
    typeof o === "string" ? o : o.value;
  const labelOf = (o: Option) =>
    // Purpose: an option's visible text: its label, else its value
    typeof o === "string" ? o : o.label ?? o.value;
</script>

<label class={className || "cluster"}>
  {#if label}<span>{label}</span>{/if}
  <select {...restProps} {id} {name} {disabled} bind:value onchange={(e) => onchange?.(e.currentTarget.value)}>
    {#each options as o (valueOf(o))}<option value={valueOf(o)}>{labelOf(o)}</option>{/each}
  </select>
</label>
