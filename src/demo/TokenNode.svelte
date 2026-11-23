<script lang="ts">
  // One token in the graph: its name and current value.
  import { Handle, Position } from "@xyflow/svelte";

  let { data }: { data: { name: string; value: string; edited: boolean; dim: boolean; picked: boolean } } = $props();
</script>

<div class="demo-token" class:edited={data.edited} class:dim={data.dim} class:picked={data.picked}>
  <Handle type="target" position={Position.Left} />
  <code>{data.name}</code>
  <span>{data.value}</span>
  <Handle type="source" position={Position.Right} />
</div>
