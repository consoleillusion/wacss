<script lang="ts">
  import { Handle, Position, type NodeProps, type Node } from "@xyflow/svelte";

  export type PertNodeData = {
    id: string;
    name: string;
    optimistic?: number;
    likely?: number;
    pessimistic?: number;
    expected: number;
    es: number;
    ef: number;
    slack: number;
    critical: boolean;
  };

  type PertFlowNode = Node<PertNodeData, "pert">;

  let { data }: NodeProps<PertFlowNode> = $props();

  const fmt = (n: number) => (Number.isFinite(n) ? Math.round(n * 10) / 10 : 0);
</script>

<div data-pert-node class:critical={data.critical}>
  <div class="pert-node-head">
    <span class="pert-node-id">{data.id}</span>
    <span class="pert-node-expected">{fmt(data.expected)}d</span>
  </div>
  <div class="pert-node-name">{data.name}</div>
  <div class="pert-node-meta">
    <span>ES {fmt(data.es)}</span>
    <span>EF {fmt(data.ef)}</span>
    <span>slack {fmt(data.slack)}</span>
  </div>
  <Handle type="target" position={Position.Left} />
  <Handle type="source" position={Position.Right} />
</div>
