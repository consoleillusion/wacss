<script lang="ts">
  import type { ImageProps } from "../types";

  let {
    src,
    alt = "",
    caption,
    loading = "lazy",
    decoding = "async",
    class: className = "",
    ...restProps
  }: ImageProps = $props();
</script>

{#if caption}
  <figure class={className || undefined} {...restProps}>
    <img {src} {alt} {loading} {decoding} />
    <figcaption>{caption}</figcaption>
  </figure>
{:else}
  <img class={className || undefined} {src} {alt} {loading} {decoding} {...restProps} />
{/if}
