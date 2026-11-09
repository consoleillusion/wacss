import { commonAttributes } from "../commonAttributes";

export default {
  title: "Base",
  type: "object",
  properties: {
    ...commonAttributes,
  },
  additionalProperties: true,
} as const;
