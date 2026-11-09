import { commonAttributes } from "../commonAttributes";

export default {
  title: "Button",
  type: "object",
  properties: {
    ...commonAttributes,
    type: { type: "string", enum: ["button", "submit", "reset"], default: "button" },
    variant: { type: "string", enum: ["default", "primary", "secondary"] },
    disabled: { type: "boolean", default: false },
  },
  additionalProperties: true,
} as const;
