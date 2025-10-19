<script lang="ts">
  import type { TextareaProps } from "./types";
  import { persistState } from "../persist.svelte";

  let {
    value = $bindable("")
    , placeholder
    , label
    , description
    , error
    , disabled = false
    , readonly = false
    , required = false
    , rows = 4
    , id
    , name
    , storageKey
    , persist = true
    , class: className = ""
    , inputClass = ""
    , ...restProps
  }: TextareaProps = $props();

  const uid = $props.id();
  const textareaId = $derived(id ?? `textarea-${uid}`);
  const helpId = $derived(`${textareaId}-help`);

  persistState({
    get: () => value
    , set: (next) => {
      value = next;
    }
    , key: () => storageKey ?? (id ? `wacss:textarea:${id}` : "wacss:textarea")
    , enabled: () => persist
  , });
</script>

<div data-textarea-root class={className || undefined}>
  {#if label}
    <label for={textareaId}>
      {label}
      {#if required}<span aria-hidden="true">*</span>{/if}
    </label>
  {/if}

  <textarea
    {...restProps}
    id={textareaId}
    {name}
    {placeholder}
    {rows}
    bind:value
    {disabled}
    {readonly}
    {required}
    class={inputClass || undefined}
    aria-invalid={error ? "true" : undefined}
    aria-describedby={error || description ? helpId : undefined}
  ></textarea>

  {#if error}
    <p id={helpId} data-field-error>{error}</p>
  {:else if description}
    <p id={helpId} data-field-description>{description}</p>
  {/if}
</div>
