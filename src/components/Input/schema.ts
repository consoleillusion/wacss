import { commonAttributes } from "../commonAttributes";

export default {
  title: "Input",
  description: "A labelled text input with optional description, error, and persistence.",
  type: "object",
  properties: {
    ...commonAttributes,
    value: { type: "string" },
    type: { type: "string", default: "text" },
    placeholder: { type: "string" },
    label: { type: "string" },
    description: { type: "string" },
    error: { type: "string" },
    disabled: { type: "boolean", default: false },
    readonly: { type: "boolean", default: false },
    required: { type: "boolean", default: false },
    name: { type: "string" },
    storageKey: { type: "string", default: "wacss:input" },
    persist: { type: "boolean", default: true },
  },
  additionalProperties: true,
} as const;
