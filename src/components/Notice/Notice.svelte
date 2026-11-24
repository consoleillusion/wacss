<script lang="ts">
  // Notice: a message set apart from the page, on the surface or on an intent colour's tint.
  import type { Snippet } from "svelte";
  let {
    heading,
    text,
    variant = "secondary",
    role = "status",
    class: className = "",
    children,
    ...restProps
  }: {
    heading?: string;
    text?: string;
    variant?: "secondary" | "positive" | "warning" | "danger" | "informational";
    role?: "status" | "alert" | "note";
    class?: string;
    children?: Snippet;
    [key: string]: unknown;
  } = $props();
  // The default variant has no class; any other is its class.
  const classes = $derived(["notice", variant === "secondary" ? "" : variant, className].filter(Boolean).join(" "));
</script>

<div {...restProps} class={classes} {role}>
  {#if heading}<strong>{heading}</strong>{/if}
  {#if text}<p>{text}</p>{/if}
  {@render children?.()}
</div>
