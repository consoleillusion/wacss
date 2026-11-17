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
  const t = (property: string) => `var(--pert-chart-${property}-secondary-static)`;

  const rootStyle = [
    "display: grid",
    `gap: ${t("pert-node-gap")}`,
    "inline-size: 100%",
    "block-size: 100%",
    `padding: ${t("pert-node-padding")}`,
    `border: ${t("pert-node-border")}`,
    `border-radius: ${t("pert-node-border-radius")}`,
    `background: ${t(data.critical ? "pert-node-background-2" : "pert-node-background")}`,
    `color: ${t("pert-node-color")}`,
    "box-sizing: border-box",
    `transition: ${t("pert-node-transition")}`,
    data.critical ? `border-color: ${t("pert-node-border-color")}` : "",
    data.critical ? `box-shadow: ${t("pert-node-box-shadow")}` : ""
  ].filter(Boolean).join("; ");

  const headStyle = [
    "display: flex",
    "align-items: center",
    "justify-content: space-between",
    `gap: ${t("pert-node-head-gap")}`
  ].join("; ");

  const idStyle = [
    `font-size: ${t("pert-node-id-font-size")}`,
    `font-weight: ${t("pert-node-id-font-weight")}`,
    "letter-spacing: 0.08em",
    `color: ${t(data.critical ? "pert-node-id-color-2" : "pert-node-id-color")}`
  ].join("; ");

  const expectedStyle = [
    `font-size: ${t("pert-node-expected-font-size")}`,
    "font-variant-numeric: tabular-nums",
    `color: ${t("pert-node-expected-color")}`
  ].join("; ");

  const nameStyle = [
    `font-size: ${t("pert-node-name-font-size")}`,
    `font-weight: ${t("pert-node-name-font-weight")}`,
    `line-height: ${t("pert-node-name-line-height")}`,
    "overflow: hidden",
    "text-overflow: ellipsis",
    "white-space: nowrap"
  ].join("; ");

  const metaStyle = [
    "display: flex",
    `gap: ${t("pert-node-meta-gap")}`,
    `font-size: ${t("pert-node-meta-font-size")}`,
    "font-variant-numeric: tabular-nums",
    `color: ${t("pert-node-meta-color")}`
  ].join("; ");

  const handleStyle = [
    `inline-size: ${t("svelte-flow-handle-inline-size")}`,
    `block-size: ${t("svelte-flow-handle-block-size")}`,
    `background: ${t("svelte-flow-handle-background")}`,
    "border: none"
  ].join("; ");
</script>

<div style={rootStyle}>
  <div style={headStyle}>
    <span style={idStyle}>{data.id}</span>
    <span style={expectedStyle}>{fmt(data.expected)}d</span>
  </div>
  <div style={nameStyle}>{data.name}</div>
  <div style={metaStyle}>
    <span>ES {fmt(data.es)}</span>
    <span>EF {fmt(data.ef)}</span>
    <span>slack {fmt(data.slack)}</span>
  </div>
  <Handle type="target" position={Position.Left} isConnectable={false} style={handleStyle} />
  <Handle type="source" position={Position.Right} isConnectable={false} style={handleStyle} />
</div>
