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

  const classes = $derived(["", className].filter(Boolean).join(" "));
</script>

<NavigationMenu.Root class={classes} {...restProps}>
  <NavigationMenu.List>
    {#each items as item, i (item.label + i)}
      <NavigationMenu.Item>
        {#if item.links?.length}
          <NavigationMenu.Trigger>
            {item.label}
            <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="m4 6 4 4 4-4" />
            </svg>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul>
              {#each item.links as link}
                <li>
                  <NavigationMenu.Link href={link.href}>
                    <span>{link.label}</span>
                    {#if link.description}
                      <span>{link.description}</span>
                    {/if}
                  </NavigationMenu.Link>
                </li>
              {/each}
            </ul>
          </NavigationMenu.Content>
        {:else if item.href}
          <NavigationMenu.Link href={item.href} data-link>
            {item.label}
          </NavigationMenu.Link>
        {:else}
          <span>{item.label}</span>
        {/if}
      </NavigationMenu.Item>
    {/each}
    <NavigationMenu.Indicator>
      <div></div>
    </NavigationMenu.Indicator>
  </NavigationMenu.List>
  <div>
    <NavigationMenu.Viewport />
  </div>
</NavigationMenu.Root>
