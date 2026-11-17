<script lang="ts">
  import "@xyflow/svelte/dist/style.css";
  import { SvelteFlow, Background, Controls, type Node, type Edge } from "@xyflow/svelte";
  import NodeLinkNode, { type NodeLinkNodeData } from "./NodeLinkNode.svelte";
  import FitView from "./FitView.svelte";
  import { computeLayout, type LayoutPoint } from "./layout";

  export interface NodeLinkNodeDataIn {
    name: string;
    value: string;
    refs: string[];
    family: string;
    layer: string;
  }
  export interface TokenFamily { family: string; tokens: NodeLinkNodeDataIn[]; }
  export interface TokenLayer { layer: string; families: TokenFamily[]; }

  let { layers = [] as TokenLayer[] }: { layers?: TokenLayer[] } = $props();

  /* Generated CSS targets the root only. The widget's own DOM parts take their
     L5 tokens inline, so no descendant selectors are needed. */
  const t = (property: string) => `var(--node-link-diagram-${property}-secondary-static)`;
  const styles = {
    toolbar: `display: flex; align-items: center; flex-wrap: wrap; gap: ${t("toolbar-gap")}; padding: ${t("toolbar-padding")}; border-block-end: ${t("toolbar-border-block-end")}; background: ${t("toolbar-background")};`,
    filter: `display: flex; align-items: center; gap: ${t("filter-gap")}; font-size: ${t("filter-font-size")}; color: ${t("filter-color")};`,
    select: `padding: ${t("select-padding")}; padding-inline-end: ${t("select-padding-inline-end")}; background: ${t("select-background")}; border: ${t("select-border-width")} solid var(--color-border); border-radius: ${t("select-border-radius")}; font-size: ${t("select-font-size")}; color: ${t("select-color")};`,
    search: "position: relative;",
    hidden: "position: absolute; inline-size: 1px; block-size: 1px; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%);",
    input: `inline-size: 16rem; padding: ${t("input-padding")}; background: ${t("input-background")}; border: ${t("input-border-width")} solid var(--color-border); border-radius: ${t("input-border-radius")}; font-size: ${t("input-font-size")}; color: ${t("input-color")};`,
    actions: `display: flex; align-items: center; gap: ${t("actions-gap")}; margin-inline-start: auto;`,
    count: `font-size: ${t("count-font-size")}; color: ${t("count-color")}; font-variant-numeric: tabular-nums;`,
    status: `position: absolute; inset-block-start: ${t("layout-status-inset-block-start")}; inset-inline-start: 50%; transform: translateX(-50%); padding: ${t("layout-status-padding")}; background: ${t("layout-status-background")}; border: ${t("layout-status-border")}; border-radius: ${t("layout-status-border-radius")}; box-shadow: ${t("layout-status-box-shadow")}; font-size: ${t("layout-status-font-size")}; color: ${t("layout-status-color")}; pointer-events: none; z-index: var(--layer-overlay);`,
    detail: `position: absolute; inset-inline-end: ${t("detail-inset-inline-end")}; inset-block-end: ${t("detail-inset-block-end")}; inline-size: 24rem; display: grid; gap: ${t("detail-gap")}; padding: ${t("detail-padding")}; background: ${t("detail-background")}; border: ${t("detail-border")}; border-radius: ${t("detail-border-radius")}; box-shadow: ${t("detail-box-shadow")}; z-index: var(--layer-overlay);`,
    detailHead: `display: flex; align-items: center; justify-content: space-between; gap: ${t("detail-head-gap")};`,
    detailName: `font-family: ${t("detail-name-font-family")}; font-size: ${t("detail-name-font-size")}; overflow-wrap: anywhere;`,
    detailMeta: `margin: 0; font-size: ${t("detail-meta-font-size")}; color: ${t("detail-meta-color")};`,
    detailValue: `font-family: ${t("detail-value-font-family")}; font-size: ${t("detail-value-font-size")}; color: ${t("detail-value-color")}; overflow-wrap: anywhere;`,
    detailRefs: `list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: ${t("detail-refs-gap")};`,
    ref: `display: inline-flex; align-items: center; font-family: ${t("ref-font-family")}; font-size: ${t("ref-font-size")}; padding: ${t("ref-padding")}; background: ${t("token-node-background")}; color: ${t("token-node-color")}; border: none; border-radius: ${t("ref-border-radius")}; cursor: pointer;`
  };

  const NODE_WIDTH = 252;
  const NODE_HEIGHT = 36;

  const LAYER_ORDER = ["L1", "L2", "L3", "L4", "L5"];
  const layerKey = (layer: string) => LAYER_ORDER.find((key) => layer.includes(key)) ?? "L5";

  const allTokens = layers.flatMap((layer) =>
    layer.families.flatMap((family) =>
      family.tokens.map((token) => ({
        ...token
        , layerKey: layerKey(layer.layer)
        , layer: layer.layer
        , family: family.family
      , }))
    , )
  , );

  const tokenByName = new Map(allTokens.map((token) => [token.name, token]));

  const edges: Edge[] = (() => {
    const seen = new Set<string>();
    const out: Edge[] = [];
    for (const token of allTokens) {
      for (const ref of token.refs) {
        if (ref === token.name) continue; // a self-reference adds nothing to the graph
        if (!tokenByName.has(ref)) continue; // runtime hooks (--color-accent) are not static tokens
        const key = `${ref}->${token.name}`;
        if (seen.has(key)) continue;
        seen.add(key);
        out.push({
          id: `e${out.length}`
          , source: ref
          , target: token.name
          , type: "smoothstep"
          , style: `stroke: ${t("edge-stroke")}; stroke-width: 1.1px; stroke-opacity: 0.6;`
        , });
      }
    }
    return out;
  })();

  // Domain tokens that are shared by every component. They still show up in a
  // component view through the dependency closure, but they are not components.
  const SHARED_FAMILIES = new Set([
    "border", "center", "cluster", "color", "content", "control", "ease"
    , "focus", "font", "graph", "grid", "line", "measure", "motion"
    , "opacity", "overlay", "radius", "shadow", "sidebar", "space", "stack"
    , "text", "weight"
  , ]);

  const componentFamilies = [...new Set(
    allTokens
      .filter((token) => token.layerKey !== "L1" && token.layerKey !== "L2")
      .map((token) => token.family)
  , )]
    .filter((family) => !SHARED_FAMILIES.has(family))
    .sort();

  /** The component's own tokens plus every token it depends on, recursively. */
  function closureOf(family: string): Set<string> {
    const seed = allTokens
      .filter((token) => token.family === family && token.layerKey !== "L1" && token.layerKey !== "L2")
      .map((token) => token.name);
    const ids = new Set(seed);
    const stack = [...seed];
    while (stack.length) {
      const name = stack.pop()!;
      for (const ref of tokenByName.get(name)?.refs ?? []) {
        if (!tokenByName.has(ref) || ids.has(ref)) continue;
        ids.add(ref);
        stack.push(ref);
      }
    }
    return ids;
  }

  const familySizes = new Map(componentFamilies.map((family) => [family, closureOf(family).size]));

  let component = $state<string>(
    componentFamilies.includes("button") ? "button" : (componentFamilies[0] ?? "all")
  , );
  let query = $state("");
  let activeLayers = $state(new Set(LAYER_ORDER));
  let selectedId = $state<string | null>(null);

  const scopedTokens = $derived.by(() => {
    if (component === "all") return allTokens;
    const ids = closureOf(component);
    return allTokens.filter((token) => ids.has(token.name));
  });

  const layerVisibleIds = $derived.by(() => {
    const ids = new Set<string>();
    for (const token of scopedTokens) {
      if (activeLayers.has(token.layerKey)) ids.add(token.name);
    }
    return ids;
  });

  const visibleIds = $derived.by(() => {
    const q = query.trim().toLowerCase();
    if (!q) return layerVisibleIds;
    const ids = new Set<string>();
    const stack = scopedTokens
      .filter(
        (token) =>
          layerVisibleIds.has(token.name) &&
          (token.name.toLowerCase().includes(q) ||
            token.value.toLowerCase().includes(q) ||
            token.refs.some((ref) => ref.toLowerCase().includes(q)))
      , )
      .map((token) => token.name);
    for (const name of stack) ids.add(name);
    while (stack.length) {
      const name = stack.pop()!;
      for (const ref of tokenByName.get(name)?.refs ?? []) {
        if (ids.has(ref) || !layerVisibleIds.has(ref)) continue;
        ids.add(ref);
        stack.push(ref);
      }
    }
    return ids;
  });

  // --- Layout -----------------------------------------------------------------
  let positions = $state<Map<string, LayoutPoint>>(new Map());
  let layoutVersion = $state(0);
  let layingOut = $state(true);

  $effect(() => {
    const tokens = scopedTokens;
    positions = new Map();
    layingOut = true;
    const scope = new Set(tokens.map((token) => token.name));
    const scopeEdges = edges
      .filter((edge) => scope.has(edge.source) && scope.has(edge.target))
      .map((edge) => ({ source: edge.source, target: edge.target }));
    let cancelled = false;

    computeLayout(tokens, scopeEdges, NODE_WIDTH, NODE_HEIGHT)
      .then((next) => {
        if (cancelled) return;
        positions = next;
        layoutVersion += 1;
        layingOut = false;
      })
      .catch((error) => {
        console.error("Token graph layout failed", error);
        if (!cancelled) layingOut = false;
      });

    return () => {
      cancelled = true;
    };
  });

  const nodeTypes = { token: NodeLinkNode };

  const computedNodes = $derived(
    scopedTokens
      .filter((token) => positions.has(token.name))
      .map((token): Node<NodeLinkNodeData, "token"> => {
        const point = positions.get(token.name)!;
        return {
          id: token.name
          , type: "token" as const
          , width: NODE_WIDTH
          , height: NODE_HEIGHT
          , position: { x: point.x, y: point.y }
          , hidden: !layerVisibleIds.has(token.name)
          , style: visibleIds.has(token.name) ? undefined : "opacity: 0.12;"
          , data: {
            name: token.name
            , value: token.value
            , layer: token.layer
            , family: token.family
            , refs: token.refs
          , }
        , };
      })
  , );

  const computedEdges = $derived(
    edges
      .filter((edge) => positions.has(edge.source) && positions.has(edge.target))
      .map((edge) => ({
        ...edge
        , hidden: !visibleIds.has(edge.source) || !visibleIds.has(edge.target)
      , }))
  , );

  const selectedNode = $derived(selectedId ? scopedTokens.find((token) => token.name === selectedId) : null);
  const selectedRefs = $derived(
    selectedNode ? (selectedNode.refs ?? []).filter((ref) => visibleIds.has(ref)) : []
  , );

  function toggleLayer(layer: string) {
    const next = new Set(activeLayers);
    next.has(layer) ? next.delete(layer) : next.add(layer);
    activeLayers = next;
  }
</script>

<div class="node-link-diagram">
  <div data-toolbar style={styles.toolbar}>
    <label data-filter style={styles.filter}>
      <span>Component</span>
      <select style={styles.select} bind:value={component} onchange={() => (selectedId = null)}>
        <option value="all">All tokens · {allTokens.length}</option>
        {#each componentFamilies as family (family)}
          <option value={family}>{family} · {familySizes.get(family)}</option>
        {/each}
      </select>
    </label>
    <label data-search style={styles.search}>
      <span class="visually-hidden" style={styles.hidden}>Search tokens</span>
      <input
        style={styles.input}
        type="search"
        bind:value={query}
        placeholder="Search {scopedTokens.length} tokens…"
        spellcheck="false"
        autocomplete="off"
      />
    </label>
    <div data-actions style={styles.actions}>
      {#each layers as layer (layer.layer)}
        <button
          type="button"
          class={activeLayers.has(layerKey(layer.layer)) ? "primary" : undefined}
          onclick={() => toggleLayer(layerKey(layer.layer))}
        >{layer.layer.split("·")[0].trim()}</button>
      {/each}
      <span data-count style={styles.count}>{visibleIds.size} / {scopedTokens.length} tokens</span>
    </div>
  </div>

  <SvelteFlow
    nodes={computedNodes}
    edges={computedEdges}
    {nodeTypes}
    fitView
    fitViewOptions={{ padding: 0.12, includeHiddenNodes: false }}
    nodesDraggable={true}
    nodesConnectable={false}
    edgesUpdatable={false}
    edgesFocusable={false}
    minZoom={0.02}
    maxZoom={2.5}
    colorMode="system"
    onnodeclick={({ node }) => (selectedId = node.id)}
    onpaneclick={() => (selectedId = null)}
  >
    <Background gap={24} />
    <Controls showInteractive={false} />
    <FitView version={layoutVersion} enabled={!layingOut && positions.size > 0} />
  </SvelteFlow>

  {#if layingOut}
    <div data-layout-status style={styles.status}>Laying out {scopedTokens.length} tokens…</div>
  {/if}

  {#if selectedNode}
    <aside data-detail style={styles.detail}>
      <div data-detail-head style={styles.detailHead}>
        <code data-detail-name style={styles.detailName}>{selectedNode.name}</code>
        <button type="button" onclick={() => (selectedId = null)} aria-label="Close">
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m4 4 8 8" /><path d="M12 4 4 12" />
          </svg>
        </button>
      </div>
      <p data-detail-meta style={styles.detailMeta}>{selectedNode.layer} · {selectedNode.family}</p>
      <code data-detail-value style={styles.detailValue}>{selectedNode.value}</code>
      {#if selectedRefs.length}
        <ul data-detail-refs style={styles.detailRefs}>
          {#each selectedRefs as ref (ref)}
            <li>
              <button type="button" data-ref style={styles.ref} onclick={() => (selectedId = ref)}>{ref}</button>
            </li>
          {/each}
        </ul>
      {/if}
    </aside>
  {/if}
</div>
