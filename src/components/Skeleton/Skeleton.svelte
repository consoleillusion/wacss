<script lang="ts">
  let {
    lines = 1
    , circle = false
    , class: className = ""
    , ...restProps
  }: {
    /** Number of bar lines to render (ignored when `circle` is set). */
    lines?: number;
    /** Render an avatar-sized circle instead of text lines. */
    circle?: boolean;
    class?: string;
    [key: string]: unknown;
  } = $props();

  const count = Math.max(1, Math.floor(lines));
</script>

<div data-skeleton-root class={className || undefined} aria-hidden="true" {...restProps}>
  {#if circle}
    <span data-skeleton-circle></span>
  {:else}
    {#each Array.from({ length: count }) as _, i (i)}
      <span data-skeleton-bar data-short={i === count - 1 && count > 1 ? "" : undefined}></span>
    {/each}
  {/if}
</div>
