<script lang="ts">
  import type { AudioProps } from "../types";

  let {
    src,
    sources,
    caption,
    controls = true,
    autoplay = false,
    loop = false,
    muted = false,
    preload = "metadata",
    class: className = "",
    ...restProps
  }: AudioProps = $props();
</script>

<figure data-wacss="audio" class={className || undefined} {...restProps}>
  <audio {src} {controls} {autoplay} {loop} {muted} {preload}>
    {#if sources}
      {#each sources as s}
        <source src={s.src} type={s.type} />
      {/each}
    {/if}
  </audio>
  {#if caption}<figcaption>{caption}</figcaption>{/if}
</figure>
