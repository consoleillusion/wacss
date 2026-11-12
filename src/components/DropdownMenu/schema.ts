import { commonAttributes } from "../commonAttributes";

export default {
  title: "DropdownMenu",
  type: "object",
  properties: {
    ...commonAttributes,
    disabled: { type: "boolean", default: false },
    loop: { type: "boolean", default: false },
  },
  additionalProperties: true,
} as const;
