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
          , style: "stroke: var(--color-muted-foreground-static); stroke-width: 1.1px; stroke-opacity: 0.6;"
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

<div data-node-link-diagram-root>
  <div data-toolbar>
    <label data-filter>
      <span>Component</span>
      <select bind:value={component} onchange={() => (selectedId = null)}>
        <option value="all">All tokens · {allTokens.length}</option>
        {#each componentFamilies as family (family)}
          <option value={family}>{family} · {familySizes.get(family)}</option>
        {/each}
      </select>
    </label>
    <label data-search>
      <span class="visually-hidden">Search tokens</span>
      <input
        type="search"
        bind:value={query}
        placeholder="Search {scopedTokens.length} tokens…"
        spellcheck="false"
        autocomplete="off"
      />
    </label>
    <div data-actions>
      {#each layers as layer (layer.layer)}
        <button
          type="button"
          data-variant={activeLayers.has(layerKey(layer.layer)) ? "primary" : "secondary"}
          data-size="sm"
          data-active={activeLayers.has(layerKey(layer.layer)) ? "" : undefined}
          onclick={() => toggleLayer(layerKey(layer.layer))}
        >{layer.layer.split("·")[0].trim()}</button>
      {/each}
      <span data-count>{visibleIds.size} / {scopedTokens.length} tokens</span>
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
    <div data-layout-status>Laying out {scopedTokens.length} tokens…</div>
  {/if}

  {#if selectedNode}
    <aside data-detail>
      <div data-detail-head>
        <code data-detail-name>{selectedNode.name}</code>
        <button type="button" data-variant="secondary" data-size="icon" onclick={() => (selectedId = null)} aria-label="Close">
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m4 4 8 8" /><path d="M12 4 4 12" />
          </svg>
        </button>
      </div>
      <p data-detail-meta>{selectedNode.layer} · {selectedNode.family}</p>
      <code data-detail-value>{selectedNode.value}</code>
      {#if selectedRefs.length}
        <ul data-detail-refs>
          {#each selectedRefs as ref (ref)}
            <li>
              <button type="button" data-ref onclick={() => (selectedId = ref)}>{ref}</button>
            </li>
          {/each}
        </ul>
      {/if}
    </aside>
  {/if}
</div>
