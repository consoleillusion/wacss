<script lang="ts">
  // Chip: a short label that can be pressed and released; a button carrying aria-pressed.
  let {
    label,
    value,
    pressed = $bindable(false),
    disabled = false,
    onchange,
    class: className = "",
    ...restProps
  }: {
    label: string;
    value?: string;
    pressed?: boolean;
    disabled?: boolean;
    onchange?: (pressed: boolean) => void;
    class?: string;
    [key: string]: unknown;
  } = $props();
  const classes = $derived(["chip", className].filter(Boolean).join(" "));

  function toggle() {
    // Purpose: press or release the chip, and report it
    pressed = !pressed;
    onchange?.(pressed);
  }
</script>

<button {...restProps} type="button" class={classes} {value} {disabled} aria-pressed={pressed ? "true" : "false"} onclick={toggle}>{label}</button>
