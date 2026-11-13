<script lang="ts">
  import { Checkbox as BitsCheckbox } from "bits-ui";
  import type { CheckboxProps } from "../types";
  import { persistState } from "../persist.svelte";

  let {
    checked = $bindable(false),
    indeterminate = $bindable(false),
    label,
    description,
    disabled = false,
    required = false,
    readonly = false,
    name,
    value,
    id,
    storageKey,
    persist = true,
    class: className = "",
    ...restProps
  }: CheckboxProps = $props();

  const uid = $props.id();
  const inputId = $derived(id ?? `checkbox-${uid}`);

  persistState({
    get: () => checked,
    set: (next) => {
      checked = next;
    },
    key: () => storageKey ?? (id ? `wacss:checkbox:${id}` : "wacss:checkbox"),
    enabled: () => persist,
  });
</script>

<div data-field class={className || undefined}>
  <div style="display:flex;align-items:center;gap:0.5rem;">
    <BitsCheckbox.Root
      {...restProps}
      bind:checked
      bind:indeterminate
      {disabled}
      {required}
      {readonly}
      {name}
      {value}
      id={inputId}
    >
      {#snippet children({ checked, indeterminate })}
        <span
          data-state={indeterminate ? "indeterminate" : checked ? "checked" : "unchecked"}
        >
          {#if indeterminate}
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M4 8h8" />
            </svg>
          {:else if checked}
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="m3.5 8.5 3 3 6-7" />
            </svg>
          {/if}
        </span>
      {/snippet}
    </BitsCheckbox.Root>
    {#if label}
      <label for={inputId}>{label}</label>
    {/if}
  </div>
  {#if description}
    <p data-field-description>{description}</p>
  {/if}
</div>
