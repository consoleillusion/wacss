import { commonAttributes } from "../commonAttributes";

export default {
  title: "Toggle",
  type: "object",
  properties: {
    ...commonAttributes,
    pressed: { type: "boolean", default: false },
  },
  additionalProperties: true,
} as const;
