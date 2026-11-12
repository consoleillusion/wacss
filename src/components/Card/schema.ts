import { commonAttributes } from "../commonAttributes";

export default {
  title: "Card",
  description: "A surface for grouping content with optional header, text, and a figure (media or any wacss component).",
  type: "object",
  properties: {
    ...commonAttributes,
    as: { type: "string", enum: ["article", "section", "div"], default: "article" },
    header: { type: "string", description: "Card header text." },
    text: { type: "string", description: "Body text shown below the figure." },
    figure: { type: "object", description: "Figure data: media or a component schema instance identified by title.", additionalProperties: true },
    footer: { type: "string" },
  },
  additionalProperties: true,
} as const;
