import { commonAttributes } from "../commonAttributes";

export default {
  title: "Progress",
  type: "object",
  properties: {
    ...commonAttributes,
    value: { type: "number" },
    max: { type: "number", default: 100 },
    disabled: { type: "boolean", default: false },
  },
  additionalProperties: true,
} as const;
