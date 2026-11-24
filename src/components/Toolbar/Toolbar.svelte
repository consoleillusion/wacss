<script lang="ts">
  // Toolbar: a row of controls acting on the same thing. One control is in the tab order at a
  // time; the arrow keys, Home and End move between them.
  import type { Snippet } from "svelte";
  import { onMount } from "svelte";
  let {
    label,
    class: className = "",
    children,
    ...restProps
  }: {
    label: string;
    class?: string;
    children?: Snippet;
    [key: string]: unknown;
  } = $props();
  let bar: HTMLElement;
  const classes = $derived(["toolbar", className].filter(Boolean).join(" "));

  const controls = () =>
    // Purpose: the toolbar's own enabled controls, in order
    [...bar.querySelectorAll<HTMLElement>("button, a[href], input, select, textarea")].filter(
      (c) => !(c as HTMLButtonElement).disabled && c.closest(".toolbar") === bar,
    );

  function rove(current: HTMLElement) {
    // Purpose: make one control the toolbar's place in the tab order
    for (const c of controls()) c.tabIndex = c === current ? 0 : -1;
  }

  function onkeydown(event: KeyboardEvent) {
    // Purpose: move focus between the controls with the arrow keys, Home and End, except inside a
    // control that uses those keys itself
    const target = event.target as HTMLElement;
    if (target.closest("input, select, textarea")) return;
    const list = controls();
    const at = list.indexOf(target);
    const to =
      event.key === "ArrowRight" ? (at + 1) % list.length
      : event.key === "ArrowLeft" ? (at - 1 + list.length) % list.length
      : event.key === "Home" ? 0
      : event.key === "End" ? list.length - 1
      : -1;
    if (to < 0 || at < 0) return;
    event.preventDefault();
    rove(list[to]!);
    list[to]!.focus();
  }

  onMount(() => {
    // Purpose: start with the first control in the tab order
    const first = controls()[0];
    if (first) rove(first);
  });
</script>

<div {...restProps} class={classes} role="toolbar" aria-label={label} bind:this={bar} {onkeydown} onfocusin={(e) => controls().includes(e.target as HTMLElement) && rove(e.target as HTMLElement)}>
  {@render children?.()}
</div>
