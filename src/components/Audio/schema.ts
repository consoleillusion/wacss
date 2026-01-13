import { commonAttributes } from "../component";

export const meta =
{ name: "audio"
, cssProperties:
    [ "background"
    , "border-radius"
    , "background-color"
    , "webkit-media-controls-timeline-container-background-color"
    , "webkit-media-controls-volume-slider-background-color"
    ]
, roles: ["standard"]
, states: ["static"]
} as const;

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
