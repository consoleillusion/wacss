<script lang="ts">
  import { onMount } from "svelte";
  import { Select as BitsSelect } from "bits-ui";
  import type { SelectProps } from "../types";
  import { persistState } from "../persist.svelte";
  import { ACCENT_THEME_NAMES, emitAccentChange, readAccentState, subscribeAccentChange } from "../accent";

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
    onValueChange,
    accentSelector = false,
    ...restProps
  }: SelectProps & { onValueChange?: (value: string | string[]) => void; accentSelector?: boolean } = $props();

  const classes = $derived(["", className].filter(Boolean).join(" "));
  const contentClasses = $derived(
    ["", contentClass].filter(Boolean).join(" "),
  );

  const items = $derived(
    accentSelector
      ? [
          ...options.map((o) => ({ value: o.value, label: o.label, disabled: o.disabled })),
          { value: "custom", label: "Custom" },
        ]
      : options,
  );

  function applyAccent(next: string | string[], fromUser = false) {
    if (!accentSelector || Array.isArray(next)) return;
    if (next === "custom") {
      try {
        const c = localStorage.getItem("wacss:accent-color");
        if (c) {
          document.documentElement.style.setProperty("--color-theme", c);
          document.documentElement.style.setProperty("--color-accent", c);
          emitAccentChange({ source: "custom", color: c });
        }
      } catch {}
      return;
    }
    // Don't clobber an active custom accent unless user explicitly picks a preset.
    if (!fromUser) {
      try {
        if (localStorage.getItem("wacss:accent") === "custom") return;
      } catch {}
    }
    const root = document.documentElement;
    for (const t of ACCENT_THEME_NAMES) root.classList.remove(`theme-${t}`);
    root.style.removeProperty("--color-theme");
    root.style.removeProperty("--color-accent");
    if (ACCENT_THEME_NAMES.includes(next)) root.classList.add(`theme-${next}`);
    try {
      localStorage.setItem("wacss:accent", next);
      localStorage.removeItem("wacss:accent-color");
    } catch {}
    emitAccentChange({ source: "preset", theme: next });
  }

  // Accent-aware selects reflect the currently applied accent, and stay in sync.
  onMount(() => {
    if (!accentSelector) return () => {};
    const sync = (state: { source: string; theme?: string; color?: string }) => {
      if (state.source === "preset" && state.theme) value = state.theme;
      else if (state.source === "custom") value = "custom";
    };
    const state = readAccentState();
    if (state.source !== "none") sync(state);
    return subscribeAccentChange(sync);
  });

  persistState({
    get: () => value,
    set: (next) => { value = next; if (!accentSelector) return; if (typeof next === "string" && next === "custom") return; onValueChange?.(next); applyAccent(next, false); },
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
  items={accentSelector ? [...options.map((o) => ({ value: o.value, label: o.label, disabled: o.disabled })), { value: "custom", label: "Custom" }] : options}
  class={classes || undefined}
  data-type={type}
  onValueChange={(next: string | string[]) => { value = next; onValueChange?.(next); if (accentSelector) applyAccent(next, true); }}
>
  <BitsSelect.Trigger id={id} {...triggerProps} data-select-trigger>
    <BitsSelect.Value {placeholder} />
    <svg
      data-select-icon
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
    <BitsSelect.Content class={contentClasses || undefined} data-select-content>
      <BitsSelect.Viewport data-select-viewport>
        {#each items as option (option.value)}
          <BitsSelect.Item
            value={option.value}
            label={option.label}
            disabled={option.disabled}
            data-select-item
          >
            <span>{option.label}</span>
            <svg
              data-select-item-indicator
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
