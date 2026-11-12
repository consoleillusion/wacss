import { commonAttributes } from "../commonAttributes";

export default {
  title: "Card",
  description: "A token-styled surface with optional title, description, content, and footer.",
  type: "object",
  properties: {
    ...commonAttributes,
    as: { type: "string", enum: ["article", "section", "div"], default: "article" },
    title: { type: "string" },
    description: { type: "string" },
    footer: { type: "string" },
  },
  additionalProperties: true,
} as const;
