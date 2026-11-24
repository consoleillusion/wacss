<script lang="ts">
  // SortableList: a list to put in order, by dragging, by each item's up and down buttons, or by
  // Alt and the arrow keys. While an item is dragged it follows the pointer and the others glide
  // aside; every move glides to its place over the item's transition tokens, and is announced.
  import { tick } from "svelte";
  type Item = { id: string; label: string };
  let {
    items = $bindable([]),
    label = "Order",
    disabled = false,
    onchange,
    class: className = "",
    ...restProps
  }: {
    items?: Item[];
    label?: string;
    disabled?: boolean;
    onchange?: (items: Item[]) => void;
    class?: string;
    [key: string]: unknown;
  } = $props();

  let list: HTMLOListElement;
  let announcement = $state("");
  const classes = $derived(["sortable-list", className].filter(Boolean).join(" "));
  // The drag in progress: the item's position, where the pointer started, the items' places when
  // it began, and the place it would drop into now.
  let drag: { from: number; startY: number; tops: number[]; heights: number[]; step: number; to: number } | null = null;

  const rows = () =>
    // Purpose: the list's items as elements, in their present order
    [...list.children] as HTMLElement[];

  async function reorder(from: number, to: number) {
    // Purpose: move the item at one position to another, then let every item glide from where it
    // was drawn to its new place, over its own transition tokens
    if (disabled || to < 0 || to >= items.length || from === to) return;
    const before = new Map(rows().map((row) => [row.dataset.id, row.getBoundingClientRect().top]));
    for (const row of rows()) {
      row.style.transition = "none";
      row.style.transform = "";
    }
    const next = [...items];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item!);
    items = next;
    await tick();
    for (const row of rows()) {
      const offset = (before.get(row.dataset.id) ?? 0) - row.getBoundingClientRect().top;
      row.style.transform = offset ? `translateY(${offset}px)` : "";
    }
    list.getBoundingClientRect(); // draw the items where they were before they glide
    for (const row of rows()) {
      row.style.transition = "";
      row.style.transform = "";
      row.style.zIndex = "";
    }
    announcement = `${item!.label}: position ${to + 1} of ${items.length}`;
    onchange?.(items);
  }

  async function moveAndFocus(from: number, to: number) {
    // Purpose: move an item by keyboard or button and keep focus on it
    const id = items[from]?.id;
    await reorder(from, to);
    list.querySelector<HTMLElement>(`li[data-id="${CSS.escape(id ?? "")}"]`)?.focus();
  }

  function grab(event: PointerEvent, from: number) {
    // Purpose: start dragging an item, unless the pointer is on one of its buttons
    if (disabled || event.button !== 0 || (event.target as HTMLElement).closest("button")) return;
    event.preventDefault();
    const boxes = rows().map((row) => row.getBoundingClientRect());
    const gap = parseFloat(getComputedStyle(list).rowGap) || 0;
    drag = { from, startY: event.clientY, tops: boxes.map((b) => b.top), heights: boxes.map((b) => b.height), step: boxes[from]!.height + gap, to: from };
    const row = rows()[from]!;
    row.style.transition = "none";
    row.style.zIndex = "1";
    window.addEventListener("pointermove", follow);
    window.addEventListener("pointerup", drop);
    window.addEventListener("pointercancel", drop);
  }

  function follow(event: PointerEvent) {
    // Purpose: keep the dragged item under the pointer, and glide the items it has passed aside
    if (!drag) return;
    const dy = event.clientY - drag.startY;
    const middle = drag.tops[drag.from]! + drag.heights[drag.from]! / 2 + dy;
    const others = drag.tops.map((top, k) => ({ k, middle: top + drag!.heights[k]! / 2 })).filter((o) => o.k !== drag!.from);
    drag.to = others.filter((o) => o.middle < middle).length;
    rows().forEach((row, k) => {
      if (k === drag!.from) row.style.transform = `translateY(${dy}px)`;
      else if (k > drag!.from && k <= drag!.to) row.style.transform = `translateY(${-drag!.step}px)`;
      else if (k < drag!.from && k >= drag!.to) row.style.transform = `translateY(${drag!.step}px)`;
      else row.style.transform = "";
    });
  }

  async function drop() {
    // Purpose: let go of the dragged item: it settles into the place it was dropped
    window.removeEventListener("pointermove", follow);
    window.removeEventListener("pointerup", drop);
    window.removeEventListener("pointercancel", drop);
    if (!drag) return;
    const { from, to } = drag;
    drag = null;
    if (from === to) {
      const row = rows()[from]!;
      row.style.transition = "";
      row.style.transform = "";
      row.style.zIndex = "";
      return;
    }
    await reorder(from, to);
  }

  function onkey(event: KeyboardEvent, k: number) {
    // Purpose: Alt with the up or down arrow moves the focused item
    if (!event.altKey || (event.key !== "ArrowUp" && event.key !== "ArrowDown")) return;
    event.preventDefault();
    moveAndFocus(k, event.key === "ArrowUp" ? k - 1 : k + 1);
  }
</script>

<ol {...restProps} class={classes} aria-label={label} aria-disabled={disabled ? "true" : undefined} bind:this={list}>
  {#each items as item, k (item.id)}
    <li
      data-id={item.id}
      tabindex={disabled ? -1 : 0}
      aria-roledescription="movable item"
      onpointerdown={(e) => grab(e, k)}
      onkeydown={(e) => onkey(e, k)}
    >
      <span>{item.label}</span>
      <button type="button" class="tertiary" aria-label={`Move ${item.label} up`} disabled={disabled || k === 0} onclick={() => moveAndFocus(k, k - 1)}>↑</button>
      <button type="button" class="tertiary" aria-label={`Move ${item.label} down`} disabled={disabled || k === items.length - 1} onclick={() => moveAndFocus(k, k + 1)}>↓</button>
    </li>
  {/each}
</ol>
<p class="visually-hidden" aria-live="assertive">{announcement}</p>
