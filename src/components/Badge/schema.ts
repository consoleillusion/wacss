import { commonAttributes } from "../commonAttributes";

export default {
  title: "Badge",
  type: "object",
  properties: {
    ...commonAttributes,
    as: { type: "string", default: "span" },
    variant: { type: "string", enum: ["default", "positive", "neutral", "negative"] },
  },
  additionalProperties: true,
} as const;
