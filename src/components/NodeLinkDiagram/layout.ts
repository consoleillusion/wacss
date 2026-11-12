/**
 * Layered (Sugiyama) layout for the token dependency graph.
 *
 * The five token layers are treated as graph partitions, so every component
 * subgraph keeps a strict left-to-right L1 → L5 reading order. ELK minimises
 * edge crossings with repeated barycentre sweeps and places nodes with the
 * Brandes–Köpf algorithm, which keeps connected tokens close together.
 */
import ELK from "elkjs/lib/elk-api.js";
import elkWorkerUrl from "elkjs/lib/elk-worker.min.js?url";

export interface LayoutToken {
  name: string;
  layer: string;
  family: string;
}

export interface LayoutEdge {
  source: string;
  target: string;
}

export interface LayoutPoint {
  x: number;
  y: number;
}

const LAYER_PARTITION = { L1: 0, L2: 1, L3: 2, L4: 3, L5: 4 };

// ELK runs in a dedicated worker so laying out the full graph (~1000 nodes)
// never blocks the UI thread. The worker bundle is loaded on demand and the
// instance is created lazily because this module is also imported during SSR.
let elk: InstanceType<typeof ELK> | null = null;

function engine(): InstanceType<typeof ELK> {
  elk ??= new ELK({ workerUrl: elkWorkerUrl });
  return elk;
}

export async function computeLayout(
  tokens: LayoutToken[],
  edges: LayoutEdge[],
  nodeWidth: number,
  nodeHeight: number,
): Promise<Map<string, LayoutPoint>> {
  if (tokens.length === 0) return new Map();

  const ids = new Set(tokens.map((token) => token.name));
  // Model order is a soft constraint for ELK: grouping by family first keeps
  // related tokens in the same band of a layer and shortens most edges.
  const ordered = [...tokens].sort((a, b) =>
    a.family === b.family ? a.name.localeCompare(b.name) : a.family.localeCompare(b.family),
  );
  const large = tokens.length > 400;

  const result = await engine().layout({
    id: "token-graph",
    layoutOptions: {
      "elk.algorithm": "layered",
      "elk.direction": "RIGHT",
      "elk.partitioning.activate": "true",
      "elk.layered.crossingMinimization.strategy": "LAYER_SWEEP",
      "elk.layered.nodePlacement.strategy": "BRANDES_KOEPF",
      // The full graph is an overview; spend the extra passes on the readable
      // per-component views instead.
      "elk.layered.thoroughness": large ? "2" : "4",
      "elk.layered.spacing.nodeNodeBetweenLayers": "72",
      "elk.layered.spacing.edgeNodeBetweenLayers": "18",
      "elk.spacing.nodeNode": "18",
      "elk.spacing.componentComponent": "72",
      "elk.separateConnectedComponents": "true",
      ...(large ? {} : { "elk.layered.considerModelOrder.strategy": "NODES_AND_EDGES" }),
    },
    children: ordered.map((token) => ({
      id: token.name,
      width: nodeWidth,
      height: nodeHeight,
      layoutOptions: {
        "elk.partitioning.partition": String(LAYER_PARTITION[token.layer] ?? 0),
      },
    })),
    edges: edges
      .filter((edge) => ids.has(edge.source) && ids.has(edge.target))
      .map((edge, index) => ({
        id: `edge-${index}`,
        sources: [edge.source],
        targets: [edge.target],
      })),
  });

  const positions = new Map<string, LayoutPoint>();
  for (const child of result.children ?? []) {
    positions.set(child.id, { x: child.x ?? 0, y: child.y ?? 0 });
  }
  return positions;
}
