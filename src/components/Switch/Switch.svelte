<script lang="ts">
  import { Switch as BitsSwitch } from "bits-ui";
  import type { SwitchProps } from "../types";
  import { persistState } from "../persist.svelte";

  let {
    checked = $bindable(false),
    label,
    description,
    disabled = false,
    required = false,
    name,
    value,
    id,
    storageKey,
    persist = true,
    class: className = "",
    ...restProps
  }: SwitchProps = $props();

  const classes = $derived(["", className].filter(Boolean).join(" "));

  persistState({
    get: () => checked,
    set: (next) => {
      checked = next;
    },
    key: () => storageKey ?? (id ? `wacss:switch:${id}` : "wacss:switch"),
    enabled: () => persist,
  });
</script>

<BitsSwitch.Root
  {...restProps}
  bind:checked
  {disabled}
  {required}
  {name}
  {value}
  {id}
  class={classes}
>
  <span>
    <BitsSwitch.Thumb />
  </span>
  {#if label}
    <span>{label}</span>
  {/if}
</BitsSwitch.Root>

{#if description}
  <p>{description}</p>
{/if}
