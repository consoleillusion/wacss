import { commonAttributes } from "../commonAttributes";

export default {
  title: "Label",
  description: "A styled label associated with a form control.",
  type: "object",
  properties: {
    ...commonAttributes,
    for: { type: "string", description: "The id of the associated control." },
    text: { type: "string" },
    required: { type: "boolean", default: false },
  },
  additionalProperties: true,
} as const;
