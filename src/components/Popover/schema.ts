import { commonAttributes } from "../commonAttributes";

export default {
  title: "Popover",
  type: "object",
  properties: {
    ...commonAttributes,
    open: { type: "boolean", default: false },
    openOnHover: { type: "boolean", default: false },
  },
  additionalProperties: true,
} as const;
