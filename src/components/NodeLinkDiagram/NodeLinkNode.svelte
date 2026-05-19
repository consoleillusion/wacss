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
  const t = (property: string) => `var(--node-link-diagram-${property}-secondary-static)`;

  const layerBackground =
    { "1": "token-node-layer-1-background"
    , "2": "token-node-layer-2-background"
    , "3": "token-node-layer-3-background"
    , "4": "token-node-layer-4-background"
    , "5": "token-node-layer-5-background"
    } as const;
  const layerInk =
    { "1": "token-node-layer-1-color"
    , "2": "token-node-layer-2-color"
    , "4": "token-node-layer-4-color"
    } as const;
  const layerEdge =
    { "1": "token-node-border-color"
    , "2": "token-node-layer-2-border-color"
    , "3": "token-node-layer-3-border-color"
    , "4": "token-node-layer-4-border-color"
    , "5": "token-node-layer-5-border-color"
    } as const;

  const key = layer in layerBackground ? (layer as keyof typeof layerBackground) : "5";
  const style = [
    "inline-size: 100%",
    "block-size: 100%",
    "display: flex",
    "align-items: center",
    `padding-inline: ${t("token-node-padding-inline")}`,
    `padding-block: ${t("token-node-padding-block")}`,
    `border: ${t("token-node-border")}`,
    `border-radius: ${t("token-node-border-radius")}`,
    `color: ${t(layerInk[key as keyof typeof layerInk] ?? "token-node-color")}`,
    `font-family: ${t("token-node-font-family")}`,
    `font-size: ${t("token-node-font-size")}`,
    "overflow: hidden",
    "white-space: nowrap",
    "text-overflow: ellipsis",
    "box-sizing: border-box",
    `background: ${t(layerBackground[key])}`,
    `border-color: ${t(layerEdge[key])}`
  ].join("; ");
</script>

<div data-token-node data-layer={layer} title={data.layer + " · " + data.family} {style}>
  <code>{data.name}</code>
  <Handle type="target" position={Position.Left} isConnectable={false} />
  <Handle type="source" position={Position.Right} isConnectable={false} />
</div>
