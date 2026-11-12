<script lang="ts">
  type FormControlProps = {
    id: string;
    name: string;
    label: string;
    help?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    type?: string;
    value?: string;
    placeholder?: string;
    autocomplete?: string;
    min?: number | string;
    max?: number | string;
    step?: number | string;
    minlength?: number;
    maxlength?: number;
    pattern?: string;
    rows?: number;
    oninput?: (event: Event & { currentTarget: HTMLInputElement | HTMLTextAreaElement }) => void;
  };

  let {
    id,
    name,
    label,
    help,
    error,
    required = false,
    disabled = false,
    readonly = false,
    type = "text",
    value = "",
    placeholder,
    autocomplete,
    min,
    max,
    step,
    minlength,
    maxlength,
    pattern,
    rows,
    oninput,
  }: FormControlProps = $props();

  const multiline = $derived(type === "textarea");
  const helpId = $derived(error || help ? `${id}-help` : undefined);
</script>

<div>
  <label for={id}>
    {label}
    {#if required}
      <span aria-hidden="true">*</span>
    {/if}
  </label>

  {#if multiline}
    <textarea
      {id}
      {name}
      {placeholder}
      {disabled}
      {readonly}
      {required}
      {autocomplete}
      {minlength}
      {maxlength}
      {rows}
      aria-invalid={error ? "true" : undefined}
      aria-describedby={helpId}
      {oninput}
    >{value}</textarea>
  {:else}
    <input
      {id}
      {name}
      {type}
      {value}
      {placeholder}
      {disabled}
      {readonly}
      {required}
      {autocomplete}
      {min}
      {max}
      {step}
      {minlength}
      {maxlength}
      {pattern}
      aria-invalid={error ? "true" : undefined}
      aria-describedby={helpId}
      {oninput}
    />
  {/if}

  {#if error}
    <p id={helpId}>{error}</p>
  {:else if help}
    <p id={helpId}>{help}</p>
  {/if}
</div>
