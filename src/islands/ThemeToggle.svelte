<script lang="ts">
  import { onMount } from "svelte";

  type Theme = "light" | "dark" | "system";

  let theme = $state<Theme>("system");
  let resolved = $state<"light" | "dark">("light");

  function apply(next: Theme) {
    theme = next;
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    if (next === "system") {
      localStorage.removeItem("wacss:theme");
      resolved = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } else {
      localStorage.setItem("wacss:theme", next);
      root.classList.add(next);
      resolved = next;
    }
  }

  function toggle() {
    const current = resolved;
    apply(current === "dark" ? "light" : "dark");
  }

  onMount(() => {
    const stored = localStorage.getItem("wacss:theme");
    if (stored === "light" || stored === "dark") {
      theme = stored;
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(stored);
      resolved = stored;
    } else {
      theme = "system";
      resolved = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (theme === "system") {
        resolved = media.matches ? "dark" : "light";
      }
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  });
</script>

<button
  type="button"
  data-wacss="button"
  data-variant="outline"
  data-size="sm"
  class="theme-toggle"
  onclick={toggle}
  aria-label={resolved === "dark" ? "Switch to light theme" : "Switch to dark theme"}
  title={resolved === "dark" ? "Switch to light theme" : "Switch to dark theme"}
>
  {#if resolved === "dark"}
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="8" cy="8" r="3.25" />
      <path d="M8 1.5v1.5M8 13v1.5M14.5 8H13M3 8H1.5M12.6 3.4l-1.06 1.06M4.46 11.54 3.4 12.6M12.6 12.6l-1.06-1.06M4.46 4.46 3.4 3.4" />
    </svg>
    <span>Light</span>
  {:else}
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M13.5 8.5a5.5 5.5 0 1 1-6-6 4.5 4.5 0 0 0 6 6Z" />
    </svg>
    <span>Dark</span>
  {/if}
</button>
