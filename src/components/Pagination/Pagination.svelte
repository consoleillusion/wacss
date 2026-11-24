<script lang="ts">
  // Pagination: links to the previous and next pages of a list, and the page shown.
  let {
    page = 1,
    pages = 1,
    href,
    label = "Pages",
    previous = "Previous",
    next = "Next",
    class: className = "",
    ...restProps
  }: {
    page?: number;
    pages?: number;
    href: string;
    label?: string;
    previous?: string;
    next?: string;
    class?: string;
    [key: string]: unknown;
  } = $props();
  const to = (n: number) =>
    // Purpose: the address of page n, from the href pattern
    href.replace("{page}", String(n));
  const classes = $derived(["pagination", className].filter(Boolean).join(" "));
</script>

<nav {...restProps} class={classes} aria-label={label}>
  {#if page > 1}<a href={to(page - 1)} rel="prev">← {previous}</a>{:else}<span aria-disabled="true">← {previous}</span>{/if}
  <span aria-current="page">Page {page} of {pages}</span>
  {#if page < pages}<a href={to(page + 1)} rel="next">{next} →</a>{:else}<span aria-disabled="true">{next} →</span>{/if}
</nav>
