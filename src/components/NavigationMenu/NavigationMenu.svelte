<script lang="ts">
  import { NavigationMenu } from "bits-ui";

  type NavLink = { href: string; label: string; description?: string };
  type NavItem = {
    label: string;
    href?: string;
    links?: NavLink[];
  };

  let {
    items = [] as NavItem[],
    class: className = "",
    ...restProps
  }: {
    items?: NavItem[];
    class?: string;
    [key: string]: unknown;
  } = $props();

  const classes = $derived(["wacss-navigation-menu", className].filter(Boolean).join(" "));
</script>

<NavigationMenu.Root class={classes} data-wacss="navigation-menu" {...restProps}>
  <NavigationMenu.List data-wacss="navigation-menu-list">
    {#each items as item, i (item.label + i)}
      <NavigationMenu.Item data-wacss="navigation-menu-item">
        {#if item.links?.length}
          <NavigationMenu.Trigger data-wacss="navigation-menu-trigger">
            {item.label}
            <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-wacss="navigation-menu-caret">
              <path d="m4 6 4 4 4-4" />
            </svg>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content data-wacss="navigation-menu-content">
            <ul data-wacss="navigation-menu-grid">
              {#each item.links as link}
                <li>
                  <NavigationMenu.Link href={link.href} data-wacss="navigation-menu-link">
                    <span data-wacss="navigation-menu-link-title">{link.label}</span>
                    {#if link.description}
                      <span data-wacss="navigation-menu-link-desc">{link.description}</span>
                    {/if}
                  </NavigationMenu.Link>
                </li>
              {/each}
            </ul>
          </NavigationMenu.Content>
        {:else if item.href}
          <NavigationMenu.Link href={item.href} data-wacss="navigation-menu-trigger" data-link>
            {item.label}
          </NavigationMenu.Link>
        {:else}
          <span data-wacss="navigation-menu-trigger">{item.label}</span>
        {/if}
      </NavigationMenu.Item>
    {/each}
    <NavigationMenu.Indicator data-wacss="navigation-menu-indicator">
      <div data-wacss="navigation-menu-indicator-arrow"></div>
    </NavigationMenu.Indicator>
  </NavigationMenu.List>
  <div data-wacss="navigation-menu-viewport-wrap">
    <NavigationMenu.Viewport data-wacss="navigation-menu-viewport" />
  </div>
</NavigationMenu.Root>
