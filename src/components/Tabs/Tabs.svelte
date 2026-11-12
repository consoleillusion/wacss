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

  const classes = $derived([className].filter(Boolean).join(" "));
  const listClasses = $derived([listClass].filter(Boolean).join(" "));
  const contentClasses = $derived([contentClass].filter(Boolean).join(" "));

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
  class={classes || undefined}
  wacss="tabs"
>
  <BitsTabs.List class={listClasses || undefined}>
    {#each tabs as tab (tab.value)}
      <BitsTabs.Trigger value={tab.value} disabled={tab.disabled}>
        {tab.label}
      </BitsTabs.Trigger>
    {/each}
  </BitsTabs.List>

  {#each tabs as tab, index (tab.value)}
    <BitsTabs.Content value={tab.value} class={contentClasses || undefined}>
      {#if tab.content}
        <p>{tab.content}</p>
      {/if}
      {#if children}
        {@render children({ tab, index })}
      {/if}
    </BitsTabs.Content>
  {/each}
</BitsTabs.Root>
