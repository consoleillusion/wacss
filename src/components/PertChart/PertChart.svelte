<script lang="ts">
  import "@xyflow/svelte/dist/style.css";
  import { SvelteFlow, Background, Controls, BackgroundVariant, type Node, type Edge, type Viewport } from "@xyflow/svelte";
  import dagre from "@dagrejs/dagre";
  import PertNode, { type PertNodeData } from "./PertNode.svelte";

  export type PertTask = {
    /** Unique activity id, e.g. "A", "B", "1". */
    id: string;
    /** What the task does. */
    name: string;
    /** Optimistic estimate in days. */
    optimistic?: number;
    /** Most likely estimate in days. */
    likely?: number;
    /** Pessimistic estimate in days. */
    pessimistic?: number;
    /** Fixed duration in days. Overrides the PERT estimate when set. */
    days?: number;
    /** Ids of the tasks this task depends on. */
    dependsOn?: string[];
  };

  let {
    tasks = [] as PertTask[],
    class: className = "",
    ...restProps
  }: {
    tasks?: PertTask[];
    class?: string;
    [key: string]: unknown;
  } = $props();

  const NODE_WIDTH = 216;
  const NODE_HEIGHT = 96;

  const computed = $derived.by(() => {
    const byId = new Map(tasks.map((t) => [t.id, t]));

    const expectedOf = (t: PertTask) => {
      if (t.days != null) return Math.max(0, t.days);
      const o = t.optimistic ?? t.likely ?? 0;
      const p = t.pessimistic ?? t.likely ?? o;
      const m = t.likely ?? (o + p) / 2;
      return Math.max(0, (o + 4 * m + p) / 6);
    };

    // Kahn's algorithm over the dependency graph; tasks in unresolvable cycles get zero times.
    const indegree = new Map(tasks.map((t) => [t.id, (t.dependsOn ?? []).filter((p) => byId.has(p)).length]));
    const queue = tasks.filter((t) => indegree.get(t.id) === 0).map((t) => t.id);
    const es = new Map<string, number>();
    const ef = new Map<string, number>();
    const order: string[] = [];

    while (queue.length) {
      const id = queue.shift()!;
      order.push(id);
      const deps = (byId.get(id)!.dependsOn ?? []).filter((p) => byId.has(p));
      const start = deps.reduce((max, p) => Math.max(max, ef.get(p) ?? 0), 0);
      es.set(id, start);
      ef.set(id, start + expectedOf(byId.get(id)!));
      for (const t of tasks) {
        if ((t.dependsOn ?? []).includes(id)) {
          const next = indegree.get(t.id)! - 1;
          indegree.set(t.id, next);
          if (next === 0) queue.push(t.id);
        }
      }
    }

    const projectEnd = order.reduce((max, id) => Math.max(max, ef.get(id) ?? 0), 0);

    // Backward pass for slack.
    const successorsOf = new Map(tasks.map((t) => [t.id, tasks.filter((u) => (u.dependsOn ?? []).includes(t.id)).map((u) => u.id)]));
    const ls = new Map<string, number>();
    const slack = new Map<string, number>();
    for (const id of [...order].reverse()) {
      const succ = successorsOf.get(id)!;
      const finish = succ.length ? Math.min(...succ.map((s) => ls.get(s) ?? projectEnd)) : projectEnd;
      ls.set(id, finish - expectedOf(byId.get(id)!));
      slack.set(id, ls.get(id)! - (es.get(id) ?? 0));
    }

    const EPSILON = 1e-6;
    const critical = new Set(order.filter((id) => Math.abs(slack.get(id) ?? Infinity) < EPSILON));

    // DAG layout.
    const g = new dagre.graphlib.Graph();
    g.setGraph({ rankdir: "LR", nodesep: 28, ranksep: 72, marginx: 8, marginy: 8 });
    g.setDefaultEdgeLabel(() => ({}));
    for (const t of tasks) g.setNode(t.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
    for (const t of tasks) {
      for (const dep of (t.dependsOn ?? []).filter((p) => byId.has(p))) g.setEdge(dep, t.id);
    }
    dagre.layout(g);

    return order.map((id) => {
      const task = byId.get(id)!;
      const node = g.node(id);
      return {
        id,
        type: "pert" as const,
        position: { x: node.x - NODE_WIDTH / 2, y: node.y - NODE_HEIGHT / 2 },
        data: {
          id,
          name: task.name,
          optimistic: task.optimistic,
          likely: task.likely,
          pessimistic: task.pessimistic,
          expected: es.has(id) ? ef.get(id)! - es.get(id)! : expectedOf(task),
          es: es.get(id) ?? 0,
          ef: ef.get(id) ?? 0,
          slack: slack.get(id) ?? 0,
          critical: critical.has(id),
        },
      };
    });
  });

  const edges = $derived.by(() => {
    const critical = new Set(computed.filter((n) => n.data.critical).map((n) => n.id));
    return tasks.flatMap((t) =>
      (t.dependsOn ?? [])
        .filter((dep) => tasks.some((u) => u.id === dep))
        .map((dep) => ({
          id: `${dep}->${t.id}`,
          source: dep,
          target: t.id,
          type: "smoothstep" as const,
          animated: false,
          style: critical.has(dep) && critical.has(t.id)
            ? "stroke: var(--color-accent); stroke-width: 2.5;"
            : "stroke: var(--color-border); stroke-width: 1.5;",
        })),
    );
  });

  const nodeTypes = { pert: PertNode };

  let root = $state<HTMLElement | null>(null);
  let hasFitted = $state(false);
  let viewport = $state<Viewport>({ x: 0, y: 0, zoom: 0.5 });

  // Xyflow Svelte fits the viewport once at mount and never re-fits when the container resizes.
  // Fit ourselves: the layout is a DAG of known node sizes, so content bounds are exact.
  $effect(() => {
    if (!root || hasFitted || !computed.length) return;
    const w = root.clientWidth;
    const h = root.clientHeight;
    if (!w || !h) return;
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const node of computed) {
      minX = Math.min(minX, node.position.x);
      maxX = Math.max(maxX, node.position.x + NODE_WIDTH);
      minY = Math.min(minY, node.position.y);
      maxY = Math.max(maxY, node.position.y + NODE_HEIGHT);
    }
    const contentW = maxX - minX;
    const contentH = maxY - minY;
    const zoom = Math.min(w / contentW, h / contentH, 1) * 0.92;
    viewport = {
      zoom,
      x: (w - contentW * zoom) / 2 - minX * zoom,
      y: (h - contentH * zoom) / 2 - minY * zoom,
    };
    hasFitted = true;
  });
</script>

{#if tasks.length}
  <div data-pert-chart-root class={className || undefined} {...restProps} bind:this={root}>
    <SvelteFlow
      nodes={computed}
      edges={edges}
      {nodeTypes}
      {viewport}
      nodesDraggable={true}
      nodesConnectable={false}
      edgesUpdatable={false}
      edgesFocusable={false}
      colorMode="system"
      proOptions={{ hideAttribution: false }}
    >
      <Background variant={BackgroundVariant.Dots} gap={18} size={1} />
      <Controls showInteractive={false} />
    </SvelteFlow>
  </div>
{:else}
  <div data-pert-chart-root class={className || undefined} {...restProps}>
    <p>No tasks provided.</p>
  </div>
{/if}
