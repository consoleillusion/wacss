import { commonAttributes } from "../commonAttributes";

export default {
  title: "Select",
  type: "object",
  properties: {
    ...commonAttributes,
    disabled: { type: "boolean", default: false },
    required: { type: "boolean", default: false },
    name: { type: "string" },
    open: { type: "boolean", default: false },
    loop: { type: "boolean", default: false },
  },
  additionalProperties: true,
} as const;
