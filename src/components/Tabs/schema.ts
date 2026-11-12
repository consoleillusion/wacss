import { commonAttributes } from "../commonAttributes";

export default {
  title: "Tabs",
  description: "Data-driven tabs with optional panel content and persistence.",
  type: "object",
  properties: {
    ...commonAttributes,
    tabs: {
      type: "array",
      description: "Tab definitions.",
      items: {
        type: "object",
        properties: {
          value: { type: "string" },
          label: { type: "string" },
          content: { type: "string" },
          disabled: { type: "boolean", default: false },
        },
        required: ["value", "label"],
      },
    },
    value: { type: "string" },
    orientation: { type: "string", enum: ["horizontal", "vertical"], default: "horizontal" },
    activationMode: { type: "string", enum: ["manual", "automatic"], default: "automatic" },
    loop: { type: "boolean", default: true },
    disabled: { type: "boolean", default: false },
    storageKey: { type: "string", default: "wacss:tabs" },
    persist: { type: "boolean", default: true },
  },
  additionalProperties: true,
} as const;
