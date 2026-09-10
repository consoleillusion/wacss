import { commonAttributes } from "../commonAttributes";

export default {
  title: "Slider",
  type: "object",
  properties: {
    ...commonAttributes,
    disabled: { type: "boolean", default: false },
    min: { type: "number", default: 0 },
    max: { type: "number", default: 100 },
    step: { type: "number", default: 1 },
  },
  additionalProperties: true,
} as const;
