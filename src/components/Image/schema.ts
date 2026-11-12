import { commonAttributes } from "../commonAttributes";

export default {
  title: "Image",
  description: "Displays an image, optionally with a caption.",
  type: "object",
  properties: {
    ...commonAttributes,
    src: { type: "string", description: "Image source URL." },
    alt: { type: "string", description: "Alternative text." },
    caption: { type: "string", description: "Optional caption." },
    loading: { type: "string", enum: ["eager", "lazy"], default: "lazy" },
    decoding: { type: "string", enum: ["sync", "async", "auto"], default: "async" },
  },
  additionalProperties: true,
} as const;
