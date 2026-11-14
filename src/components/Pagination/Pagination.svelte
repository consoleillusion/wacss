<script lang="ts">
  import { Pagination } from "bits-ui";

  let {
    total
    , perPage = 10
    , page = $bindable(1)
    , siblingCount = 1
    , loop = false
    , class: className = ""
    , ...restProps
  }: {
    /** Total number of items to paginate. */
    total: number;
    /** Items per page. */
    perPage?: number;
    /** Current page (1-based). */
    page?: number;
    /** Pages shown before and after the current page. */
    siblingCount?: number;
    /** Loop from last page back to first and vice versa. */
    loop?: boolean;
    class?: string;
    [key: string]: unknown;
  } = $props();
</script>

<nav data-pagination-root class={className || undefined} aria-label="Pagination" {...restProps}>
  <Pagination.Root count={total} {perPage} {siblingCount} {loop} bind:page>
    {#snippet children({ pages, range: _range, currentPage })}
      <Pagination.PrevButton aria-label="Previous page" data-pagination-prev>
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M10 4 6 8l4 4" />
        </svg>
      </Pagination.PrevButton>
      {#each pages as item (item.key)}
        {#if item.type === "page"}
          <Pagination.Page page={item} data-pagination-page data-selected={item.value === currentPage ? "" : undefined}>
            {item.value}
          </Pagination.Page>
        {:else}
          <span data-pagination-ellipsis aria-hidden="true">…</span>
        {/if}
      {/each}
      <Pagination.NextButton aria-label="Next page" data-pagination-next>
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="m6 4 4 4-4 4" />
        </svg>
      </Pagination.NextButton>
    {/snippet}
  </Pagination.Root>
</nav>
