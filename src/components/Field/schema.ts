import { commonAttributes } from "../commonAttributes";

export default {
  title: "Field",
  type: "object",
  properties: {
    ...commonAttributes,
    id: { type: "string", description: "Control id used for label and help/error ids." },
    label: { type: "string" },
    help: { type: "string" },
    error: { type: "string" },
    required: { type: "boolean", default: false },
  },
  additionalProperties: true,
} as const;
