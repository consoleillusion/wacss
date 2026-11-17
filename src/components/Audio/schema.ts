import type { Meta } from "../../tokens/types";
import { commonAttributes } from "../component";

export const meta =
{ name: "audio"
, element: "audio"
, cssProperties:
    [ "background"
    , "background-color"
    , "border-radius"
    ]
, variants: ["secondary"]
, states: ["static"]
, structure:
    { static:
        { "color-scheme": "only light"
        }
    }
, pseudoElements:
    { "::-webkit-media-controls-enclosure": ["background", "border-radius"]
    , "::-webkit-media-controls-panel": ["background", "border-radius"]
    , "::-webkit-media-controls-timeline-container": ["background-color", "border-radius"]
    , "::-webkit-media-controls-timeline": ["border-radius"]
    , "::-webkit-media-controls-mute-button": ["border-radius"]
    , "::-webkit-media-controls-play-button": ["border-radius"]
    , "::-webkit-media-controls-seek-to-start-button": ["border-radius"]
    , "::-webkit-media-controls-seek-to-end-button": ["border-radius"]
    , "::-webkit-media-controls-overflow-button": ["border-radius"]
    , "::-webkit-media-controls-fullscreen-button": ["border-radius"]
    , "::-webkit-media-controls-closed-captions-button": ["border-radius"]
    , "::-webkit-media-controls-volume-slider-container": ["background", "border-radius"]
    , "::-webkit-media-controls-volume-slider": ["background-color", "border-radius"]
    , "::-webkit-media-controls-current-time-display": ["border-radius"]
    , "::-webkit-media-controls-time-remaining-display": ["border-radius"]
    }
, pseudoStructure:
    { "::-webkit-media-controls-enclosure": { static: { overflow: "hidden" } }
    , "::-webkit-media-controls-timeline-container": { static: { overflow: "hidden" } }
    , "::-webkit-media-controls-timeline": { static: { "background-color": "transparent" } }
    , "::-webkit-media-controls-mute-button": { static: { "background-color": "transparent" } }
    , "::-webkit-media-controls-play-button": { static: { "background-color": "transparent" } }
    , "::-webkit-media-controls-seek-to-start-button": { static: { "background-color": "transparent" } }
    , "::-webkit-media-controls-seek-to-end-button": { static: { "background-color": "transparent" } }
    , "::-webkit-media-controls-overflow-button": { static: { "background-color": "transparent" } }
    , "::-webkit-media-controls-fullscreen-button": { static: { "background-color": "transparent" } }
    , "::-webkit-media-controls-closed-captions-button": { static: { "background-color": "transparent" } }
    }
} as const satisfies Meta;

export const component =
{ title: "Audio"
, description: "Displays an audio player with optional caption and sources."
, type: "object"
, properties:
    { ...commonAttributes
    , src: { type: "string", description: "Audio source URL." }
    , caption: { type: "string", description: "Optional caption." }
    , controls: { type: "boolean", default: true }
    , autoplay: { type: "boolean", default: false }
    , loop: { type: "boolean", default: false }
    , muted: { type: "boolean", default: false }
    , preload: { type: "string", enum: ["none", "metadata", "auto"], default: "metadata" }
    }
, additionalProperties: true
} as const;
