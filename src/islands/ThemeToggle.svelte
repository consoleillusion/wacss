<script lang="ts">
  import { onMount } from "svelte";

  type Theme = "light" | "dark" | "system";

  let theme = $state<Theme>("system");
  let resolved = $state<"light" | "dark">("light");

  function currentSystem(): "light" | "dark" {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function apply(next: Theme, persist = true) {
    theme = next;
    const root = document.documentElement;
    if (next === "system") {
      root.removeAttribute("data-theme");
      resolved = currentSystem();
      if (persist) localStorage.removeItem("wacss:theme");
    } else {
      root.setAttribute("data-theme", next);
      resolved = next;
      if (persist) localStorage.setItem("wacss:theme", next);
    }
  }

  function toggle() {
    apply(resolved === "dark" ? "light" : "dark");
  }

  onMount(() => {
    const stored = localStorage.getItem("wacss:theme");
    if (stored === "light" || stored === "dark") {
      theme = stored;
      resolved = stored;
    } else {
      theme = "system";
      resolved = currentSystem();
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (theme === "system") resolved = currentSystem();
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  });
</script>

<button
  type="button"
  data-variant="outline"
  data-size="sm"
  class="theme-toggle"
  onclick={toggle}
  aria-label={resolved === "dark" ? "Switch to light mode" : "Switch to dark mode"}
  title={resolved === "dark" ? "Dark mode (click to switch to light)" : "Light mode (click to switch to dark)"}
>
  {#if resolved === "dark"}
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M13.5 8.5a5.5 5.5 0 1 1-6-6 4.5 4.5 0 0 0 6 6Z" />
    </svg>
    <span>Dark</span>
  {:else}
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="8" cy="8" r="3.25" />
      <path d="M8 1.5v1.5M8 13v1.5M14.5 8H13M3 8H1.5M12.6 3.4l-1.06 1.06M4.46 11.54 3.4 12.6M12.6 12.6l-1.06-1.06M4.46 4.46 3.4 3.4" />
    </svg>
    <span>Light</span>
  {/if}
</button>
