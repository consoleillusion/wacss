<script lang="ts">
  import type { VideoProps } from "../types";

  let {
    src,
    sources,
    poster,
    caption,
    controls = true,
    autoplay = false,
    loop = false,
    muted = false,
    playsinline = true,
    preload = "metadata",
    class: className = "",
    ...restProps
  }: VideoProps = $props();
</script>

<figure class={className || undefined} {...restProps}>
  <!-- svelte-ignore a11y_media_has_caption -->
  <video {src} {poster} {controls} {autoplay} {loop} {muted} {playsinline} {preload}>
    {#if sources}
      {#each sources as s}
        <source src={s.src} type={s.type} />
      {/each}
    {/if}
  </video>
  {#if caption}<figcaption>{caption}</figcaption>{/if}
</figure>
