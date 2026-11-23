<script lang="ts">
  // The token hierarchy of one component, laid out by inheritance: every token sits below the
  // tokens it references, so each line runs downward from a token to the tokens built on it.
  // Selecting a token highlights the tokens it affects in the accent, the tokens it is affected by
  // in the pop, and the tokens related to it indirectly in the muted text colour; editing it sets the token on <html> so every
  // demo on the page changes live.
  import { SvelteFlow, Background, Controls, type Node, type Edge } from "@xyflow/svelte";
  import "@xyflow/svelte/dist/style.css";
  import TokenNode from "./TokenNode.svelte";
  import Select from "../components/Select/Select.svelte";

  type Token = { name: string; level: number; value: string; group: string; refs: string[] };
  type Data = { tokens: Token[]; components: Record<string, { name: string }> };
  let { data, titles, initial = "Button" }: { data: Data; titles: string[]; initial?: string } = $props();

  const byName = new Map(data.tokens.map((t) => [t.name, t]));
  const dependents = new Map<string, string[]>();
  for (const t of data.tokens) for (const r of t.refs) dependents.set(r, [...(dependents.get(r) ?? []), t.name]);

  let selected = $state(initial);
  let picked = $state<string | undefined>(undefined);
  let edits = $state<Record<string, string>>({});

  const walk = (start: string[], next: (n: string) => string[]) => {
    // Purpose: every token reachable from the start tokens by following next()
    const seen = new Set<string>();
    const stack = [...start];
    while (stack.length) {
      const n = stack.pop()!;
      if (seen.has(n) || !byName.has(n)) continue;
      seen.add(n);
      stack.push(...next(n));
    }
    return seen;
  };

  const scope = $derived.by(() => {
    // Purpose: the component's own L3/L4 tokens and everything they reference, down to L1
    const name = data.components[selected]!.name;
    const own = data.tokens.filter((t) => t.level >= 3 && t.group === name).map((t) => t.name);
    return walk(own, (n) => byName.get(n)!.refs);
  });

  // The picked token's relations: the tokens it affects (its dependents, recursively) and the
  // tokens it is affected by (its references, recursively). Neither set contains the token itself.
  const affects = $derived(picked ? walk(dependents.get(picked) ?? [], (n) => dependents.get(n) ?? []) : new Set<string>());
  const affectedBy = $derived(picked ? walk(byName.get(picked)!.refs, (n) => byName.get(n)!.refs) : new Set<string>());
  // Indirect relations: the other tokens its dependents depend on (ancestors of its descendants),
  // and the other tokens that depend on what it depends on (descendants of its ancestors).
  const indirect = $derived.by(() => {
    if (!picked) return new Set<string>();
    const up = walk([...affects].flatMap((n) => byName.get(n)!.refs), (n) => byName.get(n)!.refs);
    const down = walk([...affectedBy].flatMap((n) => dependents.get(n) ?? []), (n) => dependents.get(n) ?? []);
    return new Set([...up, ...down].filter((n) => n !== picked && !affects.has(n) && !affectedBy.has(n)));
  });
  const relation = (name: string) =>
    // Purpose: how a token relates to the picked one: "picked", "affects", "affected-by", "indirect",
    // "unrelated", or none when nothing is picked
    !picked ? undefined
    : name === picked ? "picked"
    : affects.has(name) ? "affects"
    : affectedBy.has(name) ? "affected-by"
    : indirect.has(name) ? "indirect"
    : "unrelated";

  const valueOf = (name: string) =>
    // Purpose: a token's current value, edited or generated
    edits[name] ?? byName.get(name)!.value;

  let nodes = $state.raw<Node[]>([]);
  let edges = $state.raw<Edge[]>([]);
  const WIDTH = 340, HEIGHT = 46, GAP = 14, PER_ROW = 8, LAYER_GAP = 90;

  const layers = $derived.by(() => {
    // Purpose: group the tokens into layers, each token one layer below the deepest token it references,
    // and order each layer by the mean position of the tokens it references, to keep lines short
    const depth = new Map<string, number>();
    const depthOf = (n: string): number => {
      // Purpose: the token's layer: 0 for a token that references nothing in view
      if (!depth.has(n)) {
        const refs = byName.get(n)!.refs.filter((r) => scope.has(r));
        depth.set(n, refs.length ? 1 + Math.max(...refs.map(depthOf)) : 0);
      }
      return depth.get(n)!;
    };
    const result: string[][] = [];
    for (const n of [...scope].sort()) (result[depthOf(n)] ??= []).push(n);
    const index = new Map<string, number>();
    for (const layer of result) {
      const weight = (n: string) => {
        // Purpose: the mean position of the referenced tokens in earlier layers
        const ps = byName.get(n)!.refs.map((r) => index.get(r)).filter((p): p is number => p !== undefined);
        return ps.length ? ps.reduce((a, b) => a + b, 0) / ps.length : 0;
      };
      layer.sort((a, b) => weight(a) - weight(b) || a.localeCompare(b));
      layer.forEach((n, i) => index.set(n, i / Math.max(1, layer.length - 1)));
    }
    return result;
  });

  const positions = $derived.by(() => {
    // Purpose: place each layer below the previous one, wrapping long layers into centred rows
    const at = new Map<string, { x: number; y: number }>();
    let y = 0;
    for (const layer of layers) {
      for (let row = 0; row * PER_ROW < layer.length; row++) {
        const items = layer.slice(row * PER_ROW, (row + 1) * PER_ROW);
        const offset = ((PER_ROW - items.length) * (WIDTH + GAP)) / 2;
        items.forEach((n, i) => at.set(n, { x: offset + i * (WIDTH + GAP), y }));
        y += HEIGHT + GAP;
      }
      y += LAYER_GAP;
    }
    return at;
  });

  $effect(() => {
    const placed: Node[] = [...scope].map((n) => {
      const t = byName.get(n)!;
      const { x, y } = positions.get(n)!;
      return {
        id: n,
        type: "token",
        position: { x, y },
        data: { name: n, level: t.level, value: valueOf(n), edited: n in edits, relation: relation(n) },
      };
    });
    nodes = placed;
    // One edge per reference, from the referenced token to the token that refers to it. While a token
    // is picked, edges on its downstream path take the accent and edges on its upstream path the pop.
    const edgeClass = (from: string, to: string) => {
      // Purpose: the highlight class of one edge, given the picked token's relations
      const [a, b] = [relation(from), relation(to)];
      if (!picked) return "";
      if ((a === "picked" || a === "affects") && b === "affects") return "affects";
      if (a === "affected-by" && (b === "picked" || b === "affected-by")) return "affected-by";
      if (a !== "unrelated" && b !== "unrelated") return "indirect";
      return "unrelated";
    };
    edges = [...scope].flatMap((n) => byName.get(n)!.refs.filter((r) => scope.has(r)).map((r) => ({
      id: `${r}->${n}`,
      source: r,
      target: n,
      class: edgeClass(r, n),
    })));
  });

  $effect(() => {
    // Show only the selected component's demo.
    for (const el of document.querySelectorAll<HTMLElement>("[data-design-demo]")) el.hidden = el.dataset.designDemo !== selected;
    picked = undefined;
  });

  const edit = (name: string, value: string) => {
    // Purpose: set a token on <html> so the change applies everywhere at once
    edits = { ...edits, [name]: value };
    document.documentElement.style.setProperty(name, value);
  };

  const reset = () => {
    // Purpose: drop every edit and return to the generated values
    for (const name of Object.keys(edits)) document.documentElement.style.removeProperty(name);
    edits = {};
  };

  let copied = $state("");
  const copy = async (names: Iterable<string>, label: string) => {
    // Purpose: copy tokens, with any edits, as a :root block
    const sorted = [...names].map((n) => byName.get(n)!).sort((a, b) => a.level - b.level || a.name.localeCompare(b.name));
    await navigator.clipboard.writeText(`:root {\n${sorted.map((t) => `  ${t.name}: ${valueOf(t.name)};`).join("\n")}\n}\n`);
    copied = label;
    setTimeout(() => (copied = ""), 1500);
  };
</script>

<div class="stack demo-design">
  <div class="cluster">
    <Select label="Component" options={titles} bind:value={selected} />
    <button type="button" onclick={() => copy(scope, "component")}>Copy {selected} tokens</button>
    <button type="button" onclick={() => copy(byName.keys(), "all")}>Copy all tokens</button>
    <button type="button" class="tertiary" onclick={reset} disabled={!Object.keys(edits).length}>Reset edits</button>
    <span aria-live="polite">{copied && `Copied ${copied} tokens`}</span>
  </div>

  <div class="demo-graph">
    <SvelteFlow bind:nodes bind:edges nodeTypes={{ token: TokenNode }} fitView minZoom={0.05}
      nodesDraggable={false} onnodeclick={({ node }) => node.type === "token" && (picked = picked === node.id ? undefined : node.id)}
      onpaneclick={() => (picked = undefined)}>
      <Background />
      <Controls />
    </SvelteFlow>

    {#if picked}
      {@const t = byName.get(picked)!}
      <aside class="stack demo-editor">
        <code>{t.name}</code>
        <small>L{t.level} · {t.group}</small>
        <textarea rows="4" value={valueOf(t.name)} oninput={(e) => edit(t.name, e.currentTarget.value)}></textarea>
        <small>References: {t.refs.join(", ") || "none"}</small>
        <small>Generated value: {t.value}</small>
      </aside>
    {/if}
  </div>
</div>
