import * as R from "ramda"

const generateTokenHierarchy =
    meta =>
      R.fromPairs(
        meta.cssProperties.map((p) => [
          `${meta.name}-${p}`,
          R.fromPairs(meta.variants.map((v) => [v, meta.states])),
        ])
      )

const toCSSVariables = (tokens) =>
  R.chain(
    ([property, variants]) =>
      R.chain(
        ([variant, states]) => states.map((state) => `--${property}-${variant}-${state}`),
        R.toPairs(variants),
      ),
    R.toPairs(tokens),
  )
