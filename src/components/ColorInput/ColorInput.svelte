<script lang="ts">
  import { onMount } from "svelte";
  import type { InputProps } from "../types";
  import Slider from "../Slider/Slider.svelte";
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

  let hue = $state<number>(150);
  let accentHex = $state<string>("#6d9469");

  function readAccent() {
    try {
      const accent = getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim();
      const hex = oklchToHex(accent);
      const h = hex ? hexToHue(hex) : null;
      if (h != null) hue = h;
      if (hex) accentHex = hex;
    } catch {
      /* noop */
    }
  }

  function isDarkMode(): boolean {
    const t = document.documentElement.getAttribute("data-theme");
    if (t === "dark") return true;
    if (t === "light") return false;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  }

  function setAccentFromHue(h: number) {
    const v = Math.round(Math.max(0, Math.min(360, h)));
    const accent = hueToAccent(v, isDarkMode());
    applyAccentToRoot(undefined, accent);
    try {
      localStorage.setItem("wacss:accent", "custom");
      localStorage.setItem("wacss:accent-color", accent);
    } catch {
      /* storage unavailable */
    }
    emitAccentChange({ source: "custom", color: accent });
    hue = v;
    accentHex = oklchToHex(accent) ?? accentHex;
  }

  function onPick(v: string) {
    const h = hexToHue(v);
    if (h != null) setAccentFromHue(h);
  }

  // Re-apply accent when light/dark mode changes so L stays correct.
  onMount(() => {
    if (!accentSelector) return () => {};
    readAccent();
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onMode = () => {
      // only adjust if currently using a custom accent
      try {
        if (localStorage.getItem("wacss:accent") === "custom") setAccentFromHue(hue);
      } catch {}
    };
    media.addEventListener?.("change", onMode);
    const obs = new MutationObserver(onMode);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const unsub = subscribeAccentChange((state) => {
      if (state.source === "custom") readAccent();
      else readAccent();
    });
    return () => {
      media.removeEventListener?.("change", onMode);
      obs.disconnect();
      unsub();
    };
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
      <Slider
        min={0}
        max={360}
        step={1}
        bind:value={hue}
        {disabled}
        aria-label={label ? `${label} accent hue` : "Accent hue"}
        class="wacss-accent-slider"
        onValueChange={(v) => setAccentFromHue(v)}
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
        oninput={(e) => { value = (e.currentTarget as HTMLInputElement).value; }}
        onchange={(e) => { value = (e.currentTarget as HTMLInputElement).value; }}
      />
      <input
        type="text"
        value={value}
        {disabled}
        data-wacss="input-control"
        aria-label={label ? `${label} value` : "Color value"}
        oninput={(e) => { value = (e.currentTarget as HTMLInputElement).value; }}
        onchange={(e) => { value = (e.currentTarget as HTMLInputElement).value; }}
      />
    </div>
  {/if}
  {#if error}
    <p id={helpId} data-wacss="input-error">{error}</p>
  {:else if description}
    <p id={helpId} data-wacss="input-description">{description}</p>
  {/if}
</div>
