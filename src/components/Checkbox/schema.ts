import { commonAttributes } from "../commonAttributes";

export default {
  title: "Checkbox",
  type: "object",
  properties: {
    ...commonAttributes,
    checked: { type: "boolean", default: false },
    required: { type: "boolean", default: false },
    name: { type: "string" },
  },
  additionalProperties: true,
} as const;
