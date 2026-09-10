import { commonAttributes } from "../commonAttributes";

export default {
  title: "Tooltip",
  type: "object",
  properties: {
    ...commonAttributes,
    disabled: { type: "boolean", default: false },
  },
  additionalProperties: true,
} as const;
