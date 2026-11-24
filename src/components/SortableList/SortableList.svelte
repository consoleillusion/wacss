<script lang="ts">
  // SortableList: a list to put in order, by dragging, by each item's up and down buttons, or by
  // Alt and the arrow keys. Every move is announced.
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
  let dragging: string | null = null;
  let announcement = $state("");
  const classes = $derived(["sortable-list", className].filter(Boolean).join(" "));

  function move(from: number, to: number) {
    // Purpose: move the item at one position to another, announce it and report the new order
    if (disabled || to < 0 || to >= items.length || from === to) return;
    const next = [...items];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item!);
    items = next;
    announcement = `${item!.label}: position ${to + 1} of ${items.length}`;
    onchange?.(items);
  }

  async function moveAndFocus(from: number, to: number) {
    // Purpose: move an item by keyboard or button and keep focus on it
    const id = items[from]?.id;
    move(from, to);
    await tick();
    list.querySelector<HTMLElement>(`li[data-id="${CSS.escape(id ?? "")}"]`)?.focus();
  }

  function grab(event: PointerEvent, id: string) {
    // Purpose: start dragging an item, unless the pointer is on one of its buttons
    if (disabled || (event.target as HTMLElement).closest("button")) return;
    dragging = id;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  }

  function drag(event: PointerEvent) {
    // Purpose: move the dragged item to the place where the pointer is: after every other item
    // whose middle the pointer has passed
    if (!dragging) return;
    const from = items.findIndex((i) => i.id === dragging);
    const others = [...list.children].filter((row) => (row as HTMLElement).dataset.id !== dragging);
    const to = others.filter((row) => {
      const box = row.getBoundingClientRect();
      return event.clientY > box.top + box.height / 2;
    }).length;
    move(from, to);
  }

  function drop() {
    // Purpose: stop dragging
    dragging = null;
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
      onpointerdown={(e) => grab(e, item.id)}
      onpointermove={drag}
      onpointerup={drop}
      onpointercancel={drop}
      onkeydown={(e) => onkey(e, k)}
    >
      <span>{item.label}</span>
      <button type="button" class="tertiary" aria-label={`Move ${item.label} up`} disabled={disabled || k === 0} onclick={() => moveAndFocus(k, k - 1)}>↑</button>
      <button type="button" class="tertiary" aria-label={`Move ${item.label} down`} disabled={disabled || k === items.length - 1} onclick={() => moveAndFocus(k, k + 1)}>↓</button>
    </li>
  {/each}
</ol>
<p class="visually-hidden" aria-live="assertive">{announcement}</p>
