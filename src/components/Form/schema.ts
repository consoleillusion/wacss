import { commonAttributes } from "../commonAttributes";

export default {
  title: "Form",
  type: "object",
  properties: {
    ...commonAttributes,
  },
  additionalProperties: true,
} as const;
