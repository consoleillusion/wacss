<script lang="ts">
  import type { CardProps } from "../types";

  let {
    as: Tag = "article",
    title,
    description,
    footer,
    class: className = "",
    children,
    header,
    footerSnippet,
    ...restProps
  }: CardProps = $props();

  const classes = $derived(["wacss-card", className].filter(Boolean).join(" "));
</script>

<svelte:element this={Tag} {...restProps} class={classes} data-wacss="card">
  {#if header}
    {@render header()}
  {:else if title || description}
    <header data-wacss="card-header">
      {#if title}
        <h3 data-wacss="card-title">{title}</h3>
      {/if}
      {#if description}
        <p data-wacss="card-description">{description}</p>
      {/if}
    </header>
  {/if}

  {#if children}
    <div data-wacss="card-content">
      {@render children()}
    </div>
  {/if}

  {#if footerSnippet}
    {@render footerSnippet()}
  {:else if footer}
    <footer data-wacss="card-footer">{footer}</footer>
  {/if}
</svelte:element>
