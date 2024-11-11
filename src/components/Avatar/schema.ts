import { commonAttributes } from "../commonAttributes";

export default {
  title: "Avatar",
  type: "object",
  properties: {
    ...commonAttributes,
    src: { type: "string" },
    alt: { type: "string" },
  },
  additionalProperties: true,
} as const;
