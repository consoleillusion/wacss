import { defineConfig } from "astro/config"
import svelte from "@astrojs/svelte"

export default defineConfig({
  outDir: "./demo-dist",
  redirects: { "/": "/component" },
  integrations: [svelte()],
  vite: {
    // bits-ui, xyflow and layerchart ship Svelte sources; let vite-plugin-svelte compile them,
    // in the browser bundle and on the server.
    optimizeDeps: { exclude: ["bits-ui", "@xyflow/svelte", "layerchart"] },
    resolve: { noExternal: ["layerchart", /^@layerstack\//] },
  },
})
