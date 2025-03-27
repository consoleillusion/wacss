<script lang="ts">
  import type { InputProps } from "../types";
  import { persistState } from "../persist.svelte";

  let {
    value = $bindable("#6d9469"),
    label,
    description,
    error,
    disabled = false,
    id,
    name,
    storageKey,
    persist = true,
    class: className = "",
    inputClass = "",
    ...restProps
  }: InputProps & { value?: string } = $props();

  const uid = $props.id();
  const inputId = $derived(id ?? `wacss-color-picker-${uid}`);
  const helpId = $derived(`${inputId}-help`);
  const classes = $derived(["wacss-input", "wacss-color-picker", className].filter(Boolean).join(" "));
  const inputClasses = $derived(["wacss-input-control", inputClass].filter(Boolean).join(" "));

  function normalizeHex(v: string): string | null {
    const m = /^#?([0-9a-f]{6})$/i.exec(v.trim());
    return m ? `#${m[1].toLowerCase()}` : null;
  }

  function setValue(v: string) {
    value = v;
  }

  persistState({
    get: () => value,
    set: (next) => { value = next; },
    key: () => storageKey ?? (id ? `wacss:color-picker:${id}` : "wacss:color-picker"),
    enabled: () => persist,
  });
</script>

<div data-wacss="input" data-wacss-color-picker class={classes}>
  {#if label}
    <label data-wacss="label" for={inputId}>{label}</label>
  {/if}
  <div data-wacss="color-input-row">
    <input
      {...restProps}
      id={inputId}
      {name}
      type="color"
      value={value}
      {disabled}
      class={inputClasses}
      aria-invalid={error ? "true" : undefined}
      aria-describedby={error || description ? helpId : undefined}
      data-wacss="input-control"
      data-wacss-color-swatch
      oninput={(e) => setValue((e.currentTarget as HTMLInputElement).value)}
      onchange={(e) => setValue((e.currentTarget as HTMLInputElement).value)}
    />
    <input
      type="text"
      value={value}
      {disabled}
      data-wacss="input-control"
      aria-label={label ? `${label} hex value` : "Color hex value"}
      oninput={(e) => {
        const n = normalizeHex((e.currentTarget as HTMLInputElement).value);
        if (n) setValue(n);
      }}
      onchange={(e) => {
        const n = normalizeHex((e.currentTarget as HTMLInputElement).value);
        if (n) setValue(n);
      }}
    />
  </div>
  {#if error}
    <p id={helpId} data-wacss="input-error">{error}</p>
  {:else if description}
    <p id={helpId} data-wacss="input-description">{description}</p>
  {/if}
</div>
