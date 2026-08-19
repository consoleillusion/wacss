import { transform } from "lightningcss"
import postcss from "postcss"
import * as sass from "sass"
import { rm } from "node:fs/promises"

const fullCss = "dist/full.css"

const result = sass.compile("src/index.scss", {sourceMap: false})
await Bun.write(fullCss, result.css)
const css = result.css

async function build(options) {

  const root = postcss.parse(css)
  root.walkAtRules("layer", rule => {
    const layer = rule.params.trim()
    if (!options.layers.includes(layer)) {
      rule.remove()
    }
  })

  const result = transform(
    { filename: "index.css"
    , code: Buffer.from(root.toString())
    , minify: true
    })

  await Bun.write("dist/wacss-" + (options.name || options.layers.join('_')) + ".css", result.code)
}

await build({layers: ["normalize","layout"],name:"basic"})
await build({layers: ["normalize","layout","theme","typography"],name:"full"})

await rm("dist/full.css")
