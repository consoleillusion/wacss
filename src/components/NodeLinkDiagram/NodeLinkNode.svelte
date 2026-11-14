<script lang="ts">
  import { Handle, Position, type NodeProps, type Node } from "@xyflow/svelte";

  export type NodeLinkNodeData = {
    name: string;
    value: string;
    layer: string;
    family: string;
    refs: string[];
  };

  type NodeLinkNode = Node<NodeLinkNodeData, "token">;

  let { data }: NodeProps<NodeLinkNode> = $props();

  const layer = data.layer.charAt(1);
</script>

<div data-token-node data-layer={layer} title={data.layer + " · " + data.family}>
  <code>{data.name}</code>
  <Handle type="target" position={Position.Left} isConnectable={false} />
  <Handle type="source" position={Position.Right} isConnectable={false} />
</div>
