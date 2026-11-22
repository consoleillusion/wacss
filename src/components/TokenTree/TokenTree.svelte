<script lang="ts">
  import { computeTokenValues, type Overrides, type Schema } from "../../lib/tokenModel";

  type SchemaInfo = Schema & { schemaPath: string };
  let { schemas = [] as SchemaInfo[], initialComponent = "" }: { schemas: SchemaInfo[]; initialComponent?: string } = $props();

  const names = $derived(schemas.map((s) => s.title).sort((a, b) => a.localeCompare(b)));
  let selected = $state(initialComponent || schemas[0]?.title || "");
  $effect(() => {
    if (selected && !schemas.some((s) => s.title === selected)) selected = names[0] ?? "";
    if (!selected && names[0]) selected = names[0];
  });

  const schema = $derived(schemas.find((s) => s.title === selected));
  let overrides = $state<Overrides>({});
  let selectedKey = $state("");
  let selectedVariant = $state("");
  $effect(() => {
    const variants = schema?.variants ?? [];
    if (!variants.length) { selectedVariant = ""; return; }
    if (!selectedVariant || !variants.includes(selectedVariant)) selectedVariant = variants[0];
  });

  type Node = { id: string; label: string; kind: "component" | "property" | "variant" | "state"; varName: string; defaultValue: string; overrideKey: string; depth: number; parentId?: string };
  const computed = $derived(schema ? computeTokenValues(schema, overrides) : undefined);

  const nodes = $derived.by(() => {
    if (!schema || !computed) return [] as Node[];
    const c = schema.name;
    const v = selectedVariant || schema.variants[0] || "";
    const out: Node[] = [{ id: c, label: schema.title, kind: "component", varName: `--${c}`, defaultValue: "component", overrideKey: "", depth: 0 }];
    for (const prop of schema.themeableProperties) {
      const propId = `${c}/${prop}`;
      out.push({ id: propId, label: prop, kind: "property", varName: `--${c}-${prop}`, defaultValue: computed.l3[`--${c}-${prop}`] ?? `var(--${prop})`, overrideKey: prop, depth: 1, parentId: c });
      const varId = `${propId}/__variant__`;
      out.push({ id: varId, label: v, kind: "variant", varName: `--${c}-${prop}-${v}`, defaultValue: computed.l4[`--${c}-${prop}-${v}`] ?? "", overrideKey: `${prop}.${v}`, depth: 2, parentId: propId });
      for (const state of schema.states) {
        const stateId = `${varId}/${state}`;
        out.push({ id: stateId, label: state, kind: "state", varName: `--${c}-${prop}-${v}-${state}`, defaultValue: computed.l5[`--${c}-${prop}-${v}-${state}`] ?? "", overrideKey: `${prop}.${v}.${state}`, depth: 3, parentId: varId });
      }
    }
    return out;
  });

  const nodeById = $derived(new Map(nodes.map((n) => [n.id, n])));
  $effect(() => {
    if (!selectedKey && nodes[0]) selectedKey = nodes[0].id;
    if (selectedKey && !nodeById.has(selectedKey)) selectedKey = nodes[0]?.id ?? "";
  });
  const selectedNode = $derived(nodeById.get(selectedKey));

  const draft = $derived(selectedNode ? (overrides[selectedNode.overrideKey] ?? selectedNode.defaultValue) : "");

  function onDraftInput(e: Event) {
    if (!selectedNode || !selectedNode.overrideKey) return;
    const next = (e.target as HTMLTextAreaElement).value;
    const all = { ...overrides };
    if (!next.trim() || next === selectedNode.defaultValue) delete all[selectedNode.overrideKey];
    else all[selectedNode.overrideKey] = next;
    overrides = all;
  }

  function resetOverrides() { overrides = {}; }
  const overrideCount = $derived(Object.keys(overrides).length);

  type LayoutNode = Node & { x: number; y: number; children: string[] };
  const NODE_W = 88;
  const NODE_H = 44;
  const layout = $derived.by(() => {
    const byParent = new Map<string | undefined, Node[]>();
    for (const n of nodes) { const arr = byParent.get(n.parentId) ?? []; arr.push(n); byParent.set(n.parentId, arr); }
    const pos = new Map<string, { x: number; y: number }>();
    const levelGapY = 84;
    const nodeGapX = NODE_W + 12;
    const STATE_WRAP = 3;
    let leafX = 16;

    function layoutStateLeaves(ids: string[], depth: number): number {
      const rows: string[][] = [];
      for (let i = 0; i < ids.length; i += STATE_WRAP) rows.push(ids.slice(i, i + STATE_WRAP));
      const startX = leafX;
      const rowWidth = Math.max(...rows.map((r) => r.length * nodeGapX), nodeGapX);
      rows.forEach((row, ri) => {
        row.forEach((id, ci) => {
          pos.set(id, { x: startX + ci * nodeGapX, y: 24 + depth * levelGapY + ri * (NODE_H + 10) });
        });
      });
      leafX += rowWidth;
      return startX + (rowWidth - nodeGapX) / 2;
    }

    function walk(id: string): number {
      const children = (byParent.get(id) ?? []).map((c) => c.id);
      const node = nodeById.get(id)!;
      let x: number;
      if (!children.length) { x = leafX; leafX += nodeGapX; }
      else if (children.every((cid) => nodeById.get(cid)?.kind === "state")) { x = layoutStateLeaves(children, node.depth + 1); }
      else { const xs = children.map(walk); x = (Math.min(...xs) + Math.max(...xs)) / 2; }
      pos.set(id, { x, y: 24 + node.depth * levelGapY });
      return x;
    }

    for (const r of byParent.get(undefined) ?? []) walk(r.id);
    let maxX = 0, maxY = 0;
    for (const p of pos.values()) { maxX = Math.max(maxX, p.x); maxY = Math.max(maxY, p.y); }
    return {
      nodes: nodes.map((n) => ({ ...n, ...(pos.get(n.id) ?? { x: 0, y: 0 }), children: (byParent.get(n.id) ?? []).map((c) => c.id) })),
      width: Math.max(600, maxX + NODE_W + 24),
      height: Math.max(280, maxY + NODE_H + 24),
    };
  });

  function edgePath(a: LayoutNode, b: LayoutNode) {
    const x1 = a.x + NODE_W / 2, y1 = a.y + NODE_H, x2 = b.x + NODE_W / 2, y2 = b.y, my = (y1 + y2) / 2;
    return `M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`;
  }

  const liveCss = $derived.by(() => {
    if (!computed) return "";
    const lines: string[] = [];
    // Apply overrides by setting the affected CSS variables directly.
    for (const [k, v] of Object.entries(overrides)) {
      // k is overrideKey: prop, prop.variant, prop.variant.state
      const parts = k.split(".");
      const c = schema!.name;
      if (parts.length === 1) lines.push(`--${c}-${parts[0]}: ${v};`);
      else if (parts.length === 2) lines.push(`--${c}-${parts[0]}-${parts[1]}: ${v};`);
      else if (parts.length === 3) lines.push(`--${c}-${parts[0]}-${parts[1]}-${parts[2]}: ${v};`);
    }
    if (!lines.length) return "";
    return `.token-preview { ${lines.join(" ")} }`;
  });
</script>

<div class="shell">
  <div class="toolbar">
    <label>Component <select bind:value={selected}>{#each names as name}<option value={name}>{name}</option>{/each}</select></label>
    <div class="actions">
      <button type="button" onclick={resetOverrides}>Reset value edits</button>
      <span class="muted">{overrideCount} override{overrideCount === 1 ? "" : "s"}</span>
    </div>
  </div>

  {#if schema}
    <div class="layout">
      <div class="graph-col">
        <div class="graph-wrap">
          <svg class="edges" width={layout.width} height={layout.height} aria-hidden="true">
            {#each layout.nodes as n (n.id)}{#each n.children as cid (cid)}{@const child = layout.nodes.find((x) => x.id === cid)}{#if child}<path d={edgePath(n, child)} />{/if}{/each}{/each}
          </svg>
          <div class="nodes" style:width={`${layout.width}px`} style:height={`${layout.height}px`}>
            {#each layout.nodes as n (n.id)}
              <div class={`node ${n.kind} ${selectedKey === n.id ? "active" : ""}`} style:left={`${n.x}px`} style:top={`${n.y}px`} role="button" tabindex="0" onclick={() => (selectedKey = n.id)} onkeydown={(e) => (e.key === "Enter" || e.key === " ") && (selectedKey = n.id)} title={n.varName}>
              {#if n.kind === "variant"}
                <span class="kind">variant</span>
                <select class="variant-select" bind:value={selectedVariant} onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()}>
                  {#each schema?.variants ?? [] as v}<option value={v}>{v}</option>{/each}
                </select>
              {:else}
                <span class="kind">{n.kind}</span><span class="label">{n.label}</span>
              {/if}
            </div>
            {/each}
          </div>
        </div>

        <div class="preview token-preview">
          <h3>Live preview: {schema.title}</h3>
          {#if schema.name === "button"}
            <div class="row">
              {#each schema.variants as variant (variant)}
                <button class={variant === "secondary" ? undefined : variant}>{variant}</button>
              {/each}
              <button disabled>disabled</button>
            </div>
          {:else if schema.name === "card"}
            <div class="row">
              {#each schema.variants as variant (variant)}
                <article class={variant === "secondary" ? "card" : `card ${variant}`}>
                  <header><h3>{variant} card</h3><p>Variant preview.</p></header>
                  <div><p>Card content goes here.</p></div>
                </article>
              {/each}
            </div>
          {:else if schema.name === "accordion"}
            <div class="accordion-preview">
              {#each schema.variants as variant (variant)}
                <div class={variant === "secondary" ? "accordion" : `accordion ${variant}`}>
                  <details open>
                    <summary><span>{variant} — Open item</span></summary>
                    <div><p>Smooth open/close content.</p></div>
                  </details>
                  <details>
                    <summary><span>{variant} — Closed item</span></summary>
                    <div><p>More content revealed smoothly.</p></div>
                  </details>
                </div>
              {/each}
            </div>
          {:else}
            <div class="row">
              {#each schema.variants as variant (variant)}
                <div class="preview-pill">{variant}</div>
              {/each}
            </div>
          {/if}
        </div>
        {@html `<style>${liveCss}</style>`}
      </div>


    </div>
  {:else}
    <p>No schema selected.</p>
  {/if}
</div>

<style>
  .shell { border:1px solid #d8d2c8; border-radius:10px; padding:1rem; background:#fffdfa; color:#2f2a25; }
  .toolbar { display:flex; justify-content:space-between; gap:1rem; align-items:end; margin-bottom:1rem; flex-wrap:wrap; }
  .actions { display:flex; gap:.6rem; align-items:center; }
  label { display:grid; gap:.25rem; font-size:.9rem; }
  select, button, textarea { font:inherit; }
  select, textarea { border:1px solid #c9c0b3; border-radius:6px; padding:.45rem .55rem; background:#fff; color:inherit; }
  button { border:1px solid #c9c0b3; border-radius:6px; padding:.45rem .65rem; background:#fff; cursor:pointer; }
  .muted { color:#6b6258; font-size:.85rem; }
  .layout { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:1rem; align-items:start; }
  .graph-col { display:grid; gap:1rem; min-width:0; }
  .graph-wrap { position:relative; overflow:auto; border:1px solid #ece4d8; border-radius:8px; background:linear-gradient(180deg,#fcfaf7,#f7f3ed); min-height:420px; width:100%; }
  .edges { position:absolute; inset:0; pointer-events:none; } .edges path { fill:none; stroke:#cfc2b3; stroke-width:2; }
  .nodes { position:relative; min-width:100%; }
  .node { position:absolute; width:88px; height:44px; text-align:left; display:flex; flex-direction:column; justify-content:center; gap:.05rem; padding:.3rem .4rem; border-radius:8px; border:1px solid #d7ccbf; background:#fff; box-shadow:0 1px 0 rgba(0,0,0,.03); box-sizing:border-box; cursor:pointer; }
  .variant-select { width:100%; font-size:.68rem; padding:0 .1rem; height:22px; border:1px solid #c9c0b3; border-radius:4px; background:#fff; }
  .node.active { outline:2px solid #7ea0c2; border-color:#7ea0c2; }
  .node.component { border-left:4px solid #7b61b3; } .node.property { border-left:4px solid #3b82b6; } .node.variant { border-left:4px solid #4f8a57; } .node.state { border-left:4px solid #c8871a; }
  .kind { font-size:.52rem; text-transform:uppercase; letter-spacing:.04em; color:#756b60; line-height:1; } .label { font-weight:600; font-size:.72rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; line-height:1.1; }
  .value { display:none; }
  .preview { border:1px solid #ece4d8; border-radius:8px; padding:1rem; background:#fcfaf7; }
  .preview h3 { margin:0 0 .75rem; font-size:1rem; }
  .row { display:flex; gap:.75rem; flex-wrap:wrap; align-items:center; }
  .editor { width:320px; border:1px solid #ece4d8; border-radius:8px; padding:1rem; background:#fcfaf7; position:sticky; top:1rem; }
  .editor h3, .editor h4 { margin:0 0 .5rem; } .meta { font-size:.83rem; margin-bottom:.35rem; } .meta .k { color:#6b6258; margin-right:.25rem; }
  .meta code, pre { background:#f1ebe2; border-radius:4px; padding:.1rem .3rem; font-size:.75rem; }
  .field { margin:.75rem 0; } textarea { width:100%; resize:vertical; min-height:72px; box-sizing:border-box; }
  pre { padding:.75rem; overflow:auto; margin:0; white-space:pre-wrap; word-break:break-word; }
  @media (max-width: 980px) { .layout { grid-template-columns:1fr; } .editor { position:static; } }
</style>