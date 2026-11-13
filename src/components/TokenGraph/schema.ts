import { commonAttributes } from "../commonAttributes";

export default {
  title: "TokenGraph",
  description: "A pannable node-link diagram of the token hierarchy: primitive → semantic → component → role → state.",
  type: "object",
  properties: {
    ...commonAttributes,
    layers: {
      type: "array",
      description:
        "Token layers: [{ layer, families: [{ family, tokens: [{ name, value, refs, family }] }] }].",
    },
  },
  additionalProperties: true,
} as const;
