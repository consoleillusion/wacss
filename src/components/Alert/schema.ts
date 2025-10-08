import { commonAttributes } from "../commonAttributes";

export default {
  title: "Alert",
  description: "A block-level callout for messages that deserve attention.",
  type: "object",
  properties: {
    ...commonAttributes,
    variant: { type: "string", enum: ["info", "positive", "warning", "destructive"], default: "info" },
    title: { type: "string" },
    description: { type: "string" },
  },
  additionalProperties: true,
} as const;
