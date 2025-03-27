<script lang="ts">
  import { onMount } from "svelte";
  import { Slider } from "bits-ui";
  import {
    applyAccentToRoot,
    emitAccentChange,
    hexToHue,
    hueToAccent,
    oklchToHex,
    subscribeAccentChange,
  } from "../accent";

  let {
    value = $bindable(50),
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    class: className = "",
    onValueChange,
    accentSelector = false,
    ...restProps
  }: {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    class?: string;
    onValueChange?: (value: number) => void;
    accentSelector?: boolean;
    [key: string]: unknown;
  } = $props();

  const effectiveMin = $derived(accentSelector ? 0 : min);
  const effectiveMax = $derived(accentSelector ? 360 : max);
  let hue = $state(150);
  const current = $derived(accentSelector ? hue : value);
  const classes = $derived(["wacss-slider", className, accentSelector ? "wacss-hue-slider" : ""].filter(Boolean).join(" "));

  function readAccent() {
    try {
      const accent = getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim();
      const hex = oklchToHex(accent);
      const h = hex ? hexToHue(hex) : null;
      if (h != null) hue = h;
    } catch {}
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
    } catch {}
    emitAccentChange({ source: "custom", color: accent });
    hue = v;
  }

  function handleChange(v: number) {
    if (accentSelector) {
      setAccentFromHue(v);
    } else {
      value = v;
    }
    onValueChange?.(v);
  }

  onMount(() => {
    if (!accentSelector) return () => {};
    readAccent();
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onMode = () => {
      try {
        if (localStorage.getItem("wacss:accent") === "custom") setAccentFromHue(hue);
      } catch {}
    };
    media.addEventListener?.("change", onMode);
    const obs = new MutationObserver(onMode);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const unsub = subscribeAccentChange(() => readAccent());
    return () => {
      media.removeEventListener?.("change", onMode);
      obs.disconnect();
      unsub();
    };
  });
</script>

<Slider.Root
  type="single"
  value={current}
  min={effectiveMin}
  max={effectiveMax}
  {step}
  {disabled}
  class={classes}
  data-wacss="slider"
  data-hue={accentSelector || undefined}
  onValueChange={(v) => handleChange(v)}
  {...restProps}
>
  <Slider.Range data-wacss="slider-range" />
  <Slider.Thumb index={0} data-wacss="slider-thumb" />
</Slider.Root>
