import { commonAttributes } from "../commonAttributes";

export default {
  title: "Checkbox",
  description: "A styled checkbox with label, description, indeterminate state, and persistence.",
  type: "object",
  properties: {
    ...commonAttributes,
    checked: { type: "boolean", default: false },
    indeterminate: { type: "boolean", default: false },
    label: { type: "string" },
    description: { type: "string" },
    disabled: { type: "boolean", default: false },
    required: { type: "boolean", default: false },
    readonly: { type: "boolean", default: false },
    name: { type: "string" },
    value: { type: "string" },
    storageKey: { type: "string", default: "wacss:checkbox" },
    persist: { type: "boolean", default: true },
  },
  additionalProperties: true,
} as const;
