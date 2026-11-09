import { commonAttributes } from "../commonAttributes";

export default {
  title: "RadioGroup",
  type: "object",
  properties: {
    ...commonAttributes,
    value: { type: "string" },
    required: { type: "boolean", default: false },
    name: { type: "string" },
    loop: { type: "boolean", default: false },
    disabled: { type: "boolean", default: false },
  },
  additionalProperties: true,
} as const;
