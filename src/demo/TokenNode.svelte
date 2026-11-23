<script lang="ts">
  // One token in the graph: its name and current value.
  import { Handle, Position } from "@xyflow/svelte";

  let { data }: { data: { name: string; level: number; value: string; edited: boolean; relation?: string } } = $props();
</script>

<div class="demo-token {data.relation ?? ''}" class:edited={data.edited}>
  <Handle type="target" position={Position.Top} />
  <code><small>L{data.level}</small> {data.name}</code>
  <span>{data.value}</span>
  <Handle type="source" position={Position.Bottom} />
</div>
