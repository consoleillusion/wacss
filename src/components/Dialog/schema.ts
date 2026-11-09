import { commonAttributes } from "../commonAttributes";

export default {
  title: "Dialog",
  type: "object",
  properties: {
    ...commonAttributes,
    open: { type: "boolean", default: false },
  },
  additionalProperties: true,
} as const;
