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
  const inputId = $derived(id ?? `input-${uid}`);
  const helpId = $derived(`${inputId}-help`);

  persistState({
    get: () => value,
    set: (next) => {
      value = next;
    },
    key: () => storageKey ?? (id ? `wacss:input:${id}` : "wacss:input"),
    enabled: () => persist,
  });
</script>

<div class={className || undefined}>
  {#if label}
    <label for={inputId}>
      {label}
      {#if required}<span aria-hidden="true">*</span>{/if}
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
    class={inputClass || undefined}
    aria-invalid={error ? "true" : undefined}
    aria-describedby={error || description ? helpId : undefined}
  />

  {#if error}
    <p id={helpId}>{error}</p>
  {:else if description}
    <p id={helpId}>{description}</p>
  {/if}
</div>
