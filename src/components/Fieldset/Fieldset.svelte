<script lang="ts">
  // Fieldset: a group of related controls under one legend; disabled, it disables them all.
  import type { Snippet } from "svelte";
  let {
    legend,
    disabled = false,
    class: className = "",
    children,
    ...restProps
  }: {
    legend?: string;
    disabled?: boolean;
    class?: string;
    children?: Snippet;
    [key: string]: unknown;
  } = $props();
</script>

<fieldset {...restProps} class={className || undefined} {disabled}>
  {#if legend}<legend>{legend}</legend>{/if}
  {@render children?.()}
</fieldset>
