<script lang="ts">
  import "@xyflow/svelte/dist/style.css";
  import { SvelteFlow, Background, Controls, type Node, type Edge } from "@xyflow/svelte";
  import TokenNode, { type TokenNodeData } from "./TokenNode.svelte";

  export interface TokenNodeDataIn {
    name: string;
    value: string;
    refs: string[];
    family: string;
    layer: string;
  }
  export interface TokenFamily { family: string; tokens: TokenNodeDataIn[]; }
  export interface TokenLayer { layer: string; families: TokenFamily[]; }

  let { layers = [] as TokenLayer[] }: { layers?: TokenLayer[] } = $props();

  const NODE_WIDTH = 252;
  const NODE_HEIGHT = 36;
  const COLUMN_WIDTH = NODE_WIDTH + 96;

  const allTokens = layers.flatMap((layer) =>
    layer.families.flatMap((family) =>
      family.tokens.map((token) => ({ ...token, layer: layer.layer, family: family.family })),
    ),
  );

  const nodeTypes = { token: TokenNode };

  const LAYER_ORDER = ["L1", "L2", "L3", "L4", "L5"];
  const layerColumn = (layer: string) => {
    const i = LAYER_ORDER.findIndex((k) => layer.includes(k));
    return i === -1 ? LAYER_ORDER.length : i;
  };

  // Manual layer-by-layer layout: L1 leftmost → L5 rightmost.
  // Within a column, keep tokens grouped by family, alphabetical inside families.
  const nodes: Node<TokenNodeData, "token">[] = (() => {
    const columns = new Map<number, typeof allTokens>();
    for (const t of allTokens) {
      const c = layerColumn(t.layer);
      columns.set(c, [...(columns.get(c) ?? []), t]);
    }

    const sorted = [...columns.entries()].sort(([a], [b]) => a - b);
    const out: Node<TokenNodeData, "token">[] = [];
    for (const [col, tokens] of sorted) {
      const gap = 8;
      const sortedTokens = [...tokens].sort((a, b) =>
        a.family === b.family ? a.name.localeCompare(b.name) : a.family.localeCompare(b.family),
      );
      for (const [row, token] of sortedTokens.entries()) {
        out.push({
          id: token.name,
          type: "token" as const,
          position: { x: col * COLUMN_WIDTH, y: row * (NODE_HEIGHT + gap) },
          data: { name: token.name, value: token.value, layer: token.layer, family: token.family, refs: token.refs },
        });
      }
    }
    return out;
  })();

  const edges: Edge[] = (() => {
    const names = new Set(allTokens.map((t) => t.name));
    const pairs: Array<[string, string]> = [];
    for (const t of allTokens) {
      for (const ref of t.refs) {
        if (ref.startsWith("--color-theme")) continue; // runtime override, not in the static graph
        if (names.has(ref)) pairs.push([ref, t.name]);
      }
    }
    return pairs.map(([source, target], i) => ({
      id: `e${i}`,
      source,
      target,
      type: "smoothstep" as const,
      style: "stroke: var(--color-border); stroke-width: 1.5px; stroke-opacity: 0.8;",
    }));
  })();

  let query = $state("");
  let activeLayers = $state(new Set(layers.map((l) => l.layer)));
  let selectedId = $state<string | null>(null);

  let root = $state<HTMLElement | null>(null);
  let hasFitted = $state(false);
  let viewport = $state<Viewport>({ x: 0, y: 0, zoom: 0.3 });

  $effect(() => {
    if (!root || hasFitted || !nodes.length) return;
    const w = root.clientWidth;
    const h = root.clientHeight;
    let maxX = -Infinity, minX = Infinity;
    for (const node of nodes) {
      minX = Math.min(minX, node.position.x);
      maxX = Math.max(maxX, node.position.x + NODE_WIDTH);
    }
    const contentW = maxX - minX;
    // Fit horizontally; content is very tall, users pan vertically.
    const zoom = Math.min(0.8, (w * 0.96) / contentW, 1);
    viewport.zoom = Math.max(0.1, zoom);
    viewport.x = (w - contentW * viewport.zoom) / 2 - minX * viewport.zoom;
    viewport.y = 12;
    hasFitted = true;
  });

  const visibleIds = $derived.by(() => {
    const q = query.trim().toLowerCase();
    const ids = new Set<string>();
    for (const t of allTokens) {
      if (!activeLayers.has(t.layer)) continue;
      if (!q) { ids.add(t.name); continue; }
      if (t.name.toLowerCase().includes(q) || t.value.toLowerCase().includes(q) || t.refs.some((r) => r.toLowerCase().includes(q))) ids.add(t.name);
    }
    return ids;
  });

  const computedNodes = $derived(
    nodes.map((n) => ({
      ...n,
      hidden: !visibleIds.has(n.id),
      style: visibleIds.has(n.id) ? undefined : "opacity: 0.12;",
    })),
  );

  const computedEdges = $derived(
    edges.map((e) => ({
      ...e,
      hidden: !visibleIds.has(e.source!) || !visibleIds.has(e.target!),
    })),
  );

  const selectedNode = $derived(selectedId ? nodes.find((n) => n.id === selectedId) : null);
  const selectedRefs = $derived(selectedNode ? (selectedNode.data.refs ?? []).filter((r) => visibleIds.has(r)) : []);

  function toggleLayer(layer: string) {
    const next = new Set(activeLayers);
    next.has(layer) ? next.delete(layer) : next.add(layer);
    activeLayers = next;
  }
</script>

<div data-token-graph-root bind:this={root}>
  <div data-toolbar>
    <label data-search>
      <span class="visually-hidden">Search tokens</span>
      <input
        type="search"
        bind:value={query}
        placeholder="Search {allTokens.length} tokens…"
        spellcheck="false"
        autocomplete="off"
      />
    </label>
    <div data-actions>
      {#each layers as layer (layer.layer)}
        <button
          type="button"
          data-variant="secondary"
          data-size="sm"
          data-active={activeLayers.has(layer.layer) ? "" : undefined}
          onclick={() => toggleLayer(layer.layer)}
        >{layer.layer.split("·")[0].trim()}</button>
      {/each}
      <span data-count>{visibleIds.size} / {allTokens.length} tokens</span>
    </div>
  </div>

  <SvelteFlow
    nodes={computedNodes}
    edges={computedEdges}
    {nodeTypes}
    bind:viewport={viewport}
    nodesDraggable={true}
    nodesConnectable={false}
    edgesUpdatable={false}
    edgesFocusable={false}
    colorMode="system"
    onnodeclick={({ node }) => (selectedId = node.id)}
    onpaneclick={() => (selectedId = null)}
  >
    <Background gap={24} />
    <Controls showInteractive={false} />
  </SvelteFlow>

  {#if selectedNode}
    <aside data-detail>
      <div data-detail-head>
        <code data-detail-name>{selectedNode.data.name}</code>
        <button type="button" data-variant="secondary" data-size="icon" onclick={() => (selectedId = null)} aria-label="Close">
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m4 4 8 8" /><path d="M12 4 4 12" />
          </svg>
        </button>
      </div>
      <p data-detail-meta>{selectedNode.data.layer} · {selectedNode.data.family}</p>
      <code data-detail-value>{selectedNode.data.value}</code>
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

