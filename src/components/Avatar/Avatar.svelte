<script lang="ts">
  import type { AvatarProps } from "../types";

  let {
    src,
    alt = "",
    fallback,
    size = "md",
    class: className = "",
    ...restProps
  }: AvatarProps = $props();

  let error = $state(false);
  const showImage = $derived(Boolean(src) && !error);
  const initials = $derived.by(() => {
    if (fallback?.trim()) return fallback.trim().slice(0, 2).toUpperCase();
    return (
      (alt ?? "?")
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("") || "?"
    );
  });
  const classes = $derived(["wacss-avatar", className].filter(Boolean).join(" "));
</script>

<span {...restProps} class={classes} data-wacss="avatar" data-size={size}>
  {#if showImage}
    <img
      data-wacss="avatar-image"
      {src}
      {alt}
      onerror={() => (error = true)}
    />
  {:else}
    <span data-wacss="avatar-fallback" aria-label={alt || undefined}>{initials}</span>
  {/if}
</span>
