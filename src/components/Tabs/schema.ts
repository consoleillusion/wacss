import { commonAttributes } from "../commonAttributes";

export default {
  title: "Tabs",
  type: "object",
  properties: {
    ...commonAttributes,
    value: { type: "string" },
    orientation: { type: "string", enum: ["horizontal", "vertical"], default: "horizontal" },
    loop: { type: "boolean", default: false },
    activationMode: { type: "string", enum: ["manual", "automatic"], default: "automatic" },
    disabled: { type: "boolean", default: false },
  },
  additionalProperties: true,
} as const;
