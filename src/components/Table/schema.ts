import { commonAttributes } from "../commonAttributes";

export default {
  title: "Table",
  type: "object",
  properties: {
    ...commonAttributes,
  },
  additionalProperties: true,
} as const;
