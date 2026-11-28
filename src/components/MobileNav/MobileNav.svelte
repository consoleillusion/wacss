<script lang="ts">
  // MobileNav: a toggle that discloses the page's links. The root carries data-state only while
  // the menu is open, so the generated open-state rules follow the real condition.
  let {
    label,
    links = [],
    current = "",
    id = "mobile-nav",
    class: className = "",
    ...restProps
  }: {
    label: string;
    links?: { href: string; label: string }[];
    current?: string;
    id?: string;
    class?: string;
    [key: string]: unknown;
  } = $props();

  let open = $state(false);
  const classes = $derived(["mobile-nav", className].filter(Boolean).join(" "));
  const menuId = $derived(`${id}-menu`);
  const isCurrent = (href: string) => !!current && (current === href || current.startsWith(`${href}/`));
</script>

<div {...restProps} class={classes} data-state={open ? "open" : undefined}>
  <button
    type="button"
    aria-label={label}
    aria-expanded={open}
    aria-controls={menuId}
    onclick={() => (open = !open)}
  >{open ? "×" : "☰"}</button>
  <nav id={menuId} data-mobile-nav-menu aria-label={label}>
    {#each links as link (link.href)}
      <a href={link.href} aria-current={isCurrent(link.href) ? "page" : undefined} onclick={() => (open = false)}>{link.label}</a>
    {/each}
  </nav>
</div>
