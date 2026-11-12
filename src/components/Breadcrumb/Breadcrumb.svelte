<script lang="ts">
  import type { BreadcrumbItem, BreadcrumbProps } from "./types";

  let {
    items = [] as BreadcrumbItem[]
    , class: className = ""
    , ...restProps
  }: BreadcrumbProps = $props();
</script>

{#if items.length}
  <nav data-breadcrumb-root class={className || undefined} {...restProps} aria-label="Breadcrumb">
    <ol>
      {#each items as item, i (item.label + i)}
        {#if i > 0}
          <li data-breadcrumb-separator aria-hidden="true">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="m6 4 4 4-4 4" />
            </svg>
          </li>
        {/if}
        <li>
          {#if item.href && i < items.length - 1}
            <a href={item.href}>{item.label}</a>
          {:else if item.href}
            <a href={item.href} aria-current="page">{item.label}</a>
          {:else}
            <span aria-current="page">{item.label}</span>
          {/if}
        </li>
      {/each}
    </ol>
  </nav>
{/if}
