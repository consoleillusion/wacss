<script lang="ts">
  import type { LabelProps } from "../types";

  let {
    for: htmlFor,
    text,
    required = false,
    class: className = "",
    children,
    ...restProps
  }: LabelProps = $props();

  const classes = $derived(["wacss-label", className].filter(Boolean).join(" "));
</script>

<label {...restProps} for={htmlFor} class={classes} data-wacss="label">
  {#if text}
    {text}
  {:else}
    {@render children?.()}
  {/if}
  {#if required}
    <span data-wacss="label-required" aria-hidden="true">*</span>
  {/if}
</label>
