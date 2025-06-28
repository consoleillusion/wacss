<script lang="ts">
  import { Tabs as BitsTabs } from "bits-ui";
  import type { TabsProps } from "../types";
  import { persistState } from "../persist.svelte";

  let {
    tabs = [],
    value = $bindable(tabs[0]?.value ?? ""),
    orientation = "horizontal",
    activationMode = "automatic",
    loop = true,
    disabled = false,
    storageKey = "wacss:tabs",
    persist = true,
    class: className = "",
    listClass = "",
    contentClass = "",
    children,
    ...restProps
  }: TabsProps = $props();

  persistState({
    get: () => value,
    set: (next) => {
      value = next;
    },
    key: () => storageKey,
    enabled: () => persist,
  });
</script>

<BitsTabs.Root
  {...restProps}
  bind:value
  {orientation}
  {activationMode}
  {loop}
  {disabled}
  class={className || undefined}
  data-tabs
>
  <BitsTabs.List class={listClass || undefined} data-tabs-list>
    {#each tabs as tab (tab.value)}
      <BitsTabs.Trigger value={tab.value} disabled={tab.disabled} data-tabs-trigger>
        {tab.label}
      </BitsTabs.Trigger>
    {/each}
  </BitsTabs.List>

  {#each tabs as tab, index (tab.value)}
    <BitsTabs.Content value={tab.value} class={contentClass || undefined} data-tabs-content>
      {#if tab.content}
        <p>{tab.content}</p>
      {/if}
      {#if children}
        {@render children({ tab, index })}
      {/if}
    </BitsTabs.Content>
  {/each}
</BitsTabs.Root>
