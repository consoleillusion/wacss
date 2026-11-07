import { commonAttributes } from "../commonAttributes";

export default {
  title: "Slider",
  description: "A range slider.",
  type: "object",
  properties: {
    ...commonAttributes,
    value: { type: "number" },
    min: { type: "number", default: 0 },
    max: { type: "number", default: 100 },
    step: { type: "number", default: 1 },
    disabled: { type: "boolean", default: false },
  },
  additionalProperties: true,
} as const;
