<script lang="ts">
  import { onMount } from "svelte";
  import type { InputProps } from "../types";
  import { persistState } from "../persist.svelte";
  import {
    applyAccentToRoot,
    emitAccentChange,
    hexToHue,
    hueToAccent,
    oklchToHex,
    subscribeAccentChange,
  } from "../accent";

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
    accentSelector = false,
    class: className = "",
    inputClass = "",
    ...restProps
  }: InputProps & { value?: string; accentSelector?: boolean } = $props();

  const uid = $props.id();
  const inputId = $derived(id ?? `wacss-color-${uid}`);
  const helpId = $derived(`${inputId}-help`);
  const classes = $derived(["wacss-input", "wacss-color-input", className].filter(Boolean).join(" "));
  const inputClasses = $derived(["wacss-input-control", inputClass].filter(Boolean).join(" "));
  const sliderClasses = $derived(["wacss-accent-slider", inputClass].filter(Boolean).join(" "));

  let hue = $state<number | null>(150);
  let accentHex = $state<string>("#6d9469");

  function readHue(): number | null {
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--alias-accent");
    const hex = oklchToHex(accent.trim());
    const h = hex ? hexToHue(hex) : null;
    if (h != null) hue = h;
    return h;
  }

  function readAccentHex(): string {
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--alias-accent");
    const hex = oklchToHex(accent.trim());
    if (hex) accentHex = hex;
    return hex ?? "#6d9469";
  }

  function setAccentFromHue(h: number) {
    const isDark = document.documentElement.classList.contains("dark") || (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    const accent = hueToAccent(h, isDark);
    applyAccentToRoot(undefined, accent);
    try {
      localStorage.setItem("wacss:accent", "custom");
      localStorage.setItem("wacss:accent-color", accent);
    } catch {
      /* storage unavailable */
    }
    emitAccentChange({ source: "custom", color: accent });
    hue = h;
  }

  function onHueInput(h: number) {
    if (!Number.isFinite(h)) return;
    setAccentFromHue(Math.round(h));
  }

  function onPick(v: string) {
    if (!accentSelector) return;
    const h = hexToHue(v);
    if (h != null) setAccentFromHue(h);
  }

  // Follow accent changes from any accent-aware island; write picks back to `value`/`hue`.
  onMount(() => {
    if (!accentSelector) return () => {};
    readHue();
    readAccentHex();
    return subscribeAccentChange(() => {
      readHue();
      readAccentHex();
    });
  });

  persistState({
    get: () => value,
    set: (next) => { value = next; },
    key: () => storageKey ?? (id ? `wacss:color:${id}` : "wacss:color"),
    enabled: () => persist,
  });
</script>

<div data-wacss="input" data-wacss-color-input class={classes}>
  {#if label}
    <label data-wacss="label" for={inputId}>{label}</label>
  {/if}
  {#if accentSelector}
    <div data-wacss="accent-selector">
      <input
        type="range"
        min={0}
        max={360}
        value={hue ?? 0}
        {disabled}
        class={sliderClasses}
        aria-label={label ? `${label} accent hue` : "Accent hue"}
        data-wacss="accent-slider"
        oninput={(e) => onHueInput(Number((e.currentTarget as HTMLInputElement).value))}
        onchange={(e) => onHueInput(Number((e.currentTarget as HTMLInputElement).value))}
      />
      <input
        type="text"
        value={accentHex}
        {disabled}
        readOnly
        data-wacss="input-control"
        aria-label={label ? `${label} accent value` : "Accent value"}
      />
    </div>
  {:else}
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
        oninput={(e) => onPick((e.currentTarget as HTMLInputElement).value)}
        onchange={(e) => onPick((e.currentTarget as HTMLInputElement).value)}
      />
      <input
        type="text"
        value={value}
        {disabled}
        data-wacss="input-control"
        aria-label={label ? `${label} value` : "Color value"}
        oninput={(e) => onPick((e.currentTarget as HTMLInputElement).value)}
        onchange={(e) => onPick((e.currentTarget as HTMLInputElement).value)}
        onblur={(e) => { const v = (e.currentTarget as HTMLInputElement).value; if (/^#?[0-9a-f]{6}$/i.test(v)) onPick(v); }}
      />
    </div>
  {/if}
  {#if error}
    <p id={helpId} data-wacss="input-error">{error}</p>
  {:else if description}
    <p id={helpId} data-wacss="input-description">{description}</p>
  {/if}
</div>
