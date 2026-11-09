import { commonAttributes } from "../commonAttributes";

export default {
  title: "Nav",
  type: "object",
  properties: {
    ...commonAttributes,
    label: { type: "string" },
  },
  additionalProperties: true,
} as const;
