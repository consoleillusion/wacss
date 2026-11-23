<script lang="ts">
  // The token hierarchy of one component (with its parts), L1 to L4, one column per level.
  // Selecting a token highlights its chain; editing it sets the token on <html> so every
  // demo on the page changes live.
  import { SvelteFlow, Background, Controls, type Node, type Edge } from "@xyflow/svelte";
  import "@xyflow/svelte/dist/style.css";
  import TokenNode from "./TokenNode.svelte";
  import LevelNode from "./LevelNode.svelte";

  type Token = { name: string; level: number; value: string; group: string; refs: string[] };
  type Data = { tokens: Token[]; components: Record<string, { name: string; parts: string[] }> };
  let { data, titles, initial = "Button" }: { data: Data; titles: string[]; initial?: string } = $props();

  const byName = new Map(data.tokens.map((t) => [t.name, t]));
  const dependents = new Map<string, string[]>();
  for (const t of data.tokens) for (const r of t.refs) dependents.set(r, [...(dependents.get(r) ?? []), t.name]);

  let selected = $state(initial);
  let picked = $state<string | undefined>(undefined);
  let edits = $state<Record<string, string>>({});
  let mode = $state<"dark" | "light">("dark");

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
    const groups = [selected, ...data.components[selected]!.parts].map((t) => data.components[t]!.name);
    const own = data.tokens.filter((t) => t.level >= 3 && groups.includes(t.group)).map((t) => t.name);
    return walk(own, (n) => byName.get(n)!.refs);
  });

  const chain = $derived(picked
    ? new Set([...walk([picked], (n) => byName.get(n)!.refs), ...walk([picked], (n) => dependents.get(n) ?? [])])
    : undefined);

  const valueOf = (name: string) =>
    // Purpose: a token's current value, edited or generated
    edits[name] ?? byName.get(name)!.value;

  let nodes = $state.raw<Node[]>([]);
  let edges = $state.raw<Edge[]>([]);
  const ROWS = 18, WIDTH = 420, HEIGHT = 56;
  const LEVELS = ["L1 primitive", "L2 semantic and channel", "L3 component × variant", "L4 state"];
  $effect(() => {
    const columns: Record<number, Token[]> = {};
    for (const n of scope) { const t = byName.get(n)!; (columns[t.level] ??= []).push(t); }
    // Each level wraps into sub-columns of ROWS tokens; levels sit side by side, L1 on the left.
    let x = 0;
    const placed: Node[] = [];
    for (const level of [1, 2, 3, 4]) {
      const ts = (columns[level] ?? []).sort((a, b) => a.group.localeCompare(b.group) || a.name.localeCompare(b.name));
      placed.push({ id: `level-${level}`, type: "level", position: { x, y: -HEIGHT * 1.5 }, data: { label: LEVELS[level - 1] }, selectable: false });
      ts.forEach((t, i) => placed.push({
        id: t.name,
        type: "token",
        position: { x: x + Math.floor(i / ROWS) * WIDTH, y: (i % ROWS) * HEIGHT },
        data: { name: t.name, value: valueOf(t.name), edited: t.name in edits, dim: !!chain && !chain.has(t.name), picked: t.name === picked },
      }));
      x += Math.max(1, Math.ceil(ts.length / ROWS)) * WIDTH + WIDTH / 2;
    }
    nodes = placed;
    edges = [...scope].flatMap((n) => byName.get(n)!.refs.filter((r) => scope.has(r)).map((r) => ({
      id: `${r}->${n}`,
      source: r,
      target: n,
      animated: !!chain && chain.has(r) && chain.has(n),
      hidden: !!chain && !(chain.has(r) && chain.has(n)),
    })));
  });

  $effect(() => {
    // Show only the selected component's demo.
    for (const el of document.querySelectorAll<HTMLElement>("[data-design-demo]")) el.hidden = el.dataset.designDemo !== selected;
    picked = undefined;
  });

  $effect(() => {
    // Follow the page theme.
    const read = () => {
      // Purpose: the colour scheme the page currently renders in
      mode = getComputedStyle(document.documentElement).colorScheme.includes("light") ? "light" : "dark";
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
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
    <label>Component
      <select bind:value={selected}>
        {#each titles as t}<option value={t}>{t}</option>{/each}
      </select>
    </label>
    <button type="button" onclick={() => copy(scope, "component")}>Copy {selected} tokens</button>
    <button type="button" onclick={() => copy(byName.keys(), "all")}>Copy all tokens</button>
    <button type="button" class="tertiary" onclick={reset} disabled={!Object.keys(edits).length}>Reset edits</button>
    <span aria-live="polite">{copied && `Copied ${copied} tokens`}</span>
  </div>

  <div class="demo-graph">
    <SvelteFlow bind:nodes bind:edges nodeTypes={{ token: TokenNode, level: LevelNode }} colorMode={mode} fitView minZoom={0.05}
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
