import { commonAttributes } from "../commonAttributes";

export default {
  title: "Skeleton",
  description: "A quiet placeholder that pulses while content loads.",
  type: "object",
  properties: {
    ...commonAttributes,
    lines: { type: "number", default: 1, description: "Number of bar lines to render." },
    circle: { type: "boolean", default: false, description: "Render an avatar-sized circle instead of bars." },
  },
  additionalProperties: true,
} as const;
