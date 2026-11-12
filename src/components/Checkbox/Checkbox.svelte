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

  const classes = $derived(["", className].filter(Boolean).join(" "));

  persistState({
    get: () => checked,
    set: (next) => {
      checked = next;
    },
    key: () => storageKey ?? (id ? `wacss:checkbox:${id}` : "wacss:checkbox"),
    enabled: () => persist,
  });
</script>

<BitsCheckbox.Root
  {...restProps}
  bind:checked
  bind:indeterminate
  {disabled}
  {required}
  {readonly}
  {name}
  {value}
  {id}
  class={classes}
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
    {#if label}
      <span>{label}</span>
    {/if}
  {/snippet}
</BitsCheckbox.Root>

{#if description}
  <p>{description}</p>
{/if}
