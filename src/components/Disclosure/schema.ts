import { commonAttributes } from "../commonAttributes";

export default {
  title: "Disclosure",
  type: "object",
  properties: {
    ...commonAttributes,
    summary: { type: "string" },
    open: { type: "boolean", default: false },
  },
  additionalProperties: true,
} as const;
