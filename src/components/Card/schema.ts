import { commonAttributes } from "../commonAttributes";

export default {
  title: "Card",
  type: "object",
  properties: {
    ...commonAttributes,
    as: { type: "string", default: "article" },
  },
  additionalProperties: true,
} as const;
