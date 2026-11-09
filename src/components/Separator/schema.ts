import { commonAttributes } from "../commonAttributes";

export default {
  title: "Separator",
  type: "object",
  properties: {
    ...commonAttributes,
    decorative: { type: "boolean", default: false },
  },
  additionalProperties: true,
} as const;
