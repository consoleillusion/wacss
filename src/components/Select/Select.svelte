<script lang="ts">
  import { Select as BitsSelect } from "bits-ui";
  import type { SelectProps } from "../types";
  import { persistState } from "../persist.svelte";

  let {
    options = [],
    type = "single",
    value = $bindable<string | string[]>(type === "multiple" ? [] : ""),
    placeholder = "Select an option",
    disabled = false,
    required = false,
    name,
    id,
    storageKey = "wacss:select",
    persist = true,
    class: className = "",
    contentClass = "",
    triggerProps,
    ...restProps
  }: SelectProps = $props();

  const classes = $derived(["wacss-select", className].filter(Boolean).join(" "));
  const contentClasses = $derived(
    ["wacss-select-content", contentClass].filter(Boolean).join(" "),
  );

  persistState({
    get: () => value,
    set: (next) => {
      value = next;
    },
    key: () => storageKey,
    enabled: () => persist,
  });
</script>

<BitsSelect.Root
  {...restProps}
  {type}
  bind:value
  {disabled}
  {required}
  {name}
  items={options}
  class={classes}
  data-wacss="select"
  data-type={type}
>
  <BitsSelect.Trigger id={id} {...triggerProps} data-wacss="select-trigger">
    <BitsSelect.Value {placeholder} />
    <svg
      data-wacss="select-icon"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="m4 6 4 4 4-4" />
    </svg>
  </BitsSelect.Trigger>

  <BitsSelect.Portal>
    <BitsSelect.Content class={contentClasses} data-wacss="select-content">
      <BitsSelect.Viewport data-wacss="select-viewport">
        {#each options as option (option.value)}
          <BitsSelect.Item
            value={option.value}
            label={option.label}
            disabled={option.disabled}
            data-wacss="select-item"
          >
            <span data-wacss="select-item-label">{option.label}</span>
            <svg
              data-wacss="select-item-check"
              viewBox="0 0 16 16"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="m3.5 8.5 3 3 6-7" />
            </svg>
          </BitsSelect.Item>
        {/each}
      </BitsSelect.Viewport>
    </BitsSelect.Content>
  </BitsSelect.Portal>
</BitsSelect.Root>
