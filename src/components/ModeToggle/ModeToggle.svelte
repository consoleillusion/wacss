<script lang="ts">
  // ModeToggle: switches the page between light and dark mode, remembers the choice, and says
  // which mode is on. A tertiary Button.
  import { onMount } from "svelte";
  let {
    storageKey = "wacss:mode",
    light: lightText = "Light mode on",
    dark: darkText = "Dark mode on",
    class: className = "",
    ...restProps
  }: {
    storageKey?: string;
    light?: string;
    dark?: string;
    class?: string;
    [key: string]: unknown;
  } = $props();
  let light = $state(false);
  let ready = $state(false);
  const classes = $derived(["tertiary", "mode-toggle", className].filter(Boolean).join(" "));

  const isLight = () =>
    // Purpose: the mode in effect: the one chosen, else the system's
    document.documentElement.dataset.mode
      ? document.documentElement.dataset.mode === "light"
      : matchMedia("(prefers-color-scheme: light)").matches;

  function toggle() {
    // Purpose: switch to the other mode and remember it
    light = !light;
    document.documentElement.dataset.mode = light ? "light" : "dark";
    try { localStorage.setItem(storageKey, document.documentElement.dataset.mode); } catch {}
  }

  onMount(() => {
    // Purpose: show the mode in effect once the page can be read, and follow it if anything else
    // changes it, such as another toggle or the system setting
    const follow = () => (light = isLight());
    follow();
    ready = true;
    const observer = new MutationObserver(follow);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-mode"] });
    const system = matchMedia("(prefers-color-scheme: light)");
    system.addEventListener("change", follow);
    return () => {
      observer.disconnect();
      system.removeEventListener("change", follow);
    };
  });
</script>

<button {...restProps} type="button" class={classes} onclick={toggle}>
  {#if ready}<span aria-hidden="true">{light ? "☀" : "☾"}</span> {light ? lightText : darkText}{:else}{darkText}{/if}
</button>
