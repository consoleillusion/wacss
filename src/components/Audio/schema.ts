import { commonAttributes } from "../commonAttributes";

export default {
  title: "Audio",
  description: "Displays an audio player with optional caption and sources.",
  type: "object",
  properties: {
    ...commonAttributes,
    src: { type: "string", description: "Audio source URL." },
    caption: { type: "string", description: "Optional caption." },
    controls: { type: "boolean", default: true },
    autoplay: { type: "boolean", default: false },
    loop: { type: "boolean", default: false },
    muted: { type: "boolean", default: false },
    preload: { type: "string", enum: ["none", "metadata", "auto"], default: "metadata" },
  },
  additionalProperties: true,
} as const;
