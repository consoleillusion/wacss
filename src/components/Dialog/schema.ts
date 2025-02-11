import { commonAttributes } from "../commonAttributes";

export default {
  title: "Dialog",
  description: "A modal dialog with a trigger, title, description, body, and footer.",
  type: "object",
  properties: {
    ...commonAttributes,
    open: { type: "boolean", default: false },
    title: { type: "string" },
    description: { type: "string" },
    triggerLabel: { type: "string", default: "Open dialog" },
    closeLabel: { type: "string", default: "Close dialog" },
  },
  additionalProperties: true,
} as const;
