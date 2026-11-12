import { commonAttributes } from "../commonAttributes";

export default {
  title: "Slider",
  description: "A range slider. Can be used as a hue controller for the accent.",
  type: "object",
  properties: {
    ...commonAttributes,
    value: { type: "number" },
    min: { type: "number", default: 0 },
    max: { type: "number", default: 100 },
    step: { type: "number", default: 1 },
    disabled: { type: "boolean", default: false },
    accentSelector: { type: "boolean", default: false, description: "When true, controls the global accent hue (0–360)." },
  },
  additionalProperties: true,
} as const;
