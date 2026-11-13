import { commonAttributes } from "../commonAttributes";

export default {
  title: "Pagination",
  description: "Page controls backed by bits-ui Pagination. Binds the current page.",
  type: "object",
  properties: {
    ...commonAttributes,
    total: { type: "number", description: "Total number of items to paginate." },
    perPage: { type: "number", default: 10 },
    page: { type: "number", default: 1, description: "Current page, 1-based." },
    siblingCount: { type: "number", default: 1 },
    loop: { type: "boolean", default: false },
  },
  additionalProperties: true,
} as const;
