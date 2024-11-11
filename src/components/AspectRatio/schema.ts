import { commonAttributes } from "../commonAttributes";

export default {
  title: "AspectRatio",
  type: "object",
  properties: {
    ...commonAttributes,
    ratio: { type: "number" },
  },
  additionalProperties: true,
} as const;
