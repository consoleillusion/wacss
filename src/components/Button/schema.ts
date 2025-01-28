import { commonAttributes } from "../commonAttributes";

export default {
  title: "Button",
  description: "A styled action element. Renders a button or an anchor when href is set.",
  type: "object",
  properties: {
    ...commonAttributes,
    variant: {
      type: "string",
      enum: ["default", "secondary", "outline", "ghost", "destructive", "link"],
      default: "default",
    },
    size: {
      type: "string",
      enum: ["sm", "md", "lg", "icon"],
      default: "md",
    },
    type: { type: "string", enum: ["button", "submit", "reset"], default: "button" },
    href: { type: "string", description: "Renders an anchor instead of a button." },
    loading: { type: "boolean", default: false },
    disabled: { type: "boolean", default: false },
  },
  additionalProperties: true,
} as const;
