import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "pert-chart"
, cssProperties:
    [ "xy-background-pattern-color"
    , "xy-edge-stroke"
    , "xy-edge-stroke-selected"
    , "xy-edge-box-shadow-selected"
    , "xy-handle-background-color"
    , "xy-handle-border-color"
    , "xy-node-color"
    , "xy-node-background-color"
    , "xy-node-border"
    , "xy-node-border-radius"
    , "xy-attribution-background-color"
    , "xy-minimap-background-color"
    , "xy-controls-color"
    , "xy-controls-button-background-color"
    , "xy-controls-button-background-color-hover"
    , "xy-controls-button-border-color"
    , "background"
    , "border"
    , "border-radius"
    , "min-block-size"
    , "pert-node-gap"
    , "pert-node-padding"
    , "pert-node-border"
    , "pert-node-border-radius"
    , "pert-node-background"
    , "pert-node-color"
    , "pert-node-transition"
    , "pert-node-border-color"
    , "pert-node-background-2"
    , "pert-node-box-shadow"
    , "pert-node-head-gap"
    , "pert-node-id-font-size"
    , "pert-node-id-font-weight"
    , "pert-node-id-color"
    , "pert-node-id-color-2"
    , "pert-node-expected-font-size"
    , "pert-node-expected-color"
    , "pert-node-name-font-size"
    , "pert-node-name-font-weight"
    , "pert-node-name-line-height"
    , "pert-node-meta-gap"
    , "pert-node-meta-font-size"
    , "pert-node-meta-color"
    , "svelte-flow-handle-inline-size"
    , "svelte-flow-handle-block-size"
    , "svelte-flow-handle-background"
    , "svelte-flow-handle-connecting-background"
    , "svelte-flow-controls-box-shadow"
    , "svelte-flow-controls-border"
    , "svelte-flow-controls-border-radius"
    , "edge-stroke"
    , "critical-edge-stroke"
    ]
, variants: ["secondary"]
, states: ["static"]
, structure:
    { static:
        { display: "block"
        , "inline-size": "100%"
        , "block-size": "100%"
        , overflow: "hidden"
        }
    }
  /* xyflow's custom properties cannot be typed from their names. */
, types:
    { "xy-background-pattern-color": "fill"
    , "xy-edge-stroke": "edge"
    , "xy-edge-stroke-selected": "edge"
    , "xy-edge-box-shadow-selected": "other"
    , "xy-handle-background-color": "fill"
    , "xy-handle-border-color": "edge"
    , "xy-node-color": "ink"
    , "xy-node-background-color": "fill"
    , "xy-node-border": "other"
    , "xy-node-border-radius": "other"
    , "xy-attribution-background-color": "fill"
    , "xy-minimap-background-color": "fill"
    , "xy-controls-color": "ink"
    , "xy-controls-button-background-color": "fill"
    , "xy-controls-button-background-color-hover": "fill"
    , "xy-controls-button-border-color": "edge"
    , "border": "other"
    , "pert-node-border": "other"
    , "pert-node-transition": "other"
    , "pert-node-box-shadow": "other"
    , "svelte-flow-controls-box-shadow": "other"
    , "svelte-flow-controls-border": "other"
    , "edge-stroke": "edge"
    , "critical-edge-stroke": "edge"
    }
} as const satisfies Meta;

export const component =
{ title: "PertChart"
, description:
    "A PERT network diagram of a dependency graph. Computes expected durations, slack and the critical path."
, type: "object"
, properties:
    { ...commonAttributes
    , tasks:
        { type: "array"
        , description:
            "Activities with id, name, PERT estimates (optimistic/likely/pessimistic in days) or a fixed days duration, and dependsOn."
        }
    }
, additionalProperties: true
} as const;
