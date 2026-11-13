<script lang="ts">
  import type { ImageProps } from "../types";

  let {
    src,
    alt = "",
    loading = "lazy",
    decoding = "async",
    class: className = "",
    ...restProps
  }: ImageProps = $props();
</script>

<img class={className || undefined} {src} {alt} {loading} {decoding} {...restProps} />
