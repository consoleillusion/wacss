<script lang="ts">
  import { Switch as BitsSwitch } from "bits-ui";
  import type { SwitchProps } from "./types";
  import { persistState } from "../persist.svelte";

  let {
    checked = $bindable(false)
    , label
    , description
    , disabled = false
    , required = false
    , name
    , value
    , id
    , storageKey
    , persist = true
    , class: className = ""
    , ...restProps
  }: SwitchProps = $props();

  const uid = $props.id();
  const switchId = $derived(id ?? `switch-${uid}`);

  persistState({
    get: () => checked
    , set: (next) => {
      checked = next;
    }
    , key: () => storageKey ?? (id ? `wacss:switch:${id}` : "wacss:switch")
    , enabled: () => persist
  , });
</script>

<div data-field class={["field", className].filter(Boolean).join(" ")}>
  <div style="display:flex;align-items:center;gap:0.5rem;">
    <BitsSwitch.Root
      {...restProps}
      class="switch"
      bind:checked
      {disabled}
      {required}
      {name}
      {value}
      id={switchId}
    >
      <BitsSwitch.Thumb />
    </BitsSwitch.Root>
    {#if label}
      <label for={switchId}>{label}</label>
    {/if}
  </div>
  {#if description}
    <p data-field-description>{description}</p>
  {/if}
</div>
