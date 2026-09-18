import { commonAttributes } from "../commonAttributes";

export default {
  title: "Video",
  description: "Displays a video player with optional caption and sources.",
  type: "object",
  properties: {
    ...commonAttributes,
    src: { type: "string", description: "Video source URL." },
    poster: { type: "string", description: "Poster image URL." },
    caption: { type: "string", description: "Optional caption." },
    controls: { type: "boolean", default: true },
    autoplay: { type: "boolean", default: false },
    loop: { type: "boolean", default: false },
    muted: { type: "boolean", default: false },
    playsinline: { type: "boolean", default: true },
    preload: { type: "string", enum: ["none", "metadata", "auto"], default: "metadata" },
  },
  additionalProperties: true,
} as const;
