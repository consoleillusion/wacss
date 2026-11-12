<script lang="ts">
  import type { LabelProps } from "./types";

  let {
    for: htmlFor
    , text
    , required = false
    , class: className = ""
    , children
    , ...restProps
  }: LabelProps = $props();

  const classes = $derived(["", className].filter(Boolean).join(" "));
</script>

<label {...restProps} for={htmlFor} class={classes}>
  {#if text}
    {text}
  {:else}
    {@render children?.()}
  {/if}
  {#if required}
    <span aria-hidden="true">*</span>
  {/if}
</label>
