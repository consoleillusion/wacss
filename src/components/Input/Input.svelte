<script lang="ts">
  import type { InputProps } from "../types";
  import { persistState } from "../persist.svelte";

  let {
    value = $bindable(""),
    type = "text",
    placeholder,
    label,
    description,
    error,
    disabled = false,
    readonly = false,
    required = false,
    id,
    name,
    storageKey,
    persist = true,
    class: className = "",
    inputClass = "",
    ...restProps
  }: InputProps = $props();

  const uid = $props.id();
  const inputId = $derived(id ?? `wacss-input-${uid}`);
  const helpId = $derived(`${inputId}-help`);
  const classes = $derived(["wacss-input", className].filter(Boolean).join(" "));
  const inputClasses = $derived(
    ["wacss-input-control", inputClass].filter(Boolean).join(" "),
  );

  persistState({
    get: () => value,
    set: (next) => {
      value = next;
    },
    key: () => storageKey ?? (id ? `wacss:input:${id}` : "wacss:input"),
    enabled: () => persist,
  });
</script>

<div data-wacss="input" class={classes}>
  {#if label}
    <label data-wacss="label" for={inputId}>
      {label}
      {#if required}
        <span data-wacss="label-required" aria-hidden="true">*</span>
      {/if}
    </label>
  {/if}

  <input
    {...restProps}
    id={inputId}
    {name}
    {type}
    {placeholder}
    bind:value
    {disabled}
    {readonly}
    {required}
    class={inputClasses}
    aria-invalid={error ? "true" : undefined}
    aria-describedby={error || description ? helpId : undefined}
    data-wacss="input-control"
  />

  {#if error}
    <p id={helpId} data-wacss="input-error">{error}</p>
  {:else if description}
    <p id={helpId} data-wacss="input-description">{description}</p>
  {/if}
</div>
