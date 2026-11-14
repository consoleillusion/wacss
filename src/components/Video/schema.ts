import { commonAttributes } from "../component";

export const style = { properties: [], states: ["static"] } as const;

export const component =
{ title: "Video"
, description: "Displays a video player with optional sources."
, type: "object"
, properties:
    { ...commonAttributes
    , src: { type: "string", description: "Video source URL." }
    , poster: { type: "string", description: "Poster image URL." }
    , controls: { type: "boolean", default: true }
    , autoplay: { type: "boolean", default: false }
    , loop: { type: "boolean", default: false }
    , muted: { type: "boolean", default: false }
    , playsinline: { type: "boolean", default: true }
    , preload: { type: "string", enum: ["none", "metadata", "auto"], default: "metadata" }
    }
, additionalProperties: true
} as const;
