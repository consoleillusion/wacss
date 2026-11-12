import { commonAttributes } from "../commonAttributes";

export default {
  title: "AlertDialog",
  type: "object",
  properties: {
    ...commonAttributes,
    open: { type: "boolean", default: false },
  },
  additionalProperties: true,
} as const;
